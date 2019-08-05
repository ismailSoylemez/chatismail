const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = {
    io
};


//libs
const Users = require('../src/lib/Users');
const Rooms = require('../src/lib/Rooms');



//socket authorization
io.use(socketAuthorization);


 /*
    Redis Adapter
 */
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
}));

io.on('connection', (socket) => {
    //her soket isteğinde hangi kullanıcı istek attıysa onun ismi yazıyor
    console.log('a user logged in with name ' + socket.request.user.name);
    //socket.broadcast.emit('hello');


    //kullanıcı oluşturuluyor
    Users.upsert(socket.id, socket.request.user);

    //kullanıcıları listeleme
    Users.list(users => {
        io.emit('onlineList',users);
    });

    //yeni oda kurma
    socket.on('newRoom',roomName => {
         Rooms.upsert(roomName);
         Rooms.list(rooms => {
            io.emit('roomList',rooms);
         });
    });

    //odaları listeleme
    Rooms.list(rooms => {
        io.emit('roomList',rooms);
    });


    socket.on('disconnect', () => {
        Users.remove(socket.request.user.googleID);
        Users.list(users => {
            io.emit('onlineList',users);
        });

    });

});







module.exports = socketApi;

/*
load balancer

1.uygu.serv
2.uygu.serv kullanıcı
3.uygu.serv

*/