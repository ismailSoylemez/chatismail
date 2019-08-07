const redisClient = require('../redisClient');
const shortid = require('shortid');


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
