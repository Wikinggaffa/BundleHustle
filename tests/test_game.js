const assert = require('assert');
const { Game } = require('../game.js');

const game = new Game({ random: () => 0.5, eventChance: 0 });

// initial state
assert.strictEqual(game.cash, 1000);
assert.strictEqual(game.day, 1);

// price check and buy
const buyPrice = game.getPrice('FlickFaucet', 'Promo Code');
assert.strictEqual(buyPrice, 40);
const bought = game.buyItem('FlickFaucet', 'Promo Code', 1, buyPrice);
assert.ok(bought);
assert.strictEqual(game.cash, 1000 - buyPrice);
assert.strictEqual(game.inventory.length, 1);

// travel and sell
const travelled = game.travel('FamilyHub');
assert.ok(travelled);
assert.strictEqual(game.cash, 1000 - buyPrice - game.travelCost);
assert.strictEqual(game.day, 2);
const sellPrice = game.getPrice('FlickFaucet', 'Promo Code');
const sold = game.sellItem(0, sellPrice);
assert.ok(sold);
assert.strictEqual(game.inventory.length, 0);
assert.strictEqual(game.reputation, 1);

// compliance test
// travel back to DormNet for predictable price
game.travel('DormNet');
const bundlePrice = game.getPrice('PearTV+', 'Bundle Slot');
const boughtBundles = game.buyItem('PearTV+', 'Bundle Slot', 6, bundlePrice);
assert.ok(boughtBundles);
assert.strictEqual(game.inventory.length, 6);
assert.strictEqual(game.compliance, 10);

console.log('All tests passed');
