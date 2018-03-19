"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isPrime = (num) => {
    for (let i = 2; i < num; i += 1)
        if (num % i === 0)
            return false;
    return num !== 1;
};
const getOutput = (input = 93) => {
    const a = 1;
    let b = input;
    let c = b;
    let h = 0;
    b *= 100;
    b += 100000;
    c = b + 17000;
    for (let i = b; i <= c; i += 17) {
        if (!isPrime(i))
            h += 1;
    }
    return h;
};
exports.getOutput = getOutput;
//# sourceMappingURL=coprocessor-part2.js.map