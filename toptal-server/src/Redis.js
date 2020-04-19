const redis = require("redis");
const { promisify } = require("util");

class Redis {
  constructor() {
    const client = redis.createClient();

    client.on("error", function(error) {
      console.error(error);
    });

    this.getAsync = promisify(client.get).bind(client);
    this.setAsync = promisify(client.set).bind(client);
    this.expireAsync = promisify(client.expire).bind(client);
  }

  redisGet(key, callback) {
    this.getAsync(key).then(value => callback(value)).catch(console.log);
  }

  redisSet({key, value, expiry, callback}) {
    this.setAsync(key, value)
      .then(() => {
        if (expiry) {
          this.expireAsync(key, expiry)
            .then(() => {
              if (callback) {
                callback(null);
              }
            });
          return;
        }
        if (callback) {
          callback(null);
        }
      })
      .catch(console.log);
  }
}

module.exports = new Redis();
