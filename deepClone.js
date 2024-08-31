function deepClone(target, map = new Map()) {
  if (typeof target === "object" && target !== null) {
    let cloneTarget = Array.isArray(target) ? [] : {};
    //解决循环引用问题
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
