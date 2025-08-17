class FarmGame {
  constructor(options = {}) {
    this.width = 20;
    this.height = 20;
    this.money = options.startingMoney ?? 100;
    this.inventory = {
      seeds: {},
      crops: {}
    };
    this.seedTypes = {
      carrot: { cost: 5, sellPrice: 10, growth: 3 },
      potato: { cost: 8, sellPrice: 15, growth: 4 }
    };
    this.grid = [];
    for (let y = 0; y < this.height; y++) {
      const row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(this._createTile());
      }
      this.grid.push(row);
    }
  }

  _createTile() {
    return {
      tilled: false,
      watered: false,
      fertilized: false,
      crop: null
    };
  }

  _getTile(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return null;
    return this.grid[y][x];
  }

  buySeed(type, qty = 1) {
    const seed = this.seedTypes[type];
    if (!seed) return false;
    const cost = seed.cost * qty;
    if (this.money < cost) return false;
    this.money -= cost;
    this.inventory.seeds[type] = (this.inventory.seeds[type] || 0) + qty;
    return true;
  }

  sellCrop(type, qty = 1) {
    const cropQty = this.inventory.crops[type] || 0;
    if (qty > cropQty) return false;
    const seed = this.seedTypes[type];
    const revenue = seed.sellPrice * qty;
    this.inventory.crops[type] -= qty;
    this.money += revenue;
    return true;
  }

  till(x, y) {
    const tile = this._getTile(x, y);
    if (!tile) return false;
    tile.tilled = true;
    return true;
  }

  water(x, y) {
    const tile = this._getTile(x, y);
    if (!tile) return false;
    tile.watered = true;
    return true;
  }

  fertilize(x, y) {
    const tile = this._getTile(x, y);
    if (!tile) return false;
    tile.fertilized = true;
    return true;
  }

  plant(x, y, type) {
    const tile = this._getTile(x, y);
    if (!tile || !tile.tilled || tile.crop) return false;
    const seedQty = this.inventory.seeds[type] || 0;
    if (seedQty < 1) return false;
    this.inventory.seeds[type] -= 1;
    const seed = this.seedTypes[type];
    tile.crop = { type, stage: 0, growth: seed.growth };
    tile.watered = false;
    return true;
  }

  harvest(x, y) {
    const tile = this._getTile(x, y);
    if (!tile || !tile.crop) return false;
    if (tile.crop.stage < tile.crop.growth) return false;
    const type = tile.crop.type;
    this.inventory.crops[type] = (this.inventory.crops[type] || 0) + 1;
    this.grid[y][x] = this._createTile();
    return true;
  }

  nextDay() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tile = this.grid[y][x];
        if (tile.crop) {
          if (tile.watered) {
            tile.crop.stage += tile.fertilized ? 2 : 1;
          }
          tile.watered = false;
        }
      }
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = { FarmGame };
}
