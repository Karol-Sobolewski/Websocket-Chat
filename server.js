const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
    console.log('Server is running on Port:', 8000)
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    console.log(users);
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('login', (user) => {
        users.push(user);
        socket.broadcast.emit('newUser', {user: 'ChatBot', content: `${user.user} has joined the conversation!`});
    });
    socket.on('disconnect', () => {
        console.log('Oh, socket ' + socket.id + ' has left')
        const removedUser = users.filter(user => user.id === socket.id)[0];
        if (removedUser !== undefined) {
            users.splice(users.indexOf(removedUser), 1);
            console.log(`left`, removedUser.user);
            socket.broadcast.emit('removeUser', {user: 'ChatBot', content: `${removedUser.user} has left the conversation!`});
        }
        console.log('I\'ve added a listener on message and disconnect events \n');
    });
    // const index = 
    // socket.on('disconnect', () => { users.splice(, 1) });


});

