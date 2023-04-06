let value = {
  leetcode: {
    host_en: "https://leetcode.com",
    host_cn: "https://leetcode.cn",
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
