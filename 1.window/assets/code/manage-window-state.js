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
