const message_div = document.getElementById('chat-form');
const chat_messages = document.querySelector('.chat-messages')
var socket = io();

//message from server
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);

    chat_messages.scrollTop = chat_messages.scrollHeight;
});

//Message Submit
message_div.addEventListener('submit', e =>{
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;
    
    //Emit Message to server
    socket.emit('chatMessage',msg);

    //Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//Output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('messages');
    div.innerHTML= `<p class = "text">
         ${message}        
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}