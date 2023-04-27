class User {
    constructor(socket, nickname, channel) {
        this.id = socket.id
        this.nickname = nickname
        this.socket = socket
        this.channel = channel
    }

    destroy(){
        this.id = null
        this.nickname = null
        this.channel = null
        this.socket.disconnect()
    }

    setChannel(channel){
        this.channel = channel;
    }
}

module.exports = User