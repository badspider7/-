function shallowClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let clone = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = obj[key];
    }
  }
}
