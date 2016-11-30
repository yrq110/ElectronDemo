'use strict';

const {app, BrowserWindow} = require('electron')
const path = require('path')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
const Menu = require('electron').Menu
const Tray = require('electron').Tray

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

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, function (files) {
    if (files) event.sender.send('selected-directory', files)
  })
})

ipc.on('open-error-dialog', function (event) {
  dialog.showErrorBox('An Error Message', 'Demonstrating an error message.')
})

ipc.on('open-information-dialog', function (event) {
  const options = {
    type: 'info',
    title: 'Information',
    message: "This is an information dialog. Isn't it nice?",
    buttons: ['Yes', 'No']
  }
  dialog.showMessageBox(options, function (index) {
    event.sender.send('information-dialog-selection', index)
  })
})

ipc.on('save-dialog', function (event) {
  const options = {
    title: 'Save an Image',
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
    ]
  }
  dialog.showSaveDialog(options, function (filename) {
    event.sender.send('saved-file', filename)
  })
})

let appIcon = null

ipc.on('put-in-tray', function (event) {
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname + '/assets/icon/', iconName)
  appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([{
    label: 'Remove',
    click: function () {
      event.sender.send('tray-removed')
    }
  }])
  appIcon.setToolTip('Electron Demo in the tray.')
  appIcon.setContextMenu(contextMenu)
})

ipc.on('remove-tray', function () {
  appIcon.destroy()
})

app.on('window-all-closed', function () {
  if (appIcon) appIcon.destroy()
})
