var saveBtn = document.querySelector('.save-dialog')

saveBtn.addEventListener('click', function (event) {
  ipc.send('save-dialog')
})

ipc.on('saved-file', function (event, path) {
  if (!path) path = 'No path'
  document.getElementById('file-saved').innerHTML = `Path selected: ${path}`
})