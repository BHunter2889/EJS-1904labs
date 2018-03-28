console.log(every([1, 3, 5], n => n < 10));
console.log(every([2, 4, 16], n => n < 10));
console.log(every([], n => n < 10));
console.log(everySome([1, 3, 5], n => n < 10));
console.log(everySome([2, 4, 16], n => n < 10));
console.log(everySome([], n => n < 10));

function every(array, pred) {
    for (let el of array) {
        if (!pred(el)) {
            return false;
        }
    }
    return true;
}

function everySome(array, pred) {
    return !array.some(el => !pred(el));
}