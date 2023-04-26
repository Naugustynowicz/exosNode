const ent = require('ent')

const User = require('./User')

class Chat {
    constructor(io) {
        this.io = io
        this.users = [] // liste des users
        this.messages = [] // liste des messages
    }

    onConnection(socket) {
        console.log( `Client`, socket.id, 'is connected via WebSockets')

        socket.on('message:new', ({nickname, message}) => this._onNewMessage(socket, nickname, message))
        socket.on('user:new', (nickname) => this._onNewUser(socket, nickname))
    }

    _onNewUser(socket, nickname){
        nickname = ent.encode(String(nickname));
        console.log("test0 : " + nickname);
        this.users.push(nickname);
        console.log(this.users);
        this.io.sockets.emit('users:new', this.users)
    }

    _onNewMessage(socket, nickname, message) {
        message = ent.encode(String(message));
        nickname = ent.encode(String(nickname));

        this.io.sockets.emit('message:new', {message, nickname})
    }
}

module.exports = Chat