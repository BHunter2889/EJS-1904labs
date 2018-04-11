"use strict";

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
    for(;;) {
        try {
            let res = primitiveMultiply(a, b);
            return res;        
        } catch (error) {
            if(!error instanceof MultiplicatorUnitFailure) {
                throw error;
            } 
        }
    }
}

console.log(reliableMultiply(8, 8));
// → 64