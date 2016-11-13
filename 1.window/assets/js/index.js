const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const fs = require('fs')
const highlight = require('highlight.js')

// 1.create-window
var cw_btn = document.querySelector('.creat-window-button');
cw_btn.addEventListener('click', function () {
	const modalPath = path.join(`file://${__dirname}/index.html`)
	let win = new BrowserWindow({ width: 400, height: 320 })
	win.on('close', function () { win = null })
	win.loadURL(modalPath)
	win.show()
});

// 2.indow-state
var ws_btn = document.querySelector('.window-state-button');
ws_btn.addEventListener('click', function () {
	const modalPath = path.join(`file://${__dirname}/index.html`)
	let win = new BrowserWindow({ width: 400, height: 320 })
	win.on('resize', updateReply)
  win.on('move', updateReply)
	win.on('close', function () { win = null })
	win.loadURL(modalPath)
	win.show()
	function updateReply () {
    const manageWindowReply = document.getElementById('manage-window-reply')
    const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`
    manageWindowReply.innerText = message
  }
});

// 3.window-event
var we_btn = document.querySelector('.window-event-button');
var focusModalBtn = document.querySelector('.focus-on-button');
we_btn.addEventListener('click', function () {
	const modalPath = path.join(`file://${__dirname}/index.html`)
  let win = new BrowserWindow({ width: 600, height: 400 })
  win.on('focus', hideFocusBtn)
  win.on('blur', showFocusBtn)
  win.on('close', function () {
    hideFocusBtn()
    win = null
  })
  win.loadURL(modalPath)
  win.show()
  function showFocusBtn (btn) {
    if (!win) return
    focusModalBtn.classList.add('smooth-appear')
    focusModalBtn.classList.remove('disappear')
    focusModalBtn.addEventListener('click', function () { win.focus() })
  }
  function hideFocusBtn () {
    focusModalBtn.classList.add('disappear')
    focusModalBtn.classList.remove('smooth-appear')
  }
});

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
