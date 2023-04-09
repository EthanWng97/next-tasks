let env = process.env;
let value = {
  leetcode: {
    telegram_chat_id: env.LEETCODE_TELEGRAM_CHAT_ID,
  },
  telegram: {
    bot_token: env.TELEGRAM_BOT_TOKEN,
  },
  telegraph: {
    access_token: env.TELEGRAPH_ACCESS_TOKEN,
  },
  cloudconvert: {
    api_key: env.CLOUDCONVERT_API_KEY,
  },
  google: {
    account: env.GOOGLE_ACCOUNT,
    app_password: env.GOOGLE_APP_PASSWORD,
  },
  mongodb: {
    uri: env.MONGODB_URI,
  },
  redis: {
    url: env.REDIS_URL,
  },
  rss: {
    url: env.RSS_URL,
  },
};

const envs = {
  set: (newEnvs: { [key: string]: any }): void => {
    Object.assign(value, newEnvs);
  },
  get value(): { [key: string]: any } {
    return value;
  },
};

export default envs;
