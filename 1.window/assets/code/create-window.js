var btn = document.querySelector('.creat-window-button');
btn.addEventListener('click', function () {
	console.log("hahaha");
	const modalPath = path.join(`file://${__dirname}/index.html`)
	let win = new BrowserWindow({ width: 400, height: 320 })
	win.on('close', function () { win = null })
	win.loadURL(modalPath)
	win.show()
});
