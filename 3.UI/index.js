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
var exLinksBtn = document.querySelector('.open-external-links')

exLinksBtn.addEventListener('click', function (event) {
  shell.openExternal('https://www.baidu.com/')
})

// 3. open file or directory
var selectDirBtn = document.querySelector('.open-file-directory')

selectDirBtn.addEventListener('click', function (event) {
  ipc.send('open-file-dialog')
})

ipc.on('selected-directory', function (event, path) {
  document.getElementById('selected-file').innerHTML = `You selected: ${path}`
})

// 4. error dialog
var errorBtn = document.querySelector('.error-dialog')

errorBtn.addEventListener('click', function (event) {
  ipc.send('open-error-dialog')
})

// 5. information dialog
var informationBtn = document.querySelector('.information-dialog')

informationBtn.addEventListener('click', function (event) {
  ipc.send('open-information-dialog')
})

ipc.on('information-dialog-selection', function (event, index) {
  let message = 'You selected '
  if (index === 0) message += 'yes.'
  else message += 'no.'
  document.getElementById('info-selection').innerHTML = message
})

// 6. save dialog
var saveBtn = document.querySelector('.save-dialog')

saveBtn.addEventListener('click', function (event) {
  ipc.send('save-dialog')
})

ipc.on('saved-file', function (event, path) {
  if (!path) path = 'No path'
  document.getElementById('file-saved').innerHTML = `Path selected: ${path}`
})


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
