$(function() {
  // make connection
  var socket = io.connect('http://localhost:3000')

  // buttons and inputs
  var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
  var feedback = $("#feedback")

  // emit message
  send_message.click(function() {
    socket.emit('new_message', {message: message.val()})
  })

  // listen on new_message
  socket.on("new_message", (data) => {
    console.log(data)
    chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
  })
  
  // emit a username
  send_username.click(function() {
    console.log(username.val())
    socket.emit('change_username', {username: username.val()})
  })

  // emit typing
	message.bind("keyup", () => {
    console.log(message.val())
    if (!message.val()) {
      socket.emit('offTyping')
      return
    }
    socket.emit('typing')
	})

	// listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
  })
  
  // listen on offTyping
  socket.on('offTyping', () => {
		feedback.empty()
  })
});