// redis/redis.js
const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

client.connect(); // muista async jos haluat odottaa valmiiksi!

async function getAsync(key) {
  return await client.get(key);
}

async function incrAsync(key) {
  return await client.incr(key);
}

module.exports = {
  getAsync,
  incrAsync,
  client
};
