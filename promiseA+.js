// 一个十分简易的 promise

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined; // 临时保存 resolve 中的参数
    this.reason = undefined; // 临时保存 reject 中的参数
    this.onFulfilledCallbacks = []; // 装 then 中的回调
    this.onRejectedCallbacks = []; // 装 catch 中的回调

    const resolve = (value) => {
      // 判断状态，保证 resolve,reject 只会执行一个状态
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        // cb 代表数组里面的每一项
        this.onFulfilledCallbacks.forEach((cb) => cb(value));
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        // cb 代表数组里面的每一项
        this.onRejectedCallbacks.forEach((cb) => cb(value));
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // 并且要返回一个 Promise()，这样才能实现接多个 .then 的效果
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    return new MyPromise((resolve, reject) => {
      const fulfilledCallback = () => {
        try {
          const result = onFulfilled(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      const rejectedCallback = () => {
        try {
          const result = onRejected(this.reason);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === "fulfilled") {
        setTimeout(fulfilledCallback, 0);
      } else if (this.state === "rejected") {
        setTimeout(rejectedCallback, 0);
      } else if (this.state === "pending") {
        this.onFulfilledCallbacks.push(fulfilledCallback);
        this.onRejectedCallbacks.push(rejectedCallback);
      }
    });
  }
}
// 使用示例
new MyPromise((resolve, reject) => {
  // 模拟异步操作
  setTimeout(() => {
    resolve("成功");
  }, 1000);
}).then((res) => {
  console.log(res); // 输出 "成功"
});
