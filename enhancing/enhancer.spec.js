const { succeed, fail, repair, get } = require("./enhancer.js");

const goodItem = {
  name: "Shield",
  enhancement: 10, // must be number between 0 and 20 inclusive
  durability: 50, // must be a number between 0 and 100 inclusive
};
const stringItem = {
  name: "Sword",
  enhancement: "10", // must be number between 0 and 20 inclusive
  durability: "50", // must be a number between 0 and 100 inclusive
};
const numItem = {
  name: 541316,
  enhancement: 20, // must be number between 0 and 20 inclusive
  durability: 90, // must be a number between 0 and 100 inclusive
};

describe("enhancer", () => {
  describe("repair", () => {
    const repGoodItem = repair(goodItem);
    const repStringItem = repair(stringItem);
    const repNumItem = repair(numItem);
    // it.todo("repairs durrability to 100")
    it("repairs durability to 100", () => {
      expect(repGoodItem.durability).toBe(100);
    });
    it("repairs durability to 100 even if it's a string", () => {
      expect(repStringItem.durability).toBe(100);
    });
    it("returns a number for durability", () => {
      expect(typeof repGoodItem.durability).toBe("number");
      expect(typeof repStringItem.durability).toBe("number");
    });
    it("returns all three key:value pairs", () => {
      expect(Object.keys(repGoodItem)).toStrictEqual([
        "name",
        "enhancement",
        "durability",
      ]);
    });
  });

  describe("success", () => {
    const sucGoodItem = succeed(goodItem);
    const sucStringItem = succeed(stringItem);
    const sucNumItem = succeed(numItem);

    it("item enhancement increased by 1", () => {
      expect(sucGoodItem.enhancement).toBe(11);
      expect(sucStringItem.enhancement).toBe(11);
    });
    it("when e-level is 20, it is unchanged", () => {
      expect(succeed(numItem).enhancement).toBe(20);
    });
    it("The durability of the item is not changed", () => {
      expect(sucGoodItem.durability).toBe(50);
    });
    it("returns a number for enhamcement", () => {
      expect(typeof sucGoodItem.enhancement).toBe("number");
      expect(typeof sucStringItem.enhancement).toBe("number");
    });
    it("returns all three key:value pairs", () => {
      expect(Object.keys(sucGoodItem)).toStrictEqual([
        "name",
        "enhancement",
        "durability",
      ]);
    });
  });
  
  describe("fail", () => {
    const failGoodItem = fail(goodItem);
    const failStringItem = fail(stringItem);
    const failNumItem = fail(numItem);

    it("If the item's enhancement is less than 15, the durability of the item is decreased by 5", () => {
      expect(failGoodItem.durability).toBe(45);
      expect(failStringItem.durability).toBe(45);
    });

    it("If the item's enhancement is 15 or more, the durability of the item is decreased by 10.", () => {
      expect(failNumItem.durability).toBe(80);
    });

    it("If the item's enhancement level is greater than 16, the enhancement level decreases by 1", () => {
      expect(
        fail({
          name: 541316,
          enhancement: 20,
          durability: 90,
        }).enhancement
      ).toBe(19);
      expect(
        fail({
          name: "Shield",
          enhancement: 10,
          durability: 50,
        }).enhancement
      ).toBe(10);
    });
    it("returns all three key:value pairs", () => {
      expect(Object.keys(failNumItem)).toStrictEqual([
        "name",
        "enhancement",
        "durability",
      ]);
    });
  });

  describe("get", () => {
    it("if the enhancement level is 0, the the name is not modified.", () => {
      expect(
        get({
          name: "Spear",
          enhancement: 0,
          durability: 50,
        })
      ).toStrictEqual({
        name: "Spear",
        enhancement: 0,
        durability: 50,
      });
    });
    it("if the enhancement level is greater than 0, change the name to include the enhancement level, preceded by a '[+]' before the item's name. ", () => {
      expect(
        get({
          name: "Spear",
          enhancement: 10,
          durability: 50,
        })
      ).toStrictEqual({
        name: "[+] Spear",
        enhancement: 10,
        durability: 50,
      });
      expect(
        get({
          name: 1234,
          enhancement: 10,
          durability: 50,
        })
      ).toStrictEqual({
        name: "[+] 1234",
        enhancement: 10,
        durability: 50,
      });
    });
  });
});
