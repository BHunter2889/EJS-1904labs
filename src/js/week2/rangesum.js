console.log(sum(range(1,10)));
console.log(range(5,2,-1));


function range(start, end, step = 1) {
  let up = start < end;
  if ((up && step <= 0) || (!up && step >= 0) ) {
    console.log("invalid params");
    return;
  }

  let range = [];
  if (up) {
    for (cur = start; cur <= end; cur += step) {
      range.push(cur);
    }
  } else {
    for (cur = start; cur >= end; cur += step) {
      range.push(cur);
    }
  }

  return range;
}

function sum(range) {
  let sum = 0;
  for (var i = 0; i < range.length; i++) {
      sum += range[i];
  }
  return sum;
}
