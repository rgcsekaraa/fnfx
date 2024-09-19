const fs = require('fs-extra');
const path = require('path');

// Updated to accept ignored folders as a parameter
function generateTree(dirPath, ignoredFolders = [], level = 0) {
  const items = fs.readdirSync(dirPath);
  let tree = '';

  items.forEach((item) => {
    const itemPath = path.join(dirPath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    // Check if the folder is in the ignored list
    if (isDirectory && ignoredFolders.includes(item)) {
      tree += '  '.repeat(level) + '📂 ' + item + ' (omitted)\n';
    } else {
      // Generate tree structure
      tree +=
        '  '.repeat(level) + (isDirectory ? '📂' : '📄') + ' ' + item + '\n';

      if (isDirectory) {
        tree += generateTree(itemPath, ignoredFolders, level + 1);
      }
    }
  });

  return tree;
}

// Optionally export other formats like JSON, HTML, etc.
function exportAsHTML(tree) {
  return `
    <html>
        <head><title>File Tree</title></head>
        <body><pre>${tree}</pre></body>
    </html>`;
}

module.exports = { generateTree, exportAsHTML };
