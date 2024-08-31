var arr = [
  [2, 1, 1],
  [1, [1, 1, 1, 1]],
];

console.log(
  Array.from(arr.flat(Infinity)).reduce((item, currentValue) => {
    console.log("currentValue", currentValue);
    return item + currentValue;
  })
);
