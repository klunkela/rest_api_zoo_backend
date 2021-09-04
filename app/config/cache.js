const redis = require("redis");
const redisPort = 6379
const client = redis.createClient(redisPort)
client.on("error", (err) => {
    console.log(err);
})

module.exports = client