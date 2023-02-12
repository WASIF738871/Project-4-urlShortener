const redis = require("redis")
const { promisify } = require("util")

const redisClient = redis.createClient(
    10450,
    "redis-10450.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
redisClient.auth("Vxklo4qbS21tiXYHiRx2f1gVLQjcHf1h", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});
const SET_ASYNC = promisify(redisClient.SETEX).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

exports.GET_ASYNC = GET_ASYNC;
exports.SET_ASYNC = SET_ASYNC;