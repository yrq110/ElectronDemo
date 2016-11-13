var fw_btn = document.querySelector('.frameless-window-button');
fw_btn.addEventListener('click', function () {
	const modalPath = path.join(`file://${__dirname}/index.html`)
	let win = new BrowserWindow({ width: 400, height: 320, frame: false })
	win.on('close', function () { win = null })
	win.loadURL(modalPath)
	win.show()
});
