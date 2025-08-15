const game = new Game();
let currentPrices = {};

function renderTop() {
  const top = document.getElementById('top-bar');
  top.textContent = `Day: ${game.day} | Cash: ${game.cash} | Debt: ${game.debt} | Rep: ${game.reputation} | Compliance: ${game.compliance}%`;
}

function renderDistricts() {
  const div = document.getElementById('districts');
  div.innerHTML = '';
  Object.keys(game.districts).forEach(name => {
    const btn = document.createElement('button');
    btn.textContent = name;
    btn.disabled = name === game.currentDistrict;
    btn.addEventListener('click', () => {
      game.travel(name);
      renderAll();
    });
    div.appendChild(btn);
  });
}

function computePrices() {
  currentPrices = {};
  game.brands.forEach(brand => {
    currentPrices[brand.name] = {};
    Object.keys(game.itemTypes).forEach(type => {
      currentPrices[brand.name][type] = game.getPrice(brand.name, type);
    });
  });
}

function renderMarket() {
  computePrices();
  const table = document.getElementById('market');
  table.innerHTML = '';
  game.brands.forEach(brand => {
    const row = document.createElement('div');
    const title = document.createElement('span');
    title.textContent = brand.name;
    row.appendChild(title);

    const select = document.createElement('select');
    Object.keys(game.itemTypes).forEach(type => {
      const opt = document.createElement('option');
      opt.value = type;
      opt.textContent = `${type} (${currentPrices[brand.name][type]})`;
      select.appendChild(opt);
    });
    row.appendChild(select);

    const btn = document.createElement('button');
    btn.textContent = 'Buy';
    btn.addEventListener('click', () => {
      const type = select.value;
      const price = currentPrices[brand.name][type];
      if (game.buyItem(brand.name, type, 1, price)) {
        renderAll();
      } else {
        alert('Cannot buy item');
      }
    });
    row.appendChild(btn);
    table.appendChild(row);
  });
}

function renderInventory() {
  const div = document.getElementById('inventory');
  div.innerHTML = '';
  game.inventory.forEach((item, idx) => {
    const row = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = `${item.brand} ${item.type}`;
    row.appendChild(span);
    const price = currentPrices[item.brand] ? currentPrices[item.brand][item.type] : game.getPrice(item.brand, item.type);
    const sellBtn = document.createElement('button');
    sellBtn.textContent = `Sell (${price})`;
    sellBtn.addEventListener('click', () => {
      if (game.sellItem(idx, price)) {
        renderAll();
      }
    });
    row.appendChild(sellBtn);
    div.appendChild(row);
  });
}

function renderEvents() {
  const div = document.getElementById('events');
  div.innerHTML = '';
  game.eventLog.slice(-5).forEach(e => {
    const p = document.createElement('div');
    p.textContent = e;
    div.appendChild(p);
  });
}

function renderAll() {
  renderTop();
  renderDistricts();
  renderMarket();
  renderInventory();
  renderEvents();
}

document.getElementById('end-day').addEventListener('click', () => {
  game.endDay();
  renderAll();
});

renderAll();
