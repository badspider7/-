Object.myInstanceof = function (obj, fun) {
  if (obj === null) return false;

  if (Object.getPrototypeOf(obj) === fun.prototype) {
    return true;
  } else {
    return Object.myInstanceOf(Object.getPrototypeOf(obj), fun);
  }
};
