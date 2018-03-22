console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));

function arrayToList(array) {
  let list = {};
  for (i = array.length - 1; i >= 0; i--) {
    list = {value: array[i], rest: list}
  }
  return list;
}

function listToArray(list) {
  let array = [];
  for (let node = list; node.rest; node = node.rest) {
      array.push(node.value);
      console.log(node.value);
  }
  return array;
}

function prepend(elem, list) {
  list = {value: elem, rest: list};
  return list;
}

function nth(list, index) {
  if (!index || !list.value) {
     return list.value || undefined;
  }

  return nth(list.rest, index - 1);
}
