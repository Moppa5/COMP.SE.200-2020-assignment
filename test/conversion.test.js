import chai from "chai"
const expect = chai.expect

// Conversion category modules
import toFinite from "../src/toFinite.js"
import toInteger from "../src/toInteger.js"
import toNumber from "../src/toNumber.js"
import toString from "../src/toString.js"

// Reference constants
const MAX_INTEGER = 1.7976931348623157e+308
const zero = 0

const test = {
    NUMBER: "Convert a basic number",
    STRING: "Convert a string",
    LIMIT: "Limit values",
    NAN: "NaN and null"
}

const modules = {
    FINITE: {
        DESCRIPTION: "toFinite",
        MODEL: new Map([
            [test.NUMBER, [9, 200] ],
            [test.STRING, ["3.2", "0"] ],
            [test.LIMIT, [Infinity, -Infinity, 0]],
            [test.NAN, [null, NaN] ]
        ]),
        EXPECTED: new Map([
            [test.NUMBER, [9, 200] ],
            [test.STRING, [3.2, zero] ],
            [test.LIMIT, [MAX_INTEGER, -MAX_INTEGER, zero]],
            [test.NAN, [zero, zero] ]
        ])
    }, 
    INTEGER: {
        DESCRIPTION: "toInteger",
        MODEL: new Map([
            [test.NUMBER, [9, 200] ],
            [test.STRING, ["3.2", "0"] ],
            [test.LIMIT, [Infinity, -Infinity, 0]],
            [test.NAN, [null, NaN] ]
        ]),
        EXPECTED: new Map([
            [test.NUMBER, [9, 200] ],
            [test.STRING, [3, zero] ],
            [test.LIMIT, [MAX_INTEGER, -MAX_INTEGER, zero]],
            [test.NAN, [zero, zero] ]
        ])
    }, 
    NUMBER: {
        DESCRIPTION: "toNumber",
        MODEL: new Map([
            [test.NUMBER, [9, 200] ],
            [test.STRING, ["3.2", "0"] ],
            [test.LIMIT, [Infinity, -Infinity, 0]],
            [test.NAN, [null] ] // NaN removed for equality reasons
        ]),
        EXPECTED: new Map([
            [test.NUMBER, [9, 200] ],
            [test.STRING, [3.2, zero] ],
            [test.LIMIT, [Infinity, -Infinity, zero]],
            [test.NAN, [zero, NaN] ]
        ])
    }, 
    STRING: {
        DESCRIPTION: "toString",
        MODEL: new Map([
            [test.NUMBER, [9, 200] ],
            [test.STRING, ["3.2", "0", [6,5,4] ] ],
            [test.LIMIT, [Infinity, -Infinity, -0]],
            [test.NAN, [null, NaN] ]
        ]),
        EXPECTED: new Map([
            [test.NUMBER, ["9", "200"] ],
            [test.STRING, ["3.2", "0", "6,5,4"] ],
            [test.LIMIT, ["Infinity", "-Infinity", "-0"]],
            [test.NAN, ["", "NaN"] ]
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
                    expect(moduleFunc(currentDataArray[pos])).to.equal(expectedData[pos])
                }
            })
        }
    })

}

runTests(modules.FINITE, toFinite);
runTests(modules.INTEGER, toInteger)
runTests(modules.NUMBER, toNumber)
runTests(modules.STRING, toString)
