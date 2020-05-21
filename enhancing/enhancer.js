module.exports = {
  succeed,
  fail,
  repair,
  get,
};

const numItem = {
  name: 541316,
  enhancement: 20, // must be number between 0 and 20 inclusive
  durability: 90 // must be a number between 0 and 100 inclusive
}

function succeed(item) {
  const succeedItem = item;
  ++succeedItem.enhancement
  if (succeedItem.enhancement < 20) {
    return { ...succeedItem };
  } else {
    return { ...succeedItem, enhancement: 20 };
  }
}

function fail(item) {
  const failItem = item
  if (failItem.enhancement < 15) {
    failItem.durability -= 5;
    return { ...failItem };
  } else {
    failItem.durability -= 10;
    if (failItem.enhancement > 16) {
      failItem.enhancement -= 1;
      return { ...failItem };
    } else {
      return { ...failItem };
    }
  }
}
// console.log(fail(numItem))

function repair(item) {
  const repairItem = item
  return { ...repairItem, durability: 100 };
}

function get(item) {
  const getItem = item;
  if (getItem.enhancement === 0) {
    return getItem;
  } else {
    return { ...getItem, name: `[+] ${getItem.name}` };  }
}
