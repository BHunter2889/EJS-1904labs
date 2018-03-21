console.log(isEven(50));
console.log(isEven(75));

function isEven(x) {
  if (x === 0) {
    return true;
  } else if (x === 1) {
    return false;
  }

  return isEven(x - 2)
}
