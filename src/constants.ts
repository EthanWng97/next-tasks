let value = {
  leetcode: {
    host_en: "https://leetcode.com",
    host_cn: "https://leetcode.cn",
  },
  "1point3acres": {
    host: "https://www.1point3acres.com",
    api_host: "https://api.1point3acres.com",
  },
};

const constants = {
  set: (newConstants: { [key: string]: any }): void => {
    Object.assign(value, newConstants);
  },
  get value(): { [key: string]: any } {
    return value;
  },
};

export default constants;
