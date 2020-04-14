// 对象清除值为空的键
export const handleObject = obj => {
  const newObj = {};
  for (const key in obj) {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
