const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const fs = require('fs')
const highlight = require('highlight.js')
const dialog = require('electron').remote.dialog
const ipc = require('electron').ipcRenderer
const shell = require('electron').shell
const os = require('os')

// 1. open file manager
var fileManagerBtn = document.querySelector('.open-file-manager');
fileManagerBtn.addEventListener('click', function () {
  shell.showItemInFolder(os.homedir())
});

// 2. open external links


// 3. open file or directory


// 4. error dialog


// 5. information dialog


// 6. save dialog

// highlight code block
const codeBlocksWithPaths = document.querySelectorAll('code[data-path]')

Array.prototype.forEach.call(codeBlocksWithPaths, function (code) {
  const codePath = path.join(code.dataset.path)
  const extension = path.extname(codePath)
  code.classList.add('language-' + extension.substring(1))
  code.textContent = fs.readFileSync(codePath)
})

document.addEventListener('DOMContentLoaded', function () {
  const highlight = require('highlight.js')
  const codeBlocks = document.querySelectorAll('pre code')
  Array.prototype.forEach.call(codeBlocks, function (code) {
    highlight.highlightBlock(code)
  })
})
