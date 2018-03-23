let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));

function deepEqual(x, y) {
  if (x === y) {
    return true;
  }

  if (typeof x != "object" || !x || typeof y != "object" || !y) {
    return false;
  }

  let xProps = Object.keys(x), yProps = Object.keys(y);

  if (xProps.length != yProps.length) {
    return false
  }

  for (var prop of xProps) {
    if (!yProps.includes(prop) || !deepEqual(x[prop], y[prop])) {
      return false;
    }
  }

  return true;
}
