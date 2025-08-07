// redis.js
const redis = require('redis');

const redisUrl = process.env.REDIS_URL;
const client = redis.createClient({
  url: redisUrl
});

client.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
    console.log('Redis client connected');
  }
}

async function getAsync(key) {
  return await client.get(key);
}

async function setAsync(key, value) {
  return await client.set(key, value);
}

async function incrAsync(key) {
  return await client.incr(key);
}

module.exports = {
  client,
  connectRedis,
  getAsync,
  setAsync,
  incrAsync
};
