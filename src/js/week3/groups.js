class Group {
    constructor() {
        this.set = [];
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

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(30);
console.log(group.has(30));
// true
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false