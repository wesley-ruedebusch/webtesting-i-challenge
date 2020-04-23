const { succeed, fail, repair, get } = require('./enhancer.js');
// test away!
const item = {
    name: "shield",
    durability: 0,
    enhancement: 0
};
const goodItem = {
    name: "shield",
    durability: 50,
    enhancement: 14
};
const betterItem = {
    name: "shield",
    durability: 75,
    enhancement: 16
};
const bestItem = {
    name: "shield",
    durability: 100,
    enhancement: 20
};


describe("enhancer.js", () => {
    it("should run tests without any errors", () => {
        expect(true).toBe(true);
    });

    describe("repair()", () => {
        it("should take an item and return that item with its durability at 100", () => {
            repair(item);
            expect(item.durability).toBe(100);
            // repair(goodItem);
            // expect(goodItem.durability).toBe(100);
        })
    });

    describe("succeed()", () => {
        it("should take an object and return with its enhancement + 1", () => {
            succeed(item);
            expect(item.enhancement).toBe(1);
        });
        it("should not change the enhancement if it is already at 20 or more", () => {
            succeed(bestItem);
            expect(bestItem.enhancement).toBe(20);
        })
    })

    describe("fail", () => {
        it("if enhancement is > 17, it should subtract 10 from durability and 1 from enhancement", () => {
            fail(bestItem);
            expect(bestItem.durability).toBe(90);
            expect(bestItem.enhancement).toBe(19);
        })
        it("should subtract 10 from durability if enhancement is between 15 and 17, but wont change the enhancement", () => {
            fail(betterItem);
            expect(betterItem.durability).toBe(65);
            expect(betterItem.enhancement).toBe(16);
        })
        it("should subtract 5 from durability if enhancement is less than 15", () => {
            fail(goodItem);
            expect(goodItem.durability).toBe(45);
        })
    })
})