/**Promise并发池 - 可终止 - 每次都创建一个实例，避免另一个池子的取消导致这个池子的取消 */
export class PromisePoolStatic {
  /**是否取消。在循环中若发现这个变成了true，就会中断 */
  #isStop = false;
  /**运行静态Promise并发池，当有大量promise并发时，可以通过这个来限制并发数量
   * @param taskList 任务列表
   * @param max 最大并发数量
   * @retrun 返回每个promise的结果，顺序和任务列表相同。 目前是成功和失败都会放入该结果
   */
  run = async (taskList, max) => {
    return (
      (new Promise() < Array < T) |
      (Err >>
        (async (resolve, reject) => {
          try {
            this.isStop = false; //开始的时候设为false
            const length = taskList.length;
            const pool = []; //并发池
            let count = 0; //当前结束了几个
            const res = new Array() < resType > length;
            for (let i = 0; i < length; i++) {
              let task = taskList[i]();
              if (this.isStop) return reject("并发池终止");
              //成功和失败都要执行的函数
              const handler = (_res) => {
                pool.splice(pool.indexOf(task), 1); //每当并发池跑完一个任务,从并发池删除个任务
                res[i] = _res; //放入结果数组
                count++;
                if (count === length) {
                  return resolve(res);
                }
              };

              task.then(
                (data) => {
                  handler(data);
                  console.log(`第${i}个任务完成，结果为`, data);
                },
                (err) => {
                  handler(err);
                  console.log(`第${i}个任务失败，原因为`, err);
                }
              );

              pool.push(task);

              if (pool.length === max) {
                //利用Promise.race方法来获得并发池中某任务完成的信号，当有任务完成才让程序继续执行,让循环把并发池塞满
                await Promise.race(pool);
              }
            }
          } catch (error) {
            console.error("promise并发池出错", error);
            reject(error);
          }
        }))
    );
  };
  /**停止并发池运行 */
  stop = () => {
    this.isStop = true;
  };
}
