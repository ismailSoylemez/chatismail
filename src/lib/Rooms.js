const redisClient = require('../redisClient');


function Rooms () {
    this.client = redisClient.getClient()
}


module.exports = new Rooms();

//rediste oda oluştur
Rooms.prototype.upsert = function (roomName) {
  this.client.hset(
      'rooms',
      roomName,
      JSON.stringify({
          roomName,
          when: Date.now()
      }),
      err => {
          if(err) {
              console.log(err);
          }
      }
  )
};

//silme işlemi
/*
Users.prototype.remove = function (googleID) {
    this.client.hdel(
        'online',
        googleID,
        err => {
            if(err){
                console.log(err);
            }
        }
    );
};
*/


//Room Listeleme
Rooms.prototype.list = function (callback) {
    let roomList = [];
    this.client.hgetall('rooms' , function (err,rooms) {
      if(err) {
          console.log(err);
          return callback([]);
      }

      for(let room in rooms) {
          roomList.push(JSON.parse(rooms[room]));
      }

      return callback(roomList);

    })
};