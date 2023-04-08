import Redis from "ioredis";
import envs from "@/envs";

// Create a Redis client instance
const redis = new Redis(envs.value.redis.url);

export default redis;
