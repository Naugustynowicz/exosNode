const ent = require('ent')

const User = require('./User')
const Channel = require('./Channel')

class Chat {
    constructor(io) {
        this.io = io
        this.users = [] // liste des users
        this.messages = [] // liste des messages
        this.channels = {
            general : new Channel(io, "Général"), 
            gaming : new Channel(io, "Gaming"),
            random : new Channel(io, "Random")
        };
    }

    onConnection(socket) {
        console.log( `Client`, socket.id, 'is connected via WebSockets');

        socket.on('user:new', (nickname) => this._onNewUser(socket, nickname));
        socket.on('message:isTyping', (nickname) => this._onMessageTyping(socket, nickname));
        socket.on('message:new', ({nickname, message}) => this._onNewMessage(socket, nickname, message));
        socket.on('channel:switch', (title) => this._onSwitchChannel(socket, title));   
    }

    _onNewUser(socket, nickname){
        let user = new User(socket, nickname, "Général");
        nickname = ent.encode(String(nickname));
        console.log("Chat._onNewUser.test0 : " + nickname);
        this.users.push(user);
        //console.log("Chat._onNewUser.test1 : ");
        console.log(this.channels.general);
        this.channels.general.pushUser(user);
        console.log("Chat._onNewUser.test2 : ");
        //console.log(this.users);
        this.io.sockets.to(this.channels.general.title).emit('users:new', this.channels.general.getUsersListNickname());
    }

    getUser(socket){
        let currentUser = null;
        this.users.forEach((user) => {
            if(user.socket === socket){
                currentUser = user;
            }
        })
        return currentUser;
    }

    _onSwitchChannel(socket, title){
        let currentUser = this.getUser(socket);
        let oldChannel = null;
        let newChannel = null;
        for(let key in this.channels){
            let channel = this.channels[key];
            if(currentUser.channel === channel.title){
                oldChannel = channel;
            }
            if(title === channel.title){
                newChannel = channel;
            }
        }
        oldChannel.removeUser(currentUser);
        newChannel.pushUser(currentUser);
        this.io.sockets.to(newChannel.title).emit('users:new', newChannel.getUsersListNickname());

    }

    _onMessageTyping(socket, nickname){
        nickname = ent.encode(String(nickname));
        let currentUser = this.getUser(socket);

        this.io.sockets.to(currentUser.channel).timeout(5000).emit('message:typing', nickname);
    }

    _onNewMessage(socket, nickname, message) {
        message = ent.encode(String(message));
        nickname = ent.encode(String(nickname));
        let currentUser = this.getUser(socket);

        this.io.sockets.to(currentUser.channel).emit('message:new', {message, nickname})
    }
}

module.exports = Chat