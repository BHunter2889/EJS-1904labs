//require('./VillageState.js');
var roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

var roadGraph = buildGraph(roads);

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return { place: destination, address: p.address };
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }

    static random(parcelCount = 5) {
        let parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            let address = randomPick(Object.keys(roadGraph));
            let place;
            do {
                place = randomPick(Object.keys(roadGraph));
            } while (place == address);
            parcels.push({ place, address });
        }
        return new VillageState("Post Office", parcels);
    }
}
var mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

compareRobots(efficientRobot, [], goalOrientedRobot, []);

function compareRobots(robot1, memory1, robot2, memory2) {
    console.log(measure(robot1, memory1, robot2, memory2));
}

function measure(robot1, memory1, robot2, memory2) {
    let turns1 = [],
        turns2 = [];
    for (let iter = 0; iter < 100; iter++) {
        let state = VillageState.random(randomLen());
        turns1.push(runRobot(state, robot1, memory1));
        turns2.push(runRobot(state, robot2, memory2));
    }
    let avg1 = turns1.reduce((x, y) => x + y) / turns1.length;
    let avg2 = turns2.reduce((x, y) => x + y) / turns2.length;
    return {
        robot1: avg1,
        robot2: avg2
    }
}

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

// function runEfficientRobot(state, robot, memory) {
//     for (let turn = 0;; turn++) {
//         if (state.parcels.length == 0) {
//             return turn;
//         }
//         let action = robot(state, memory);
//         state = state.move(action.direction);
//         memory = action.memory;
//     }
// }

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
    let work = [{ at: from, route: [] }];
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomLen() {
    let choice = Math.floor(Math.random() * mailRoute.length);
    return choice;
}

function goalOrientedRobot({ place, parcels }, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}

// Why Doesn't this work the way I think it should?
function efficientRobot({ place, parcels }, memory) {
    if (memory.length == 0) {
        let routes = [],
            places = [];
        // let minlen = Number.MAX_SAFE_INTEGER;

    
        let parcelsHere = parcels.filter(p => p.place == place);
        // console.log(parcelsHere);
        let pickups = parcels.filter(p => p.place != place);
        // console.log(pickups);
        routes.push(pickups.map(p => {
           return {isPickup: true, route: findRoute(roadGraph, place, p.place)}
        }));
        // console.log(routes);
        routes.push(parcelsHere.map(p => {
            return {isPickup: false, route: findRoute(roadGraph, place, p.address)}
        }));
        // console.log(routes);
        routes = routes.reduce(function(prev, curr) {
            return prev.concat(curr);
          });
        routes.sort((x,y) => {
            if (x.route.length == y.route.length) {
                return x.isPickup ? x : y;
            }
            else {
                return x.route.length <= y.route.length ? x : y
            }
        });
        // console.log(routes);
        memory = routes.map(r => r.route)[0];
        console.log("=============MEMORY==============");
        console.log(memory);


        // if (parcelsHere.length != 0) {
        //     // minlen = Math.min(minlen, parcelsHere.map(p => findRoute(roadGraph, place));)
        //     routes.push(parcelsHere);
        // }



        // for (let parcel of parcels) {
        //     places.push(parcel.place);
        //     if (parcel.place == place) {
        //         return {
        //             direction: findRoute(roadGraph, place, parcel.address)[0],
        //             memory: memory.slice(1)
        //         };
        //     }
        //     pickUp = findRoute(roadGraph, place, parcel.place);
        //     deliver = findRoute(roadGraph, place, parcel.address);
        //     let shouldPickUp = pickUp.length <= deliver.length &&
        //         pickUp.length > 0;
        //     routes.push(shouldPickUp ? pickUp : deliver);

        // }
        // let lengths = routes.map(r => r.length);
        // let shorties = routes.filter(l => l.length == Math.min(...lengths));

        // if (shorties.length > 1) {
        //     memory = preferPickup(shorties, places);
        // } else {
        //     memory = shorties[0];
        // }
    }
    // else if(memory.length == 0) {
    //     memory = memory.slice(1);
    // }
    // console.log(memory);
    return { direction: memory[0], memory: memory.slice(1) };
}

function preferPickup(routes, places) {
    for (route of routes) {
        if (places.includes(route[route.length - 1])) {
            return route;
        }
    }
    return routes[0];
}