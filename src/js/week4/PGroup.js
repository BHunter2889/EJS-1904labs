class PGroup {
  constructor(set) {
    this.set = set;
  }

  add(el) {
    if (this.has(el)) {
        return this;
    }
    return new PGroup(this.set.concat([el]));
  }

  delete(el) {
    if (!this.has(el)) return this;
    return new PGroup(this.set.filter(m => m !== el));
  }

  has(el) {
    return this.set.includes(el);
  }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false