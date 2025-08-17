const assert = require('assert');
const { FarmGame } = require('../farmGame.js');

const game = new FarmGame({ startingMoney: 100 });

// grid size
assert.strictEqual(game.grid.length, 20);
assert.strictEqual(game.grid[0].length, 20);

// buy seeds
const bought = game.buySeed('carrot', 2);
assert.ok(bought);
assert.strictEqual(game.money, 100 - 10);
assert.strictEqual(game.inventory.seeds.carrot, 2);

// plant and grow without fertilizer
assert.ok(game.till(0, 0));
assert.ok(game.plant(0, 0, 'carrot'));
for (let day = 0; day < 3; day++) {
  game.water(0, 0);
  game.nextDay();
}
assert.ok(game.harvest(0, 0));
assert.strictEqual(game.inventory.crops.carrot, 1);

// fertilizer speeds growth
assert.ok(game.till(1, 0));
assert.ok(game.fertilize(1, 0));
assert.ok(game.plant(1, 0, 'carrot'));
for (let day = 0; day < 2; day++) {
  game.water(1, 0);
  game.nextDay();
}
assert.ok(game.harvest(1, 0));
assert.strictEqual(game.inventory.crops.carrot, 2);

// selling crops
const sold = game.sellCrop('carrot', 2);
assert.ok(sold);
assert.strictEqual(game.money, 100 - 10 + 20);

console.log('FarmGame tests passed');
