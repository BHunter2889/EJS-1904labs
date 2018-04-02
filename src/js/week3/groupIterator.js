class Group {
    constructor() {
        this.set = [];
        this[Symbol.iterator] = function() {
            return new GroupIterator(this)
        }
    }

    add(el) {
        if (!this.set.includes(el)) {
            this.set.push(el);
        }
    }

    delete(el) {
        this.set = this.set.filter(x => x !== el);
    }

    has(el) {
        return this.set.includes(el);
    }

    static from(iterable) {
        let newSet = new Group();
        for (let el of iterable) {
            newSet.add(el);
        }
        return newSet;
    }

}

class GroupIterator {
    constructor(group) {
        this.current = 0;
        this.group = group;
    }

    next() {
        if (this.current == this.group.set.length) {
            return { done: true };
        }
        let value = this.group.set[this.current];
        this.current++;

        return { value, done: false };
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
// → a
// → b
// → c