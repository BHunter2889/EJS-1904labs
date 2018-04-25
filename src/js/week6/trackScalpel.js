import {bigOak} from "./crow-tech";

function findRoute(from, to, connections) {
    let work = [{at: from, via: null}];
    for (let i = 0; i < work.length; i++) {
      let {at, via} = work[i];
      for (let next of connections.get(at) || []) {
        if (next == to) return via;
        if (!work.some(w => w.at == next)) {
          work.push({at: next, via: via || next});
        }
      }
    }
    return null;
}

function routeRequest(nest, target, type, content) {
    if (nest.neighbors.includes(target)) {
      return request(nest, target, type, content);
    } else {
      let via = findRoute(nest.name, target,
                          nest.state.connections);
      if (!via) throw new Error(`No route to ${target}`);
      return request(nest, via, "route",
                     {target, type, content});
    }
}

function storage(nest, name) {
    return new Promise(resolve => {
        nest.readStorage(name, result => resolve(result));
    });
}

function anyStorage(nest, source, name) {
    if (source == nest.name) return storage(nest, name);
    else return routeRequest(nest, source, "storage", name);
}

// -----------------*Sigh*----------------------
async function locateScalpel(nest) {
    // Your code here.
}

function locateScalpel2(nest) {
// Your code here.
}

locateScalpel(bigOak).then(console.log);
// → Butcher Shop
locateScalpel2(bigOak).then(console.log);
// → Butcher Shop