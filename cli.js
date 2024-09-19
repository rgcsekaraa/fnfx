#!/usr/bin/env node

const { generateTree, exportAsHTML } = require('./tree-generator');
const { program } = require('commander');
const path = require('path');
const fs = require('fs');

// Set up CLI options with descriptions for help
program
  .name('fnfx')
  .description(
    'Generate a file tree structure for a directory and export in various formats'
  )
  .version('1.0.0')
  .option(
    '-d, --dir <directory>',
    'Directory to generate the tree for (default: current working directory)',
    process.cwd()
  )
  .option(
    '-i, --ignore <folders>',
    'Comma-separated list of folders to ignore (default: node_modules,.next,dist,build)',
    (value) => value.split(','),
    ['node_modules', '.next', 'dist', 'build']
  )
  .option(
    '-f, --format <format>',
    'Export format: text, json, html (default: text)',
    'text'
  )
  .option('-o, --output <file>', 'File path to save the output')
  .helpOption('-h, --help', 'Display help for fnfx');

// Parse the CLI options
program.parse(process.argv);

const options = program.opts();

try {
  // Validate the directory
  if (!fs.existsSync(options.dir) || !fs.statSync(options.dir).isDirectory()) {
    throw new Error(
      `The specified directory '${options.dir}' does not exist or is not a directory.`
    );
  }

  // Set ignored folders (from CLI or defaults)
  const ignoredFolders = options.ignore;

  // Generate the file tree based on the provided directory and ignored folders
  const tree = generateTree(options.dir, ignoredFolders);

  // Handle export format validation
  let output = '';
  if (options.format === 'json') {
    output = JSON.stringify(tree, null, 2); // JSON format
  } else if (options.format === 'html') {
    output = exportAsHTML(tree); // HTML format
  } else if (options.format === 'text') {
    output = tree; // Default text format
  } else {
    throw new Error(
      `Invalid format specified: '${options.format}'. Valid formats are 'text', 'json', or 'html'.`
    );
  }

  // Output to console
  console.log(output);

  // Save to file if output path is provided
  if (options.output) {
    const outputPath = path.resolve(options.output);

    // Check if the output path is writable
    try {
      fs.writeFileSync(outputPath, output);
      console.log(`Output saved to ${options.output}`);
    } catch (error) {
      throw new Error(
        `Failed to write to the specified file '${options.output}': ${error.message}`
      );
    }
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  program.outputHelp(); // Show help information in case of an error
  process.exit(1); // Exit with a failure code
}
