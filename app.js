/* ==========================================================================
   Astro Winter Armor II - Interactive Web Application Logic
   ========================================================================== */

// App State
const state = {
  selectedSize: 'S',
  selectedColor: 'default',
  selectedProductId: 'jacket',
  hudActive: false,
  blueprintMode: false,
  weatherMode: 'default',
  audioEnabled: false,
  favoritesCount: 0,
  isFavorite: false,
  cart: [],
  currentView: 'hero' // Default is home brand portal dashboard
};

// Complete Product Specs Database
const productDb = {
  jacket: {
    title: "ASTRO WINTER<br>ARMOR II",
    price: "$560",
    priceRaw: 560,
    desc: "Engineered for high-altitude orbital operations and sub-zero planetary descents. The ASTRO Winter Armor II combines smart nano-heating filaments with a flexible graphene outer shell to offer unparalleled climate isolation.",
    image: "assets/jacket_white.png",
    tag: "FLAGSHIP SUIT",
    hasBlueprint: true,
    blueprintImg: "assets/jacket_blueprint.png",
    sizes: ["XS", "S", "M", "XL"],
    defaultSize: "S",
    colors: [
      { id: "88ies", name: "88IES (WHITE)", cssClass: "circle-88ies", file: "assets/jacket_white.png" },
      { id: "reb", name: "REB (RED)", cssClass: "circle-reb", file: "assets/jacket_red.png" },
      { id: "slack", name: "SLACK (BLACK)", cssClass: "circle-slack", file: "assets/jacket_black.png" },
      { id: "seary", name: "SEARY (GREY)", cssClass: "circle-seary", file: "assets/jacket_grey.png" }
    ],
    defaultColor: "88ies",
    materials: [
      "Outer Layer: Graphene-infused ripstop shell (waterproof)",
      "Insulation: Aerogel thin-film composites",
      "Heating: Carbon nano-tube grid powered by standard battery",
      "Interfacing: HUD compatible diagnostic patches"
    ],
    hotspots: [
      { top: "15%", left: "50%", title: "NODE 01: ADVANCED HOOD", body: "Triple-layer aerogel insulated hood with integrated communication microphones and optical HUD connectors." },
      { top: "35%", left: "55%", title: "NODE 02: ACTIVE HEATING", body: "Active carbon nanotube heating coils mapped to 3 core zones. Adjusts heat output relative to external sensor telemetry." },
      { top: "33%", left: "78%", title: "NODE 03: UTILITY SLEEVE", body: "Water-resistant utility cargo pocket housing the battery hub and dynamic status display screen." },
      { top: "80%", left: "30%", title: "NODE 04: SEALED CUFFS", body: "Elasticized gaskets with Velcro fasteners to isolate wrist-level weather entry and interface with heavy gloves." }
    ]
  },
  boots: {
    title: "ASTRO RECON<br>BOOTS",
    price: "$320",
    priceRaw: 320,
    desc: "Built to conquer frozen crevasses and jagged crater rims. The Astro Recon Boots feature high-torque dynamic stabilizers and integrated micro-solenoids for magnetic deck locking.",
    image: "assets/product_boots.png",
    tag: "SURFACE PROTECTION",
    hasBlueprint: false,
    sizes: ["8", "9", "10", "11"],
    defaultSize: "10",
    colors: [
      { id: "default", name: "STEEL ORANGE", cssClass: "circle-88ies", file: "assets/product_boots.png" }
    ],
    defaultColor: "default",
    materials: [
      "Soles: Electromagnetic locking iron cores",
      "Insulation: Multi-chamber vulcanized neoprene",
      "Protection: Outer composite shin armor plating",
      "Fit: Dynamic ankle pressurization gaskets"
    ],
    hotspots: [
      { top: "75%", left: "50%", title: "NODE 01: MAGNETIC CLAMP", body: "Dual solenoid electromagnetic grids inside sole plates. Securely anchors explorer to metallic hulls and decking." },
      { top: "35%", left: "48%", title: "NODE 02: COMPRESSION SLEEVE", body: "Active hydraulic ankle support rings. Prevents joint sprains during heavy-load surface traverses." }
    ]
  },
  gloves: {
    title: "ASTRO NANO-GRIP<br>GLOVES",
    price: "$140",
    priceRaw: 140,
    desc: "Deliver mechanical dexterity and sub-zero grip security. The Nano-Grip gloves are tailored in thin-profile aramid grids with capacitive tips for interface operation.",
    image: "assets/product_gloves.png",
    tag: "VACUUM INTERFACING",
    hasBlueprint: false,
    sizes: ["S", "M", "L"],
    defaultSize: "M",
    colors: [
      { id: "default", name: "TACTICAL BLACK", cssClass: "circle-slack", file: "assets/product_gloves.png" }
    ],
    defaultColor: "default",
    materials: [
      "Fabric: Kevlar-reinforced composite weave",
      "Grip: Electro-capacitive nano-suction pads",
      "Seal: Double-cuff pressure lock compression",
      "Sensors: Finger-level thermal feedback nodes"
    ],
    hotspots: [
      { top: "45%", left: "50%", title: "NODE 01: NANO-SUCTION PADS", body: "Capacitive micro-gaskets coating the palms. Allows high-friction handling of frozen space components." },
      { top: "78%", left: "45%", title: "NODE 02: PRESSURE CUFFS", body: "Velcro sealing rings that compress suit sleeves, securing hermetic gas containment." }
    ]
  },
  visor: {
    title: "ASTRO HOLOGRAPHIC<br>VISOR",
    price: "$450",
    priceRaw: 450,
    desc: "Complete operational overview at a glance. The Holographic Visor wraps inside suit helmet assemblies, projecting target overlays, distance telemetry, and suit log tickers.",
    image: "assets/product_visor.png",
    tag: "COGNITIVE OVERLAY",
    hasBlueprint: false,
    sizes: ["ONE SIZE"],
    defaultSize: "ONE SIZE",
    colors: [
      { id: "default", name: "HUD CYAN", cssClass: "circle-seary", file: "assets/product_visor.png" }
    ],
    defaultColor: "default",
    materials: [
      "Lens: Quad-pane anti-radiation polycarbonate",
      "HUD: Micro-LED inner projector overlays",
      "Sensors: Infrared eye tracking cameras",
      "Comms: Integrated noise-canceling audio grid"
    ],
    hotspots: [
      { top: "35%", left: "50%", title: "NODE 01: SOLAR DEFLECTOR", body: "Polycarbonate face shield that dynamically darkens under direct sunlight to protect optics from UV damage." },
      { top: "60%", left: "30%", title: "NODE 02: HUD PROJECTOR", body: "Dual side lenses projecting telemetry metrics directly on the visor’s inner layer." }
    ]
  },
  backpack: {
    title: "ASTRO ECLIPSE<br>BACKPACK",
    price: "$280",
    priceRaw: 280,
    desc: "Carry life support systems with zero bulk. The Astro Eclipse Backpack is modularly built in lightweight structural grids, supporting quick oxygen canister clamps.",
    image: "assets/product_backpack.png",
    tag: "LIFE SUPPORT INTEGRATION",
    hasBlueprint: false,
    sizes: ["45L"],
    defaultSize: "45L",
    colors: [
      { id: "default", name: "TACTICAL GREY", cssClass: "circle-seary", file: "assets/product_backpack.png" }
    ],
    defaultColor: "default",
    materials: [
      "Shell: Kevlar ripstop frame weave",
      "Harness: Gravity balancing load lifters",
      "Battery: Solar charging outer array cover",
      "Mounts: Magnetic weapon/tool holsters"
    ],
    hotspots: [
      { top: "40%", left: "45%", title: "NODE 01: O2 SYSTEM CLAMPS", body: "Universal latching system that holds emergency oxygen cylinders securely." },
      { top: "75%", left: "50%", title: "NODE 02: SOLAR RECHARGE", body: "Back solar panel cell grid. Feeds battery cells to sustain active heating gear." }
    ]
  }
};

// Explorer Telemetry Data Cache (Homepage)
const explorerVitals = {
  alpha: { planet: 'MARS (SECTOR C)', temp: '-62°C', hr: '72 BPM', o2: '94%', vital: '98%', status: 'HEATING ACTIVE', statusClass: 'text-green' },
  beta: { planet: 'VENUS (DOME 02)', temp: '462°C', hr: '108 BPM', o2: '88%', vital: '91%', status: 'REFRIGERANT MAX', statusClass: 'text-orange' },
  gamma: { planet: 'ORBIT SPACE VOID', temp: '-182°C', hr: '65 BPM', o2: '99%', vital: '100%', status: 'PRESSURE LOCKED', statusClass: 'text-green' }
};

// Audio Context and Synth Settings
let audioCtx = null;

// Initialize Sound Synthesizer (Only on user interaction to comply with browser policies)
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Play Synthesized Sci-Fi Sound Effects
function playSound(type) {
  if (!state.audioEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime;

  switch (type) {
    case 'click':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
      break;

    case 'success':
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.setValueAtTime(800, now + 0.08);
      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.setValueAtTime(0.12, now + 0.08);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
      break;

    case 'sweep-up':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(1500, now + 0.35);
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.06, now + 0.1);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
      break;

    case 'sweep-down':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.4);
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
      break;

    case 'weather-change':
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.linearRampToValueAtTime(150, now + 0.2);
      osc.frequency.linearRampToValueAtTime(110, now + 0.4);
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
      break;

    case 'error':
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
      break;

    case 'hover-tick':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.015);
      gainNode.gain.setValueAtTime(0.015, now);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 0.015);
      osc.start(now);
      osc.stop(now + 0.015);
      break;
  }
}

// Global Audio Toggle
function toggleAudioInit() {
  state.audioEnabled = !state.audioEnabled;
  const ind = document.getElementById('sound-indicator');
  const btn = document.getElementById('btn-audio-toggle');
  const icon = document.getElementById('audio-icon');
  const muteSlash = icon.querySelector('.mute-slash');
  const wave1 = icon.querySelector('.wave-1');
  const wave2 = icon.querySelector('.wave-2');

  if (state.audioEnabled) {
    initAudio();
    if (ind) ind.classList.add('fade-out');
    btn.classList.add('active');
    btn.setAttribute('title', 'Mute System Sound');
    muteSlash.style.display = 'none';
    wave1.setAttribute('stroke-dashoffset', '0');
    wave2.setAttribute('stroke-dashoffset', '0');
    playSound('success');
  } else {
    btn.classList.remove('active');
    btn.setAttribute('title', 'Unmute System Sound');
    muteSlash.style.display = 'block';
    wave1.setAttribute('stroke-dashoffset', '10');
    wave2.setAttribute('stroke-dashoffset', '20');
  }
}

// Trigger setup on document load
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  setupWeatherSystem();
  updateCartBadge();
  setupHUDLogTicker();
  setupSPARouting();
  bindHoverSounds();
});

// SPA Routing Setup
function setupSPARouting() {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      navigateToView(target);
    });
  });

  document.getElementById('header-logo').addEventListener('click', (e) => {
    e.preventDefault();
    navigateToView('hero');
  });
}

// Navigate to specific SPA view panel
function navigateToView(viewId) {
  if (state.currentView === viewId) return;
  playSound('click');

  const oldViewPanel = document.getElementById(`view-${state.currentView}`);
  const newViewPanel = document.getElementById(`view-${viewId}`);

  if (!newViewPanel) return;

  // Update active links state
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    if (link.getAttribute('data-target') === viewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  document.getElementById('mobile-nav-overlay').classList.remove('active');

  if (oldViewPanel) {
    oldViewPanel.style.opacity = 0;
    oldViewPanel.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
      oldViewPanel.classList.remove('active');
      newViewPanel.classList.add('active');
      
      setTimeout(() => {
        newViewPanel.style.opacity = 1;
        newViewPanel.style.transform = 'translateY(0)';
      }, 50);
    }, 450);
  } else {
    newViewPanel.classList.add('active');
    setTimeout(() => {
      newViewPanel.style.opacity = 1;
      newViewPanel.style.transform = 'translateY(0)';
    }, 50);
  }

  // Update state
  state.currentView = viewId;

  // Manage weather canvas performance depending on view
  if (viewId === 'product-details' && state.selectedProductId === 'jacket') {
    setWeatherMode(state.weatherMode, false);
  } else {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }
}
window.navigateToView = navigateToView;

// Navigate to Dynamic Product details view
function navigateToProductDetails(productId) {
  const data = productDb[productId];
  if (!data) return;

  state.selectedProductId = productId;
  state.selectedSize = data.defaultSize;
  state.selectedColor = data.defaultColor;
  state.isFavorite = false; // Reset favorite on swap

  // Reset toggles
  state.hudActive = false;
  state.blueprintMode = false;
  document.body.classList.remove('hud-active', 'blueprint-active');
  
  const hudCheck = document.getElementById('toggle-hud');
  const blueprintCheck = document.getElementById('toggle-blueprint');
  if (hudCheck) hudCheck.checked = false;
  if (blueprintCheck) blueprintCheck.checked = false;

  // 1. Text elements
  document.getElementById('details-sub-header').textContent = `ASTRO / ${productId.toUpperCase()} DETAIL`;
  document.getElementById('details-tag').textContent = data.tag;
  document.getElementById('product-title-display').innerHTML = data.title;
  document.getElementById('price-display').textContent = data.price;
  document.getElementById('desc-para-display').textContent = data.desc;

  // 2. Materials accordion list
  const materialsBox = document.getElementById('details-materials-box');
  materialsBox.innerHTML = '';
  const ul = document.createElement('ul');
  data.materials.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  materialsBox.appendChild(ul);

  // 3. Specials Settings box (Hide if item has no blueprints)
  const specialsBox = document.getElementById('details-specials-box');
  if (data.hasBlueprint) {
    specialsBox.style.display = 'block';
  } else {
    specialsBox.style.display = 'none';
  }

  // 4. Set Image Stack
  const imgStack = document.getElementById('details-image-stack');
  imgStack.innerHTML = '';
  
  const mainImg = document.createElement('img');
  mainImg.src = data.image;
  mainImg.alt = data.title.replace('<br>', ' ');
  mainImg.className = 'jacket-layer active';
  mainImg.id = 'jacket-photo';
  imgStack.appendChild(mainImg);

  if (data.hasBlueprint) {
    const bpImg = document.createElement('img');
    bpImg.src = data.blueprintImg;
    bpImg.alt = 'Blueprint';
    bpImg.className = 'jacket-layer';
    bpImg.id = 'jacket-blueprint';
    imgStack.appendChild(bpImg);
  }

  // 5. Generate Hotspot pins dynamically
  const wrapper = document.getElementById('hotspots-wrapper');
  // Keep image stack, delete old hotspots
  const oldHotspots = wrapper.querySelectorAll('.hotspot');
  oldHotspots.forEach(h => h.remove());

  data.hotspots.forEach((hSpot, index) => {
    const pin = document.createElement('div');
    pin.className = 'hotspot';
    pin.style.top = hSpot.top;
    pin.style.left = hSpot.left;
    pin.setAttribute('data-index', index);

    pin.innerHTML = `
      <div class="hotspot-dot"></div>
      <div class="hotspot-ripple"></div>
      <div class="hotspot-panel">
        <div class="panel-header">${hSpot.title}</div>
        <div class="panel-body">${hSpot.body}</div>
      </div>
    `;
    wrapper.appendChild(pin);
  });

  // 6. Sizes Selector Grid rebuild
  const sizesGrid = document.getElementById('details-sizes-grid');
  sizesGrid.innerHTML = '';
  data.sizes.forEach(sizeVal => {
    const sBtn = document.createElement('button');
    sBtn.className = `size-btn ${sizeVal === state.selectedSize ? 'active' : ''}`;
    sBtn.setAttribute('data-size', sizeVal);
    sBtn.textContent = sizeVal;
    
    sBtn.addEventListener('click', () => {
      sizesGrid.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      sBtn.classList.add('active');
      state.selectedSize = sizeVal;
      playSound('click');
      triggerHUDLog(`SIZE CALIBRATED TO: ${state.selectedSize}`);
    });
    sizesGrid.appendChild(sBtn);
  });

  // Hide size panel entirely if item is one size fits all
  const sizesGroup = document.getElementById('details-sizes-group');
  if (data.sizes.length === 1 && data.sizes[0] === 'ONE SIZE') {
    sizesGroup.style.display = 'none';
  } else {
    sizesGroup.style.display = 'block';
  }

  // 7. Colors Selector Grid rebuild
  const colorsGrid = document.getElementById('details-colors-grid');
  colorsGrid.innerHTML = '';
  data.colors.forEach(col => {
    const cBtn = document.createElement('button');
    cBtn.className = `color-btn ${col.id === state.selectedColor ? 'active' : ''}`;
    cBtn.setAttribute('data-color', col.id);
    cBtn.id = `color-${col.id}`;

    cBtn.innerHTML = `
      <div class="color-preview">
        <span class="color-dot ${col.cssClass}"></span>
      </div>
      <span class="color-name">${col.name}</span>
    `;

    cBtn.addEventListener('click', () => {
      colorsGrid.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      cBtn.classList.add('active');
      state.selectedColor = col.id;

      // Update image source on details page
      const jacketImg = document.getElementById('jacket-photo');
      if (jacketImg) {
        jacketImg.src = col.file;
        jacketImg.style.transform = 'scale(0.95)';
        setTimeout(() => {
          jacketImg.style.transform = 'scale(1)';
        }, 150);
      }

      playSound('click');
      triggerHUDLog(`MATERIAL INJECTION: ${state.selectedColor.toUpperCase()} MATRIX`);
    });
    colorsGrid.appendChild(cBtn);
  });

  // Hide colors panel if it only has default one option
  const colorsGroup = document.getElementById('details-colors-group');
  if (data.colors.length === 1 && data.colors[0].id === 'default') {
    colorsGroup.style.display = 'none';
  } else {
    colorsGroup.style.display = 'block';
  }

  // 8. Re-evaluate Favorite buttons styling
  const btnFavorite = document.getElementById('btn-favorite-action');
  if (btnFavorite) {
    btnFavorite.classList.remove('liked');
  }

  // 9. Hide jacket exclusive visual grids below if we are looking at boots/visor/backpack
  const weatherBar = document.getElementById('details-weather-bar');
  const statsRow = document.getElementById('details-stats-row');

  if (productId === 'jacket') {
    weatherBar.style.display = 'flex';
    statsRow.style.display = 'grid';
  } else {
    weatherBar.style.display = 'none';
    statsRow.style.display = 'none';
  }

  // Bind hover sound to new buttons
  bindHoverSounds();

  // Navigate to Details page view
  navigateToView('product-details');
}
window.navigateToProductDetails = navigateToProductDetails;

// Interactive Explorer Selector on Homepage
function selectExplorer(explorerId) {
  const data = explorerVitals[explorerId];
  if (!data) return;

  playSound('click');

  const cards = document.querySelectorAll('.explorer-node-card');
  cards.forEach(card => {
    if (card.getAttribute('data-explorer') === explorerId) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  const planetEl = document.getElementById('bio-planet');
  const tempEl = document.getElementById('bio-temp');
  const hrEl = document.getElementById('bio-hr');
  const o2El = document.getElementById('bio-o2');
  const vitalEl = document.getElementById('bio-vital');
  const statusEl = document.getElementById('bio-status');

  planetEl.textContent = data.planet;
  tempEl.textContent = data.temp;
  hrEl.textContent = data.hr;
  o2El.textContent = data.o2;
  vitalEl.textContent = data.vital;
  
  statusEl.textContent = data.status;
  statusEl.className = `val ${data.statusClass}`;

  const ecgPath = document.querySelector('.ecg-graph path');
  if (ecgPath) {
    ecgPath.style.stroke = explorerId === 'beta' ? '#ff3366' : 'var(--accent)';
    
    // Dynamically adjust sweep animation speed based on explorer heart rate
    let speed = '2s';
    if (explorerId === 'alpha') speed = '1.4s';
    if (explorerId === 'beta') speed = '0.9s';
    if (explorerId === 'gamma') speed = '1.8s';
    ecgPath.style.animationDuration = speed;
    
    ecgPath.style.opacity = 0.5;
    setTimeout(() => {
      ecgPath.style.opacity = 1;
    }, 150);
  }
}
window.selectExplorer = selectExplorer;

// Event Listeners Registration
function setupEventListeners() {
  // Mobile menu controls
  const btnMenu = document.getElementById('btn-menu');
  const mobileNav = document.getElementById('mobile-nav-overlay');
  const btnMobileClose = document.getElementById('btn-mobile-close');

  btnMenu.addEventListener('click', () => {
    mobileNav.classList.add('active');
    playSound('click');
  });
  btnMobileClose.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    playSound('click');
  });

  document.getElementById('btn-audio-toggle').addEventListener('click', toggleAudioInit);

  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');
      
      document.querySelectorAll('.accordion-item').forEach(acc => acc.classList.remove('open'));
      
      if (!isOpen) {
        item.classList.add('open');
        playSound('click');
      } else {
        playSound('click');
      }
    });
  });

  // HUD and Blueprint Toggle checks
  document.getElementById('toggle-hud').addEventListener('change', (e) => {
    state.hudActive = e.target.checked;
    if (state.hudActive) {
      document.body.classList.add('hud-active');
      playSound('sweep-up');
      triggerHUDLog('DIAGNOSTICS PROTOCOL INITIALIZED. BOOTING SYSTEMS...');
      simulateHUDTelemetry();
    } else {
      document.body.classList.remove('hud-active');
      playSound('sweep-down');
    }
  });

  document.getElementById('toggle-blueprint').addEventListener('change', (e) => {
    state.blueprintMode = e.target.checked;
    const photo = document.getElementById('jacket-photo');
    const blueprint = document.getElementById('jacket-blueprint');
    
    if (state.blueprintMode && photo && blueprint) {
      document.body.classList.add('blueprint-active');
      photo.classList.remove('active');
      blueprint.classList.add('active');
      playSound('sweep-up');
      triggerHUDLog('BLUEPRINT OVERLAY INJECTED. AEROGEL LAYERS HIGH-LIGHTED.');
    } else if (photo && blueprint) {
      document.body.classList.remove('blueprint-active');
      photo.classList.add('active');
      blueprint.classList.remove('active');
      playSound('sweep-down');
    }
  });

  // Favorite button
  const btnFavorite = document.getElementById('btn-favorite-action');
  if (btnFavorite) {
    btnFavorite.addEventListener('click', () => {
      state.isFavorite = !state.isFavorite;
      const badge = document.getElementById('favorites-badge');
      
      if (state.isFavorite) {
        btnFavorite.classList.add('liked');
        state.favoritesCount++;
        badge.textContent = state.favoritesCount;
        badge.style.display = 'flex';
        playSound('success');
        btnFavorite.style.transform = 'scale(1.1)';
        setTimeout(() => btnFavorite.style.transform = 'scale(1)', 200);
        triggerHUDLog('SIGNATURE PROFILE STORED IN FAVORITES CACHE.');
      } else {
        btnFavorite.classList.remove('liked');
        state.favoritesCount--;
        badge.textContent = state.favoritesCount;
        if (state.favoritesCount === 0) badge.style.display = 'none';
        playSound('click');
        triggerHUDLog('SIGNATURE PROFILE REMOVED FROM CACHE.');
      }
    });
  }

  // Dynamic Add to Bag Button inside Product Details view
  const btnAddBagDynamic = document.getElementById('btn-add-to-bag-dynamic');
  if (btnAddBagDynamic) {
    btnAddBagDynamic.addEventListener('click', () => {
      addDynamicProductToCart();
    });
  }

  // Cart Side Drawer overlays toggles
  const btnCart = document.getElementById('btn-cart');
  const cartDrawer = document.getElementById('cart-drawer');
  const btnCartClose = document.getElementById('btn-cart-close');

  btnCart.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    renderCart();
    playSound('click');
  });
  btnCartClose.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    playSound('click');
  });

  // Size Calculator modal controls
  const btnSizeGuide = document.getElementById('btn-size-guide');
  const sizeModal = document.getElementById('size-modal');
  const btnSizeClose = document.getElementById('btn-size-close');
  const btnRunCalc = document.getElementById('btn-run-calc');
  const btnApplySize = document.getElementById('btn-apply-size');

  if (btnSizeGuide) {
    btnSizeGuide.addEventListener('click', () => {
      sizeModal.classList.add('open');
      playSound('click');
    });
  }
  btnSizeClose.addEventListener('click', () => {
    sizeModal.classList.remove('open');
    playSound('click');
  });
  btnRunCalc.addEventListener('click', calculateSize);
  btnApplySize.addEventListener('click', () => {
    const recommended = document.getElementById('recommended-size-text').textContent;
    if (recommended && recommended !== '-') {
      // Find matching size button and click it
      const sizeBtn = document.querySelector(`.size-btn[data-size="${recommended}"]`);
      if (sizeBtn) {
        sizeBtn.click();
      }
      sizeModal.classList.remove('open');
      playSound('success');
    }
  });

  // Checkout modal controls
  const btnCheckout = document.getElementById('btn-checkout');
  const checkoutModal = document.getElementById('checkout-modal');
  const btnCheckoutClose = document.getElementById('btn-checkout-close');
  const btnToStep2 = document.getElementById('btn-checkout-to-step-2');
  const btnCompleteCheck = document.getElementById('btn-checkout-complete');
  const btnFinishCheck = document.getElementById('btn-checkout-finish');

  btnCheckout.addEventListener('click', () => {
    if (state.cart.length === 0) {
      playSound('error');
      alert('Your shopping bag is empty.');
      return;
    }
    cartDrawer.classList.remove('open');
    checkoutModal.classList.add('open');
    resetCheckoutSteps();
    playSound('click');
  });

  btnCheckoutClose.addEventListener('click', () => {
    checkoutModal.classList.remove('open');
    playSound('click');
  });

  btnToStep2.addEventListener('click', () => {
    const name = document.getElementById('ship-name').value.trim();
    const address = document.getElementById('ship-address').value.trim();
    if (!name || !address) {
      playSound('error');
      alert('Please fill out your name and sector destination address.');
      return;
    }
    
    document.getElementById('checkout-step-1').style.display = 'none';
    document.getElementById('checkout-step-2').style.display = 'block';
    document.getElementById('step-2-indicator').classList.add('active');
    playSound('success');
  });

  btnCompleteCheck.addEventListener('click', () => {
    const card = document.getElementById('pay-card').value.replace(/\s/g, '');
    const exp = document.getElementById('pay-expiry').value;
    const cvv = document.getElementById('pay-cvv').value;

    if (card.length < 16 || exp.length < 5 || cvv.length < 3) {
      playSound('error');
      alert('Please enter valid credit card details for secure transaction.');
      return;
    }

    const buyerName = document.getElementById('ship-name').value;
    const orderNum = '#AST-' + Math.floor(10000000 + Math.random() * 90000000);
    
    document.getElementById('receipt-name').textContent = buyerName;
    document.getElementById('receipt-order-no').textContent = orderNum;
    
    let total = 0;
    state.cart.forEach(item => {
      total += item.price * item.quantity;
    });
    document.getElementById('receipt-total-price').textContent = `$${total}`;

    document.getElementById('checkout-step-2').style.display = 'none';
    document.getElementById('checkout-step-3').style.display = 'block';
    document.getElementById('step-3-indicator').classList.add('active');
    
    state.cart = [];
    updateCartBadge();
    playSound('success');
    triggerHUDLog(`DEBIT AUTHORIZED. DISPATCHING SHIPMENT: ${orderNum}`);
  });

  btnFinishCheck.addEventListener('click', () => {
    checkoutModal.classList.remove('open');
    playSound('click');
  });

  const cardInput = document.getElementById('pay-card');
  cardInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = value.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || '';
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      e.target.value = parts.join(' ');
    } else {
      e.target.value = value;
    }
  });

  const expiryInput = document.getElementById('pay-expiry');
  expiryInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
    } else {
      e.target.value = value;
    }
  });

  const cvvInput = document.getElementById('pay-cvv');
  cvvInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
  });
}

// Reset steps in checkout modal
function resetCheckoutSteps() {
  document.getElementById('checkout-step-1').style.display = 'block';
  document.getElementById('checkout-step-2').style.display = 'none';
  document.getElementById('checkout-step-3').style.display = 'none';
  
  document.getElementById('step-2-indicator').classList.remove('active');
  document.getElementById('step-3-indicator').classList.remove('active');
}

// Sizing calculator recommendation logic
function calculateSize() {
  const height = parseInt(document.getElementById('calc-height').value);
  const weight = parseInt(document.getElementById('calc-weight').value);
  
  if (isNaN(height) || isNaN(weight) || height < 120 || height > 230 || weight < 30 || weight > 150) {
    playSound('error');
    alert('Please enter correct numeric values for Height and Weight.');
    return;
  }

  let size = 'S';
  let desc = '';

  if (height < 165) {
    if (weight < 60) {
      size = 'XS';
      desc = 'Fits short stature and lighter builds tightly, maximizing insulation efficiency.';
    } else {
      size = 'S';
      desc = 'Small size fits. Standard length but allows chest room for comfort.';
    }
  } else if (height <= 178) {
    if (weight <= 75) {
      size = 'S';
      desc = 'Recommended Fit. Optimal length matching shoulder profiles cleanly.';
    } else {
      size = 'M';
      desc = 'Medium size fit. Adds chest movement space to compensate for weight.';
    }
  } else {
    if (weight <= 90) {
      size = 'M';
      desc = 'Fits tall, standard athletic frames. Sleek fit profile.';
    } else {
      size = 'XL';
      desc = 'Extra Large size required. Provides structural chest depth and sleeve length.';
    }
  }

  document.getElementById('recommended-size-text').textContent = size;
  document.getElementById('recommended-size-desc').textContent = desc;
  document.getElementById('calc-result-box').style.display = 'block';
  playSound('success');
}

// Cart Addition from Detail view
function addDynamicProductToCart() {
  const productId = state.selectedProductId;
  const productData = productDb[productId];
  if (!productData) return;

  const name = productData.title.replace('<br>', ' ');
  const price = productData.priceRaw;
  
  // Resolve image based on color selection
  let image = productData.image;
  if (productId === 'jacket') {
    const colorMap = { '88ies': 'white', 'reb': 'red', 'slack': 'black', 'seary': 'grey' };
    const fileNameSuffix = colorMap[state.selectedColor] || 'white';
    image = `assets/jacket_${fileNameSuffix}.png`;
  }

  // Resolve metadata specs
  let metaText = `SIZE: ${state.selectedSize}`;
  if (productData.colors.length > 1 || state.selectedColor !== 'default') {
    const colObj = productData.colors.find(c => c.id === state.selectedColor);
    const colName = colObj ? colObj.name : state.selectedColor.toUpperCase();
    metaText = `COLOR: ${colName} | SIZE: ${state.selectedSize}`;
  }

  if (productData.sizes.length === 1 && productData.sizes[0] === 'ONE SIZE') {
    metaText = `SPEC: STANDARD`;
  }

  const existingItem = state.cart.find(item => item.name === name && item.meta === metaText);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    state.cart.push({
      name,
      price,
      image,
      quantity: 1,
      meta: metaText,
      color: state.selectedColor.toUpperCase(),
      size: state.selectedSize
    });
  }

  updateCartBadge();
  playSound('success');

  const cartBtn = document.getElementById('btn-cart');
  cartBtn.style.transform = 'scale(1.2)';
  setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);

  document.getElementById('cart-drawer').classList.add('open');
  renderCart();
  
  triggerHUDLog(`CART INJECTED: 1x ${name}`);
}

// Add catalog item straight from catalog grid (Uses defaults)
function addCatalogItemToCart(itemId) {
  const itemDef = productDb[itemId];
  if (!itemDef) return;

  const name = itemDef.title.replace('<br>', ' ');
  const price = itemDef.priceRaw;
  const image = itemDef.image;
  
  // Resolve standard defaults
  let metaText = `SIZE: ${itemDef.defaultSize}`;
  if (itemDef.colors.length > 1 || itemDef.defaultColor !== 'default') {
    const colObj = itemDef.colors.find(c => c.id === itemDef.defaultColor);
    const colName = colObj ? colObj.name : itemDef.defaultColor.toUpperCase();
    metaText = `COLOR: ${colName} | SIZE: ${itemDef.defaultSize}`;
  }
  if (itemDef.sizes.length === 1 && itemDef.sizes[0] === 'ONE SIZE') {
    metaText = `SPEC: STANDARD`;
  }

  const existingItem = state.cart.find(item => item.name === name && item.meta === metaText);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    state.cart.push({
      name,
      price,
      image,
      quantity: 1,
      meta: metaText,
      color: itemDef.defaultColor.toUpperCase(),
      size: itemDef.defaultSize
    });
  }

  updateCartBadge();
  playSound('success');

  const cartBtn = document.getElementById('btn-cart');
  cartBtn.style.transform = 'scale(1.2)';
  setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);

  document.getElementById('cart-drawer').classList.add('open');
  renderCart();
  
  triggerHUDLog(`CART INJECTED: 1x ${name}`);
}
window.addCatalogItemToCart = addCatalogItemToCart;

function updateCartBadge() {
  let count = 0;
  state.cart.forEach(item => {
    count += item.quantity;
  });
  
  const badge = document.getElementById('cart-badge');
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  container.innerHTML = '';
  
  if (state.cart.length === 0) {
    container.innerHTML = '<div class="empty-cart-message">Your shopping bag is currently empty.</div>';
    document.getElementById('cart-subtotal').textContent = '$0';
    document.getElementById('cart-total').textContent = '$0';
    return;
  }

  let subtotal = 0;
  
  state.cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;
    const detailString = item.meta ? item.meta : `COLOR: ${item.color} | SIZE: ${item.size}`;
    
    const itemNode = document.createElement('div');
    itemNode.className = 'cart-item';
    itemNode.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-info">
        <div>
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-details">${detailString}</div>
        </div>
        <div class="cart-item-controls">
          <div class="qty-selectors">
            <button class="qty-btn dec-qty" data-index="${index}">&minus;</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn inc-qty" data-index="${index}">&plus;</button>
          </div>
          <button class="btn-remove-item" data-index="${index}">REMOVE</button>
        </div>
      </div>
      <div class="cart-item-price">$${item.price * item.quantity}</div>
    `;
    container.appendChild(itemNode);
  });

  document.getElementById('cart-subtotal').textContent = `$${subtotal}`;
  document.getElementById('cart-total').textContent = `$${subtotal}`;
  
  container.querySelectorAll('.dec-qty').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'));
      if (state.cart[idx].quantity > 1) {
        state.cart[idx].quantity--;
        playSound('click');
      } else {
        state.cart.splice(idx, 1);
        playSound('sweep-down');
      }
      updateCartBadge();
      renderCart();
    });
  });

  container.querySelectorAll('.inc-qty').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'));
      state.cart[idx].quantity++;
      playSound('click');
      updateCartBadge();
      renderCart();
    });
  });

  container.querySelectorAll('.btn-remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'));
      state.cart.splice(idx, 1);
      playSound('sweep-down');
      updateCartBadge();
      renderCart();
    });
  });

  // Bind hover sound to cart control buttons
  bindHoverSounds();
}

// ==========================================================================
// Canvas Weather Simulation Particle System
// ==========================================================================
let canvas, ctx;
let particles = [];
let animFrameId = null;

function setupWeatherSystem() {
  canvas = document.getElementById('weather-canvas');
  ctx = canvas.getContext('2d');
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const wBtns = document.querySelectorAll('.weather-btn');
  wBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      wBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const weather = btn.getAttribute('data-weather');
      setWeatherMode(weather, true);
    });
  });
}

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function setWeatherMode(mode, playSoundEffect = false) {
  state.weatherMode = mode;
  if (playSoundEffect) {
    playSound('weather-change');
  }
  
  document.body.classList.remove('weather-default', 'weather-blizzard', 'weather-storm', 'weather-void');
  document.body.classList.add(`weather-${mode}`);

  const telemTemp = document.getElementById('telem-temp');
  const telemWind = document.getElementById('telem-wind');
  const telemShield = document.getElementById('telem-shield');

  if (animFrameId) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }
  
  particles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Guard canvas animations if not on details jacket page
  if (state.currentView !== 'product-details' || state.selectedProductId !== 'jacket') {
    return;
  }

  switch (mode) {
    case 'default':
      if (telemTemp) telemTemp.textContent = '24°C';
      if (telemWind) telemWind.textContent = '3 km/h';
      if (telemShield) {
        telemShield.textContent = 'STABLE';
        telemShield.className = 't-val text-green';
      }
      triggerHUDLog('ATMOSPHERE TESTBED: ECO STANDBY MODE INITIALIZED.');
      break;
      
    case 'blizzard':
      if (telemTemp) telemTemp.textContent = '-42°C';
      if (telemWind) telemWind.textContent = '94 km/h';
      if (telemShield) {
        telemShield.textContent = 'ACTIVE (98%)';
        telemShield.className = 't-val text-green';
      }
      initBlizzardParticles();
      animateBlizzard();
      triggerHUDLog('WARNING: SEVERE BLIZZARD SYSTEM ACTIVE. TEMPERATURE CRITICAL.');
      break;

    case 'storm':
      if (telemTemp) telemTemp.textContent = '4°C';
      if (telemWind) telemWind.textContent = '48 km/h';
      if (telemShield) {
        telemShield.textContent = 'ADAPTIVE SHIELD';
        telemShield.className = 't-val';
      }
      initStormParticles();
      animateStorm();
      triggerHUDLog('ENVIRONMENT DANGER: ACID PRECIPITATION DETECTED. MEMBRANE ADAPTING.');
      break;

    case 'void':
      if (telemTemp) telemTemp.textContent = '-182°C';
      if (telemWind) telemWind.textContent = '0 km/h';
      if (telemShield) {
        telemShield.textContent = 'RADIATION HAZARD';
        telemShield.className = 't-val';
      }
      initVoidParticles();
      animateVoid();
      triggerHUDLog('VOID DETECTED: EXTREME PRESSURE PRESSURE BARRIER IN SERVICE.');
      break;
  }
}

// Particle Loops
function initBlizzardParticles() {
  const count = 120;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      d: Math.random() * count,
      vy: Math.random() * 4 + 2,
      vx: Math.random() * 5 - 8
    });
  }
}

function animateBlizzard() {
  if (state.currentView !== 'product-details' || state.selectedProductId !== 'jacket') return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  
  particles.forEach(p => {
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    
    p.y += p.vy;
    p.x += p.vx;
    
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
    if (p.x < -10) {
      p.x = canvas.width + 10;
      p.y = Math.random() * canvas.height;
    }
  });
  
  ctx.fill();
  animFrameId = requestAnimationFrame(animateBlizzard);
}

function initStormParticles() {
  const count = 150;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      l: Math.random() * 15 + 10,
      v: Math.random() * 8 + 12
    });
  }
}

let lightningFlash = 0;
function animateStorm() {
  if (state.currentView !== 'product-details' || state.selectedProductId !== 'jacket') return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (Math.random() < 0.005) {
    lightningFlash = 10;
    playSound('weather-change');
  }
  
  if (lightningFlash > 0) {
    ctx.fillStyle = `rgba(255, 255, 255, ${lightningFlash / 20})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    lightningFlash--;
  }

  ctx.strokeStyle = 'rgba(174, 219, 240, 0.35)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  
  particles.forEach(p => {
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x - 2, p.y + p.l);
    
    p.y += p.v;
    p.x -= 1;
    
    if (p.y > canvas.height) {
      p.y = -p.l;
      p.x = Math.random() * canvas.width;
    }
  });
  
  ctx.stroke();
  animFrameId = requestAnimationFrame(animateStorm);
}

function initVoidParticles() {
  const count = 40;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random(),
      fade: Math.random() * 0.01 + 0.005,
      vx: Math.random() * 0.4 - 0.2,
      vy: Math.random() * 0.4 - 0.2
    });
  }
}

function animateVoid() {
  if (state.currentView !== 'product-details' || state.selectedProductId !== 'jacket') return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    ctx.fillStyle = `rgba(255, 106, 0, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    ctx.fill();
    
    p.x += p.vx;
    p.y += p.vy;
    
    p.alpha += p.fade;
    if (p.alpha > 0.8 || p.alpha < 0.1) {
      p.fade = -p.fade;
    }
    
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });
  
  animFrameId = requestAnimationFrame(animateVoid);
}

// HUD Ticker Logs
let logTicker = null;
const logPhrases = [
  "SYSTEM STATUS: SECURED",
  "HEATING LEVEL 1-3 STABLE",
  "NANO-FIBER MOISTURE EXPELLERS ACTIVE",
  "Telemetry calibration complete.",
  "Atmospheric readings inside margins.",
  "Graphene shell structural integrity at 100%.",
  "HUD links online / Synced.",
  "Air-exchange valves: CLOSED.",
  "Solar absorptive cells charging battery bank."
];

function setupHUDLogTicker() {
  const logBox = document.getElementById('hud-log-box');
  if (!logBox) return;

  logTicker = setInterval(() => {
    if (state.hudActive && state.currentView === 'product-details' && state.selectedProductId === 'jacket') {
      const phrase = logPhrases[Math.floor(Math.random() * logPhrases.length)];
      triggerHUDLog(phrase);
    }
  }, 4000);
}

function triggerHUDLog(text) {
  const logBox = document.getElementById('hud-log-box');
  if (logBox) {
    logBox.textContent = `SYSTEM LOG [${new Date().toLocaleTimeString()}]: ${text}`;
    logBox.style.color = '#fff';
    setTimeout(() => {
      logBox.style.color = 'var(--accent)';
    }, 300);
  }
}

// Telemetry values loops
let telLoop = null;
function simulateHUDTelemetry() {
  if (telLoop) clearInterval(telLoop);
  
  const heatVal = document.getElementById('hud-internal-heat');
  const batVal = document.getElementById('hud-battery');
  const prsVal = document.getElementById('hud-pressure');
  const waterVal = document.getElementById('hud-water-barrier');

  telLoop = setInterval(() => {
    if (!state.hudActive || state.currentView !== 'product-details' || state.selectedProductId !== 'jacket') {
      clearInterval(telLoop);
      return;
    }

    let heat = (36.8 + Math.random() * 0.4).toFixed(1);
    let battery = Math.max(10, Math.min(100, parseInt(batVal.textContent) - (Math.random() > 0.95 ? 1 : 0)));
    let pressure = (0.98 + Math.random() * 0.06).toFixed(2);
    let water = (99.7 + Math.random() * 0.2).toFixed(1);

    if (state.weatherMode === 'blizzard') {
      heat = (35.2 + Math.random() * 0.8).toFixed(1);
      battery = Math.max(10, parseInt(batVal.textContent) - (Math.random() > 0.8 ? 1 : 0));
      pressure = (0.84 + Math.random() * 0.05).toFixed(2);
    } else if (state.weatherMode === 'void') {
      heat = (37.5 + Math.random() * 0.3).toFixed(1);
      pressure = (0.01 + Math.random() * 0.01).toFixed(2);
      water = '0.0';
    }

    if (heatVal) heatVal.textContent = `${heat}°C`;
    if (batVal) batVal.textContent = `${battery}%`;
    if (prsVal) prsVal.textContent = `${pressure} ATM`;
    if (waterVal) waterVal.textContent = `${water}%`;
  }, 2000);
}

// Contact Transceiver
function handleContactSubmit(event) {
  event.preventDefault();
  playSound('click');

  const sender = document.getElementById('c-sender').value;
  const vector = document.getElementById('c-vector').value;
  const payload = document.getElementById('c-payload').value;

  const logsBoard = document.getElementById('contact-logs-board');
  if (!logsBoard) return;

  logsBoard.innerHTML = '<div class="log-line text-green">[SYSTEM]: Initializing secure subspace transmit...</div>';

  const steps = [
    { delay: 800, text: `[SYSTEM]: Sender verified as "${sender.toUpperCase()}". Channel open.` },
    { delay: 1500, text: `[SYSTEM]: Encrypting payload with 512-bit quantum injection...` },
    { delay: 2400, text: `[SYSTEM]: Scanning subspace holes to target Labs Sector 4...` },
    { delay: 3500, text: `[SYSTEM]: Data delivery COMPLETE. Confirmation token: #SEC-${Math.floor(1000000 + Math.random()*9000000)}` },
    { delay: 4200, text: `[SUCCESS]: Transmission secured. Response queued.` }
  ];

  steps.forEach(step => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'log-line';
      if (step.text.startsWith('[SUCCESS]') || step.text.includes('COMPLETE')) {
        line.classList.add('text-green');
      }
      line.textContent = step.text;
      logsBoard.appendChild(line);
      
      logsBoard.scrollTop = logsBoard.scrollHeight;

      if (step.text.startsWith('[SUCCESS]')) {
        playSound('success');
        document.getElementById('c-sender').value = '';
        document.getElementById('c-vector').value = '';
        document.getElementById('c-payload').value = '';
      } else {
        playSound('click');
      }
    }, step.delay);
  });
}
window.handleContactSubmit = handleContactSubmit;

// Bind hover sound effect to interactive elements
function bindHoverSounds() {
  const elements = document.querySelectorAll(
    '.nav-link, .mobile-nav-link, .explorer-node-card, .brand-cta-btn, .catalog-view-btn, .catalog-add-btn, .category-explore-btn, .download-card-link, .back-nav-btn, .size-btn, .color-btn, .favorite-btn, .add-to-bag-btn, .weather-btn, .checkout-btn, .close-drawer-btn, .close-modal-btn, .close-btn, .icon-btn, .qty-btn, .btn-remove-item'
  );
  elements.forEach(el => {
    if (el.dataset.hoverSoundBound) return;
    el.dataset.hoverSoundBound = "true";
    el.addEventListener('mouseenter', () => {
      playSound('hover-tick');
    });
  });
}
window.bindHoverSounds = bindHoverSounds;
