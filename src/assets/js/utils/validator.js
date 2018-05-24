/**
 * @Author JohnLi
 * @Date 2018/5/24 17:22
 */
function isInteger (value) {
  return Number.isInteger(value);
}

function isCharacter (value) {
  return !/[^a-zA-Z]/g.test(value);
}

function isIp (value) {
  return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
}

export {
  isInteger,
  isCharacter,
  isIp
};
