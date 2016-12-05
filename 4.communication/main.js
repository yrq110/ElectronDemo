'use strict';

const {app, BrowserWindow} = require('electron')
const path = require('path')
const ipc = require('electron').ipcMain

let mainWin

function creatWindow() {
  mainWin = new BrowserWindow({width: 800, height: 600, backgroundColor: '#dcf6f5', resizable: false})

  mainWin.loadURL(`file://${__dirname}/index.html`)

  mainWin.webContents.openDevTools()

  mainWin.on('closed', () => {
    mainWin = null
  })
}

app.on('ready', creatWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWin === null) {
    creatWindow()
  }
})

// 1.asynchronous message
ipc.on('asynchronous-message', function (event, arg) {
  event.sender.send('asynchronous-reply', 'pong')
})

// 2.synchronous message
ipc.on('synchronous-message', function (event, arg) {
  event.returnValue = 'pong'
})
