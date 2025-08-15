class Game {
  constructor(options = {}) {
    // Top-level state
    this.day = 1;
    this.cash = 1000;
    this.debt = 0;
    this.reputation = 0;
    this.compliance = 0;
    this.walletCapacity = 20;
    this.inventory = [];
    this.currentDistrict = 'DormNet';

    // Allow dependency injection of RNG for deterministic tests
    this.random = options.random || Math.random;
    this.eventChance = options.eventChance ?? 0.5;

    this.travelCost = 10;

    // Data definitions
    this.brands = this._initBrands();
    this.districts = this._initDistricts();
    this.itemTypes = this._initItemTypes();
    this.eventDefinitions = this._initEvents();
    this.eventLog = [];
  }

  _initBrands() {
    return [
      { name: 'FlickFaucet', base: 40 },
      { name: 'Castle+', base: 35 },
      { name: 'ParcelPlay Video', base: 30 },
      { name: 'GreenScreen', base: 45 },
      { name: 'PearTV+', base: 50 },
      { name: 'Mammoth', base: 55 },
      { name: 'CurioFlow', base: 25 },
      { name: 'GoalLine+', base: 40 },
      { name: 'NoriRoll', base: 30 },
      { name: 'ScreamBeam', base: 20 }
    ];
  }

  _initDistricts() {
    // Each district has modifiers per brand (percentage change)
    const b = this.brands.map(br => br.name);
    const zeros = b.reduce((acc, name) => { acc[name] = 0; return acc; }, {});
    return {
      'DormNet': {
        modifiers: {
          ...zeros,
          'FlickFaucet': -0.1,
          'Castle+': -0.1,
          'ParcelPlay Video': -0.05,
          'GoalLine+': 0.05,
          'NoriRoll': 0.1
        }
      },
      'FamilyHub': {
        modifiers: {
          ...zeros,
          'Castle+': 0.15,
          'FlickFaucet': 0.1,
          'GoalLine+': -0.05,
          'ScreamBeam': -0.05
        }
      },
      'CaféWi-Fi Row': {
        modifiers: {
          ...zeros,
          'ParcelPlay Video': 0.05,
          'GreenScreen': -0.05,
          'CurioFlow': 0.05
        }
      },
      'SmartTV Plaza': {
        modifiers: {
          ...zeros,
          'PearTV+': 0.1,
          'Mammoth': 0.05,
          'FlickFaucet': 0.05
        }
      },
      'SportsSphere': {
        modifiers: {
          ...zeros,
          'GoalLine+': 0.3,
          'ScreamBeam': -0.1
        }
      },
      'Otaku Arcade': {
        modifiers: {
          ...zeros,
          'NoriRoll': 0.25,
          'Castle+': -0.05
        }
      },
      'Office LAN': {
        modifiers: {
          ...zeros,
          'CurioFlow': 0.1,
          'GreenScreen': 0.05
        }
      },
      'Cinephile Alley': {
        modifiers: {
          ...zeros,
          'PearTV+': 0.2,
          'Castle+': 0.1
        }
      }
    };
  }

  _initItemTypes() {
    return {
      'Promo Code': { margin: 0.1, expiration: 5, risk: 0.1 },
      'Gift Card': { margin: 0.2, expiration: null, risk: 0.05 },
      'Bundle Slot': { margin: 0.6, expiration: null, risk: 0.3 },
      'Limited-Series Pass': { margin: 0.4, expiration: 10, risk: 0.2 },
      'Sports Weekend Pass': { margin: 0.5, expiration: 3, risk: 0.3 }
    };
  }

  _initEvents() {
    return [
      {
        name: 'Password Sharing Crackdown',
        apply: (game) => {
          game.eventLog.push('Password Sharing Crackdown: bundle slots drop, gift cards rise');
          game.brands.forEach(br => {
            br.tempModifier = (br.tempModifier || 0) - 0.2;
          });
        }
      },
      {
        name: 'Blockbuster Drop',
        apply: (game) => {
          game.eventLog.push('Blockbuster Drop: FlickFaucet, Mammoth, PearTV+ surge');
          game.brands.forEach(br => {
            if (['FlickFaucet', 'Mammoth', 'PearTV+'].includes(br.name)) {
              br.tempModifier = (br.tempModifier || 0) + 0.3;
            }
          });
        }
      },
      {
        name: 'Sports Final Weekend',
        apply: (game) => {
          game.eventLog.push('Sports Final Weekend: GoalLine+ prices explode');
          game.brands.forEach(br => {
            if (['GoalLine+'].includes(br.name)) {
              br.tempModifier = (br.tempModifier || 0) + 0.5;
            }
          });
        }
      },
      {
        name: 'Service Outage',
        apply: (game) => {
          game.eventLog.push('Service Outage: All prices crater');
          game.brands.forEach(br => {
            br.tempModifier = (br.tempModifier || 0) - 0.2;
          });
        }
      }
    ];
  }

  getPrice(brandName, itemTypeName) {
    const brand = this.brands.find(b => b.name === brandName);
    const district = this.districts[this.currentDistrict];
    const itemType = this.itemTypes[itemTypeName];
    if (!brand || !district || !itemType) return 0;

    const base = brand.base * (1 + itemType.margin);
    const districtMod = district.modifiers[brandName] || 0;
    const eventMod = brand.tempModifier || 0;
    const volatility = (this.random() * 0.2) - 0.1; // ±10%
    const price = Math.max(1, Math.round(base * (1 + districtMod + eventMod + volatility)));
    return price;
  }

  travel(districtName) {
    if (!this.districts[districtName]) return false;
    if (this.cash < this.travelCost) return false;
    this.cash -= this.travelCost;
    this.currentDistrict = districtName;
    this.day += 1;
    this._dailyTick();
    return true;
  }

  endDay() {
    this.day += 1;
    this._dailyTick();
  }

  buyItem(brandName, itemTypeName, quantity = 1, priceOverride) {
    const unitPrice = priceOverride ?? this.getPrice(brandName, itemTypeName);
    const price = unitPrice * quantity;
    if (this.cash < price) return false;
    if (this.inventory.length + quantity > this.walletCapacity) return false;
    const itemType = this.itemTypes[itemTypeName];
    for (let i = 0; i < quantity; i++) {
      this.inventory.push({
        brand: brandName,
        type: itemTypeName,
        purchasePrice: unitPrice,
        expiration: itemType.expiration ? this.day + itemType.expiration : null
      });
    }
    this.cash -= price;
    this._updateCompliance();
    return true;
  }

  sellItem(index, priceOverride) {
    const item = this.inventory[index];
    if (!item) return false;
    const sellPrice = priceOverride ?? this.getPrice(item.brand, item.type);
    this.cash += sellPrice;
    this.inventory.splice(index, 1);
    this.reputation += 1;
    this._updateCompliance();
    return true;
  }

  _updateCompliance() {
    const bundleSlots = this.inventory.filter(i => i.type === 'Bundle Slot').length;
    this.compliance = Math.max(0, (bundleSlots - 5) * 10);
  }

  _dailyTick() {
    // Handle expiration
    this.inventory = this.inventory.filter(item => !item.expiration || item.expiration > this.day);

    // Apply random event
    this.brands.forEach(b => delete b.tempModifier);
    if (this.random() < this.eventChance) {
      const ev = this.eventDefinitions[Math.floor(this.random() * this.eventDefinitions.length)];
      ev.apply(this);
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = { Game };
}
