const Redis = require("ioredis");

const redis = new Redis({
    port: 14280, //Redis port
    host: "redis-14280.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    username: "default",
    password: process.env.password,
});

module.exports = redis;