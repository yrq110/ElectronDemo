const path = require('path')
const fs = require('fs')
const ipc = require('electron').ipcRenderer

// 1. asynchronous message
var asyncMsgBtn = document.querySelector('.asynchronous-message')

asyncMsgBtn.addEventListener('click', function () {
  ipc.send('asynchronous-message', 'ping')
})

ipc.on('asynchronous-reply', function (event, arg) {
  const message = `Asynchronous message reply: ${arg}`
  document.getElementById('async-reply').innerHTML = message
})

// 2. synchronous message
var syncMsgBtn = document.querySelector('.synchronous-message')

syncMsgBtn.addEventListener('click', function () {
  const reply = ipc.sendSync('synchronous-message', 'ping')
  const message = `Synchronous message reply: ${reply}`
  document.getElementById('sync-reply').innerHTML = message
})

// 3. communicate with a invisible window
var invisMsgBtn = document.querySelector('.invis-message')
var invisReply = document.querySelector('#invis-reply')

invisMsgBtn.addEventListener('click', function (clickEvent) {
  const windowID = BrowserWindow.getFocusedWindow().id
  const invisPath = 'file://' + path.join(__dirname+'/index.html')
  console.log(invisPath)
  let win = new BrowserWindow({ width: 400, height: 400, show: false })
  win.loadURL(invisPath)

  win.webContents.on('did-finish-load', function () {
    const input = 100
    win.webContents.send('compute-factorial', input, windowID)
  })
})

ipc.on('factorial-computed', function (event, input, output) {
  const message = `The factorial of ${input} is ${output}`
  invisReply.textContent = message
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
