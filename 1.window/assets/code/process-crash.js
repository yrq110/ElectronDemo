var pc_btn = document.querySelector('.process-crash-button');
pc_btn.addEventListener('click', function () {
	const crashWinPath = path.join(`file://${__dirname}/assets/child/process-crash.html`)
  let win = new BrowserWindow({ width: 400, height: 320 })

  win.webContents.on('crashed', function () {
    const options = {
      type: 'info',
      title: 'Renderer Process Crashed',
      message: 'This process has crashed.',
      buttons: ['Reload', 'Close']
    }
    dialog.showMessageBox(options, function (index) {
      if (index === 0) win.reload()
      else win.close()
    })
  })

  win.on('close', function () { win = null })
  win.loadURL(crashWinPath)
  win.show()
});
