var ph_btn = document.querySelector('.process-hang-button');
ph_btn.addEventListener('click', function () {
	const crashWinPath = path.join(`file://${__dirname}/assets/child/process-hang.html`)
	let win = new BrowserWindow({ width: 400, height: 320 })

  win.on('unresponsive', function () {
    const options = {
      type: 'info',
      title: 'Renderer Process Hanging',
      message: 'This process is hanging.',
      buttons: ['Reload', 'Close']
    }
    dialog.showMessageBox(options, function (index) {
      if (index === 0) win.reload()
      else win.close()
    })
  })

  win.on('close', function () { win = null })
  win.loadURL(hangWinPath)
  win.show()
});
