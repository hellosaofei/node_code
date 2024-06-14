import { Redis } from "ioredis";
//
class RedisStore {
  constructor(redisConig) {
    this.redis = new Redis(redisConig);
  }
  async get(key) {
    const data = await this.redis.get(`SESSION:${key}`);
    return JSON.parse(data);
  }
  async set(key, sess, maxAge) {
    await this.redis.set(
      `SESSION:${key}`,
      JSON.stringify(sess),
      `EX`,
      maxAge / 1000
    );
  }
  async destroy(key) {
    return await this.redis.del(`SESSION:${key}`);
  }
}

export default RedisStore;
