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

function isPlainObject (obj) {
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

export { createScript, isPlainObject };
