require('dotenv').config();

const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketio(server);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("static"));
app.use(express.static("routes"));
app.use((req, res, next) => {
    req.io = io;
    return next();
  });

//Creating various router vars
var chatbot_controller = require('./routes/index');

//Using Socket
// Set socket.io listeners.
io.on('connection', socket => {
    console.log("User Connected");

    //Welcoming current user
    socket.emit('message','Emitting new connection socket message');

    socket.on('disconnect', () => {
      console.log('User Disconnected');
    });

    //Listen for chat message
    socket.on('chatMessage',(msg)=>{
        console.log(msg);
        //sending it back to client
        io.emit('message',msg);
    })

    //Listen for sent messages and psid
    socket.on('recmsg',(recmsg)=>{
        console.log(recmsg);
        //sending it back to client
        io.emit('message',recmsg);
    })
    
    socket.on('psid',(psid)=>{
        console.log(psid);
        //sending it back to client
        io.emit('message',psid);
    })
  });



//Setting up routes
app.use('/',chatbot_controller);

const port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("Server started on port 3000");
});
