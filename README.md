# fnfx

**fnfx** is a CLI tool that generates a structured tree view of files and folders in a directory. You can export the tree in various formats such as text, JSON, and HTML, with customizable options for ignoring specific folders.

## Features

- Generate a visual tree structure of your file system.
- Export the tree to multiple formats: text, JSON, and HTML.
- Ignore specific folders like `node_modules` or `.next`.
- Output the result directly in the terminal or save it to a file.

## Installation

You can install `fnfx` globally via npm to use it as a CLI tool.

```bash
npm install -g fnfx
```

## Usage

### Basic Command

To generate the file tree for a directory, use the following command:

```bash
fnfx --dir <directory>
```

By default, it uses the current working directory if no directory is specified.

### Options

- `-d, --dir <directory>`: Specify the directory to generate the tree for. Defaults to the current working directory.
- `-i, --ignore <folders>`: Comma-separated list of folders to ignore (e.g., `node_modules,build`). Default: `node_modules, .next, dist, build`.
- `-f, --format <format>`: Specify the output format (`text`, `json`, `html`). Default: `text`.
- `-o, --output <file>`: Save the output to the specified file (e.g., `tree.txt`, `tree.json`, `tree.html`).

### Examples

#### Generate the Tree Structure of the Current Directory

```bash
fnfx --dir .
```

#### Ignore Specific Folders

```bash
fnfx --dir ./my-project --ignore node_modules,dist
```

#### Export the Tree as JSON

```bash
fnfx --dir ./my-project --format json --output tree.json
```

#### Export the Tree as HTML

```bash
fnfx --dir ./my-project --format html --output tree.html
```

#### Save the Tree to a File

```bash
fnfx --dir ./my-project --output tree.txt
```

## Error Handling

- If the specified directory does not exist, `fnfx` will throw an error: `The specified directory '<directory>' does not exist or is not a directory.`
- If an invalid format is specified, `fnfx` will show an error: `Invalid format specified. Valid formats are 'text', 'json', or 'html'.`

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Author

Created by **rgc**  
Email: [rgcsekaraa@gmail.com](mailto:rgcsekaraa@gmail.com)  
Website: [sekaraa.com](https://sekaraa.com)
