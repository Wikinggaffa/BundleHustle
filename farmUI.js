const game = new FarmGame();
let currentTool = 'hoe';

const moneySpan = document.getElementById('money');
const gridDiv = document.getElementById('grid');
const seedSelect = document.getElementById('seed-select');

function init() {
  Object.keys(game.seedTypes).forEach(type => {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = `${type} ($${game.seedTypes[type].cost})`;
    seedSelect.appendChild(opt);
  });
  document.querySelectorAll('#tools button[data-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTool = btn.dataset.tool;
    });
  });
  document.getElementById('buy-seed').addEventListener('click', () => {
    const type = seedSelect.value;
    game.buySeed(type);
    render();
  });
  document.getElementById('next-day').addEventListener('click', () => {
    game.nextDay();
    render();
  });
  render();
}

function render() {
  moneySpan.textContent = game.money;
  renderGrid();
  renderInventory();
}

function renderGrid() {
  gridDiv.innerHTML = '';
  for (let y = 0; y < game.height; y++) {
    for (let x = 0; x < game.width; x++) {
      const tileDiv = document.createElement('div');
      tileDiv.classList.add('tile');
      const tile = game.grid[y][x];
      if (tile.tilled) tileDiv.classList.add('tilled');
      if (tile.crop) {
        tileDiv.classList.add('crop');
        if (tile.crop.stage >= tile.crop.growth) tileDiv.classList.add('ready');
      }
      if (tile.watered) tileDiv.classList.add('watered');
      if (tile.fertilized) tileDiv.classList.add('fertilized');
      tileDiv.addEventListener('click', () => handleTile(x, y));
      gridDiv.appendChild(tileDiv);
    }
  }
}

function handleTile(x, y) {
  switch (currentTool) {
    case 'hoe':
      game.till(x, y);
      break;
    case 'water':
      game.water(x, y);
      break;
    case 'fertilize':
      game.fertilize(x, y);
      break;
    case 'harvest':
      game.harvest(x, y);
      break;
    case 'plant':
      game.plant(x, y, seedSelect.value);
      break;
  }
  render();
}

function renderInventory() {
  const inv = document.getElementById('inventory');
  inv.innerHTML = '';
  const seedHeader = document.createElement('div');
  seedHeader.textContent = 'Seeds';
  inv.appendChild(seedHeader);
  Object.entries(game.inventory.seeds).forEach(([type, qty]) => {
    const row = document.createElement('div');
    row.textContent = `${type}: ${qty}`;
    inv.appendChild(row);
  });
  const cropHeader = document.createElement('div');
  cropHeader.textContent = 'Crops';
  inv.appendChild(cropHeader);
  Object.entries(game.inventory.crops).forEach(([type, qty]) => {
    const row = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = `${type}: ${qty}`;
    row.appendChild(span);
    const btn = document.createElement('button');
    btn.textContent = `Sell ($${game.seedTypes[type].sellPrice})`;
    btn.addEventListener('click', () => {
      game.sellCrop(type, 1);
      render();
    });
    row.appendChild(btn);
    inv.appendChild(row);
  });
}

init();
