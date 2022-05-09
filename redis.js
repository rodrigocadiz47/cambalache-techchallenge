const redis  = require('redis');
const client = redis.createClient();
client.on('connect', (err) => console.log('Redis Client Connected'));
client.on('error', (err) => console.log('Redis Client Error', err));

async function startClient(){
    await client.connect();
}

startClient();

module.exports = {client}