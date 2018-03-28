let arrays = [
    [1, 2, 3],
    [4, 5],
    [6]
];
console.log(flatten(arrays));


function flatten(arrays) {
    return arrays.reduce((x, y) => x.concat(y));
}