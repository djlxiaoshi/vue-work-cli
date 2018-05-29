/**
 * @Author JohnLi
 * @Date 2018/5/18 11:02
 */

function createScript (src, cb) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = src;
  document.body.appendChild(script);
  script.onload = function () {
    if (typeof cb === 'function') {
      cb();
    }
  };
}

function isNullObject (obj) {
  if (Object.keys) {
    return Object.keys(obj).length > 0;
  } else {
    for (let i in obj) {
      if (Object.hasOwnProperty(i)) {
        return true;
      }
    }
    return false;
  }
}

/* 是否是整数 */
function isInteger (value) {
  // + 将字符串转换成对应的数值
  return Number.isInteger(+value);
}

/* 是否是英文字母 */
function isVariable (value) {
  return !/^[0-9]|[^a-zA-Z0-9_]/g.test(value);
}

/* 是否是ip */
function isIp (value) {
  return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
}

export {
  createScript,
  isNullObject,
  isInteger,
  isVariable,
  isIp
};
