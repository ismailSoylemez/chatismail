const redis = require('redis');

function Users () {
    this.client = redis.createClient({
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT,
    });
}


module.exports = new Users();


//kayıt işlemi
Users.prototype.upsert = function (connectionId,meta) {
  this.client.hset(
      'online',
      meta.googleID,
      JSON.stringify({
          connectionId,
          meta,
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
};