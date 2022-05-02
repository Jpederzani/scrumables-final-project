const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const expressHandlebars = require('express-handlebars');
const { nextTick } = require('process');

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('testsocket')
    });

server.listen(1037, () => {
    console.log("Server Running on port [1037]");
    console.log("Press Ctrl+C to terminate the server...");
});

io.on('connection', (socket) => {  //event we create on the html page 'testsocket'
    //event emiter
    //we cen set socket variables here
    //each socket has an ID, we can get user info (like IDs) here
    console.log("User Connected: " + socket.id);
    socket.on("message", (data) => { //listen for an event called message on our socket, grab the message and store as a variable called "data"
        console.log(data); //log that message in our console
        socket.broadcast.emit('message', data); //emits the received message to all subscribers but ourselves (we're broadcasting)
    })
});