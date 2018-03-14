fizzbuzz();

function fizzbuzz() {
  let max = 100;
  for (i=1; i<=max; i++) {
    getFizzBuzzed(i);
  }
}

function getFizzBuzzed(num) {
  let fizz = 3, buzz = 5;
  if (num%fizz == 0 && num%buzz == 0) {
    console.log("fizzbuzz");
  } else if (num%fizz == 0) {
    console.log("fizz");
  } else if (num%buzz == 0) {
    console.log("buzz");
  } else {
    console.log(i);
  }
}
