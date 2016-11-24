var errorBtn = document.querySelector('error-dialog')

errorBtn.addEventListener('click', function (event) {
  ipc.send('open-error-dialog')
})
