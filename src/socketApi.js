const socketio = require('socket.io');
const socketApi = {};
const Io = socketio();
const bcrypt = require('bcryptjs');
const key = require('../helper/config').JWT_PRIVATE_SECRET_KEY;
const User = require('../models/User');
const Chat = require('../models/Chat');
const jwt = require('jsonwebtoken');
socketApi.io = Io;

const objectTrim = (object) => {

    Object.keys(object).forEach(item => {
        if (typeof (object[item]) === 'string') {
            object[item] = object[item].trim();
        }
    });
    return object
};

const objectBlankControl = (object) => {
    let check = true;
    Object.keys(object).forEach(item => {
        if (object[item] == '' || object[item] == null) {
            check = false;
        }
    })
    return check;
};

const loginToken = (socket, userId) => {
    const payload = {
        userId
    }
    const token = jwt.sign(payload, key);
    socket.emit('token', token);
}

Io.of('/membership').on('connection', (socket) => {
    socket.on('login', (singIn) => {
        singIn = objectTrim(singIn);
        if (objectBlankControl(singIn)) {
            User.findOne({ email: singIn.email }, (err, user) => {
                if (err)
                    throw err;
                if (user) {
                    bcrypt.compare(singIn.password, user.password).then((result) => {
                        if (result) {
                            loginToken(socket, user._id);
                        } else {
                            socket.emit('loginError', { msg: "Your username and password are incorrect" });
                        }
                    })
                } else {
                    socket.emit('loginError', { msg: "Your username and password are incorrect" });
                }
            })
        } else {
            socket.emit('loginError', { msg: "Username or Password cannot be left blank" })
        }
    })

    socket.on('register', (singUp) => {
        bcrypt.hash(singUp.password, 10).then((hash) => {
            const prop = new User({
                email: singUp.email,
                password: hash,
                firstname: singUp.firstname,
                lastname: singUp.lastname,
            });
            prop.save((err, res) => {
                if (err)
                    throw err;
                console.log(res);
            })
        })

    })

})

Io.of('/Chat').use((socket, next) => {
    const token = socket.handshake.query.token
    if (token) {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                next(new Error('Authentication error'));
            } else {
                socket.decoded = decoded
                return next();
            }
        });
    } else {
        next(new Error('Authentication error'));
    }
}).on('connection', (socket) => {
    socket.use((packet, next) => {
        const token = socket.handshake.query.token
        if (token) {
            jwt.verify(token, key, (err, decoded) => {
                if (err) {
                    next(new Error('Authentication error'));
                } else {
                    socket.decoded = decoded
                    return next();
                }
            });
        } else {
            next(new Error('Authentication error'));
        }
    });
    socket.on("CreateChatRoom", (ChatRoom) => {
        let userId = socket.decoded.userId
        new Chat({
            ChatRoom: {
                roomName: ChatRoom.name,
                userId,
                Encryption: ChatRoom.encryption
            }
        }).save((err, res) => {
            if (err)
                console.log(err); // hata mesajı fırlatılacak.
            console.log(res); // chat sayfasına yönlendirme yapılacak
        });
    });
    socket.on("loginChatRoom", (ChatRoom) => {
        Chat.findOne({ "ChatRoom.roomName": ChatRoom.name }, (err, res) => {
            if (err)
                console.log(err); // hata mesajı fırlatılacak;
            if (res !== null) {
                socket.emit('goToChat', ChatRoom.name);
                socket.join(ChatRoom.name, () => {
                    let userId = socket.decoded.userId;
                    const roomName = Object.keys(socket.rooms)[1];
                    console.log(Object.keys(socket.rooms))
                })
            } else {
                console.log(res); // böyle bir oda yok diye mesaj gidebilir.
            }
        })
    })
    socket.on('chatMessage', (chat) => {
        let userId = socket.decoded.userId
        const props = new Chat({
            userId,
            message: chat.message
        })
        props.save((err, res) => {
            if (err)
                throw err;
            Chat.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }

                },
                { $sort: { date: -1 } },
                {
                    $unwind: '$user'
                },
                {
                    $project: {
                        firstname: '$user.firstname',
                        lastname: '$user.lastname',
                        message: 1,
                        userId: 1,
                        date: { $dateToString: { format: "%H:%m:%S", date: "$date" } },
                        _id: 1
                    }
                },
                { $limit: 20 },
            ], (err, chat) => {
                if (err)
                    throw err;
                Io.of('/Chat').emit('returnedMessage', { messageInfo: chat.reverse() });
            })

        })
    })
    socket.on('allMessage', () => {
        let userId = socket.decoded.userId
        Chat.aggregate([
            {

                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }

            },
            { $sort: { date: -1 } },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    firstname: '$user.firstname',
                    lastname: '$user.lastname',
                    message: 1,
                    userId: 1,
                    date: { $dateToString: { format: "%H:%m:%S", date: "$date" } },
                    _id: 1
                }
            },
            { $limit: 20 },
        ], (err, chat) => {
            if (err)
                throw err;
            socket.emit('returnedMessage', { userId, messageInfo: chat.reverse() });
        })

    })
})

module.exports = socketApi;