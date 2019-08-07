const redisClient = require('../redisClient');
const shortid = require('shortid');
const _ = require('lodash'); //sıralama yapmak için



function Messages () {
    this.client = redisClient.getClient()
}


module.exports = new Messages();

//rediste Mesaj oluştur
Messages.prototype.upsert = function ({roomId,message,username,surname}) {
  this.client.hset(
      'messages:'+ roomId,
      shortid.generate(),
      JSON.stringify({
          username,
          surname,
          message,
          when: Date.now()
      }),
      err => {
          if(err) {
              console.log(err);
          }
      }
  )
};



//Mesaj Listeleme
Messages.prototype.list = function (roomId,callback) {
    let messageList = [];
    this.client.hgetall('messages:'+roomId , function (err,messages) {
        if(err) {
            console.log(err);
            return callback([]);
        }

        for(let message in messages) {
            messageList.push(JSON.parse(messages[message]));
        }

        return callback(_.orderBy(messageList,'when','asc'));

    })
};
