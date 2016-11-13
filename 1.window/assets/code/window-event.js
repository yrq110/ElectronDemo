var we_btn = document.querySelector('.window-event-button');
var focus_btn = document.querySelector('.focus-on-button');
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
    focus_btn.classList.add('smooth-appear')
    focus_btn.classList.remove('disappear')
    focus_btn.addEventListener('click', function () { win.focus() })
  }
  function hideFocusBtn () {
    focus_btn.classList.add('disappear')
    focus_btn.classList.remove('smooth-appear')
  }
});
