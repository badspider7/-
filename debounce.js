//防抖
function debounce(callback, delay) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback.apply(this, arguments);
    }, delay);
  };
}
