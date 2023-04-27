class Channel {
    constructor(io, title){
        this.io = io
        this.title = title // nom du channel
        this.users = [] // liste des users --- Chaque channel gère sa propre liste
    }

    addMessage(user, room, message){
        message = ent.encode(String(message));
        user = ent.encode(String(user));

        this.io.to(room).emit('message:new', {message, nickname})
    }

    pushUser(user){
        console.log("Channel.pushUser.test0 : ");
        //console.log(user);
        user.socket.join(this.title);
        this.users.push(user);
        console.log("Channel.pushUser.test1 : ");
        //console.log(this.users);
        user.setChannel(this.title);
    }

    removeUser(user){
        this.users.forEach((element, index) => {
            if(user.id === element.id){
                this.users.splice(index, 1);
            }
        })
        user.socket.leave(this.title);
        user.setChannel("");
    }

    getUsersList(){
        return this.users;
    }

    getUsersListNickname(){
        let listNickname = [];
        this.users.forEach(user => {
            listNickname.push(user.nickname);
        })
        return listNickname;
    }

    destroy(){
        this.title = null
        this.users = null
        this.io.disconnect()
    }
}

module.exports = Channel