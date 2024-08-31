//节流

function throttle(fn, interval, options = { leading: true }) {
  // 1.记录上一次的开始时间
  let lastTime = 0;
  const { leading } = options;

  // 2.事件触发时, 真正执行的函数
  const _throttle = function (...args) {
    // 2.1.获取当前事件触发时的时间
    const nowTime = new Date().getTime();
    //当lastTime为0时且第一次不执行，此时 remainTime = interval - (nowTime - lastTime) = interval > 0
    if (!lastTime && !leading) lastTime = nowTime; //决定第一次是否执行函数

    // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
    const remainTime = interval - (nowTime - lastTime);
    if (remainTime <= 0) {
      // 2.3.真正触发函数
      fn.apply(this, args);
      // 2.4.保留上次触发的时间
      lastTime = nowTime;
    }
  };

  return _throttle;
}
