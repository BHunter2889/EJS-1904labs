require('./scripts.js');


console.log(dominantDirection("Hello!"));
console.log(dominantDirection("Hey, مساء الخير"));

function dominantDirection(input) {
    function findScript(code) {
      function inRange([from, to]) {
         return code >= from && code < to
      }
      return SCRIPTS.find(script => {
        return script.ranges.some(inRange);
      })
    }

    function group(char) {
        script = findScript(char.codePointAt(0));
        return script ? script.direction : "none";
    }
    let compareCount = (x, y) => x.count > y.count ? x : y;

    let scripts = countBy(input, group).filter(({ name }) => name != "none");

    let total = scripts.reduce((n, { count }) => n + count, 0);
    if (total == 0) return "No scripts found";

    return scripts.reduce((x, y) => x.count != y.count ? compareCount(x, y) : { name: x.name + "/" + y.name, count: x.count }).name;

}

function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1) {
            counts.push({ name, count: 1 });
        } else {
            counts[known].count++;
            //counts.reduce()
        }
    }
    return counts;
}
