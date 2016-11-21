
'use strict';

const {app, BrowserWindow} = require('electron')
const path = require('path')

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
