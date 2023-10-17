// Count the amount of characters in this folder in each file

const fs = require('fs');

let total = 0;
let totalLines = 0;

const charCounterFile = (path) => {
    const file = fs.readFileSync(path, 'utf8');
    // Count the amount of lines

    const lines = file.split('\n');;
    // console.log(`File: ${path} has ${file.length} characters and ${lines.length} lines`);
    total += file.length;
    totalLines += lines.length;
}

const charCounter = (path) => {
    const isFolder = fs.lstatSync(path).isDirectory();
    if (!isFolder) {
        if (path.includes('node_modules') || path.includes('.env.examples') || path.includes('.gitattributes') || path.includes('.git') || path.includes('.gitignore') || path.includes('yarn.lock') || path.includes('package.json') || path.includes('dist') || path.includes("LICENSE") || path.includes(".vscode") || path.includes("data")) {
           return;
        }
        charCounterFile(path);
        return;
    }

    const subPaths = fs.readdirSync(path);
    for (let subPath of subPaths) {
        const fullPath = `${path}/${subPath}`;
        if (isFolder) {
            charCounter(fullPath);
        } else {
            charCounterFile(fullPath);
        }
    }
}

charCounter('./');

console.log(`Characters in this project: ${total}\n\nLines in this project: ${totalLines}`);