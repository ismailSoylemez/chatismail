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


Users.prototype.list = function (callback) {
    let active = [];
    this.client.hgetall('online' , function (err,users) {
      if(err) {
          console.log(err);
          return callback([]);
      }

      for(let user in users) {
          active.push(JSON.parse(users[user]));
      }

      return callback(active);

    })
};*/