const { RedisPubSub } = require ('graphql-redis-subscriptions');
const Redis = require ('ioredis');

const options = {
  host: "redis-13960.c293.eu-central-1-1.ec2.cloud.redislabs.com",
  port: 13960,
  password: "9uC7sv6T5AzB7GO1vKgX2EtwQdLqTh1k",
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};


const pubsub = new RedisPubSub({
  
  publisher: new Redis(options),
  subscriber: new Redis(options)
});

module.exports = pubsub