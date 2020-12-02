import chai from "chai"
const expect = chai.expect

// Array category modules
// castArray static tested
import at from "../src/at.js" // very different, maybe move to object?
import chunk from "../src/chunk.js"
import compact from "../src/compact.js"
import countBy from "../src/countBy.js"
import difference from "../src/difference.js"
import drop from "../src/drop.js"
import every from "../src/every.js"
import filter from "../src/filter.js"
import map from "../src/map.js"
import reduce from "../src/reduce.js" // Note: Reduce belongs also to function category

const testArrays = {
    NUMBER: [0, 1, 2, -1, 10, 0, 40, -10, -11, 9, -10, 5],
    STRING: ["a", "5.", "c", "d", "es", "nolla", "40", "es", "asd", "sana", "es", "5."]
}

function runTests() {
    describe("chunk", ()=> {
        it("Number array: Array divided even", () => {
            expect(chunk(testArrays.NUMBER, 2)).to.eql(
                [[0, 1], [2, -1], [10, 0], [40, -10], [-11, 9], [-10, 5]]
            )
        }),
        it("String array: Array not divided even", () => {
            expect(
                chunk(testArrays.STRING, 5)).to.eql(
                [[0, 1, 2, -1, 10], [0, 40, -10, -11, 9], [-10, 5]]
            )
        })
    })

    describe("compact", ()=> {
        it("No falsey values", () => {
            expect(compact(testArrays.STRING))
                .to.eql(
                    testArrays.STRING
                )
        }),
        it("Falsey values", () => {
            expect(compact(
                    [true, false, null, 0, "", undefined, NaN, 1, "nice"]))
                .to.eql(
                    [true, 1, "nice"]
                )
        })
    })
}

runTests()