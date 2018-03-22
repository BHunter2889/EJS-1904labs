console.log(reverseArray(["A", "B", "C"]));
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue)
console.log(arrayValue);

function reverseArray(array) {
  let ret = [];
  for (j = array.length - 1; j >= 0; j--) {
      ret.push(array[j])
  }
  return ret;
}

function reverseArrayInPlace(array) {
  for (i = 0, j = array.length - 1; i < j; j--, i++) {
      let x = array[j];
      array[j] = array[i];
      array[i] = x;
  }
}
