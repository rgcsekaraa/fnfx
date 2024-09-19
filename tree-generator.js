const fs = require('fs-extra');
const path = require('path');

// Helper function to check if a folder or its subfolder should be ignored
function shouldIgnore(itemPath, ignoredFolders) {
  return ignoredFolders.some((ignoredFolder) => {
    const folderName = path.basename(itemPath);
    return folderName === ignoredFolder || itemPath.includes(ignoredFolder);
  });
}

// Updated to accept ignored folders as a parameter and handle subfolders properly
function generateTree(dirPath, ignoredFolders = [], level = 0) {
  let tree = '';
  try {
    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
      const itemPath = path.join(dirPath, item);
      const isDirectory = fs.statSync(itemPath).isDirectory();

      // Check if the item (folder or subfolder) should be ignored
      if (shouldIgnore(itemPath, ignoredFolders)) {
        tree += '  '.repeat(level) + '📂 ' + item + ' (omitted)\n';
      } else {
        // Generate tree structure for files and directories
        tree +=
          '  '.repeat(level) + (isDirectory ? '📂' : '📄') + ' ' + item + '\n';

        // If it's a directory, recursively generate the tree for sub-items
        if (isDirectory) {
          tree += generateTree(itemPath, ignoredFolders, level + 1);
        }
      }
    });
  } catch (error) {
    tree += `Error reading directory '${dirPath}': ${error.message}\n`;
  }

  return tree;
}

// Function to export the generated tree as HTML
function exportAsHTML(tree) {
  return `
    <html>
      <head><title>fnfx - Folders & Files Tree Exporter</title></head>
      <style>
        body { font-family: monospace; white-space: pre; }
        .directory { color: blue; }
        .file { color: green; }
      </style>
      <body>
        <pre>${tree
          .replace(/📂/g, '<span class="directory">📂</span>')
          .replace(/📄/g, '<span class="file">📄</span>')}</pre>
      </body>
    </html>`;
}

module.exports = { generateTree, exportAsHTML };
