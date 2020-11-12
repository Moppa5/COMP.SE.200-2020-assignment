import chai from "chai"
const expect = chai.expect

// Arithmetic category modules
import add from "../src/add.js"
import ceil from "../src/ceil.js"
import clamp from "../src/clamp.js"
import divide from "../src/divide.js"

// Reference constants
const zero = 0

const test = {
    ADD_BASIC: "Add a basic numbers",
    DIV_BASIC: "Divide a basic numbers",
    CLAMP_BASIC: "Clamp a basic number",
    CEIL_BASIC: "Ceil a basic number",
    LIMIT: "Limit values"
}

const modules = {
    ADD: {
        DESCRIPTION: "Add",
        MODEL: new Map([
            [test.ADD_BASIC, [ {p1: 25, p2: 4}, {p1: 45, p2: -2} ] ],
            [test.LIMIT, [ {p1: Infinity, p2: 2}, {p1: Infinity, p2: Infinity} ] ]
        ]),
        EXPECTED: new Map([
            [test.ADD_BASIC, [29, 43] ],
            [test.LIMIT, [Infinity, Infinity] ]
        ])
    }, 
    DIVIDE: {
        DESCRIPTION: "Divide",
        MODEL: new Map([
            [test.DIV_BASIC, [ {p1: 28, p2: 4}, {p1: 44, p2: -2} ] ],
            [test.LIMIT, [ {p1: 2, p2: Infinity}, {p1: Infinity, p2: 3} ] ]
        ]),
        EXPECTED: new Map([
            [test.DIV_BASIC, [7, -22] ],
            [test.LIMIT, [zero, Infinity] ]
        ])
    }, 
    CLAMP: {
        DESCRIPTION: "Clamp",
        MODEL: new Map([
            [test.CLAMP_BASIC, [ {p1: -10, p2: -5, p3: 5}, {p1: 10, p2: -5, p3: 5} ] ]
        ]),
        EXPECTED: new Map([
            [test.CLAMP_BASIC, [-5, 5] ]
        ])
    }, 
    CEIL: {
        DESCRIPTION: "Ceil",
        MODEL: new Map([
            [test.CEIL_BASIC, [ {p1: 4.006, p2: 0}, {p1: 6.004, p2: 2}, 
                {p1: 6040, p2: -2}, {p1: 4.99, p2: 0}, {p1: 4, p2: 0} ] ],
            [test.LIMIT, [{p1: Infinity, p2: 0}, {p1: 0, p2: 500}] ]
        ]),
        EXPECTED: new Map([
            [test.CEIL_BASIC, [5, 6.01, 6100, 5, 4] ],
            [test.LIMIT, [Infinity, 0] ]
        ])
    }
};

// Execute test
function runTests(module, moduleFunc) {

    describe(module.DESCRIPTION, ()=> {
        for (let testCase of module.MODEL.keys()) {    
            it(testCase, () => {
                let currentDataArray = module.MODEL.get(testCase)
                let expectedData = module.EXPECTED.get(testCase)
                let dataLength = currentDataArray.length

                for (let pos = 0; pos < dataLength; pos++ ) {

                    if (module.DESCRIPTION == modules.CLAMP.DESCRIPTION) {
                        // Clamp has 3 parameters
                        expect( moduleFunc(currentDataArray[pos].p1,
                            currentDataArray[pos].p2, 
                            currentDataArray[pos].p3) ).
                            to.equal(expectedData[pos])
                    } else {
                        // Other modules have either 2 or 1
                        expect( moduleFunc(currentDataArray[pos].p1,
                            currentDataArray[pos].p2)).to.equal(expectedData[pos])
                    }
                }
            })
        }
    })
}

runTests(modules.ADD, add)
runTests(modules.DIVIDE, divide)
runTests(modules.CLAMP, clamp)
runTests(modules.CEIL, ceil)