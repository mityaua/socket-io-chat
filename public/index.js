const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')

window.addEventListener("load", () => {
  const username = prompt('Type your name', 'Anonym')

  if (!username) {
    return
  }

  const socket = io();

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    if (input.value) {
      socket.emit('CHAT_MESSAGE', { message: input.value, username })
      input.value = ""
    }
  })

  socket.on('CHAT_UPDATE', ({ message, username }) => {
    const item = document.createElement('li')
    item.innerHTML = `${username}: ${message}`
    messages.appendChild(item)

    window.scrollTo(0, document.body.scrollHeight)
  })

});