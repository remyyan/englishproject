const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;
const WORLD_WIDTH = 9200;
const GROUND_Y = 500;

const SECTION_DATA = [
  { key: 'brother', title: 'ZONE 1 — THE PARK', subtitle: 'Brother', start: 0, end: 1700, color: 0x1a1f24, accent: '#f2c26b', accentHex: 0xf2c26b, pressureRate: 0.88, whisperDelay: 5000 },
  { key: 'reflection1', title: 'REFLECTION I', subtitle: 'Perception & Identity', start: 1700, end: 2500, color: 0x0a0a10, accent: '#ffd35a', accentHex: 0xffd35a, pressureRate: -0.34, whisperDelay: 7000 },
  { key: 'frankenstein', title: 'ZONE 2 — THE LABORATORY', subtitle: 'Frankenstein', start: 2500, end: 4400, color: 0x071525, accent: '#9ff4ff', accentHex: 0x9ff4ff, pressureRate: 1.08, whisperDelay: 4200 },
  { key: 'reflection2', title: 'REFLECTION II', subtitle: 'Rejection & Monstrosity', start: 4400, end: 5200, color: 0x050910, accent: '#9ff4ff', accentHex: 0x9ff4ff, pressureRate: -0.28, whisperDelay: 6600 },
  { key: 'hamlet', title: 'ZONE 3 — THE GRAVEYARD', subtitle: 'Hamlet', start: 5200, end: 7000, color: 0x0e0a14, accent: '#d4b0ff', accentHex: 0xd4b0ff, pressureRate: 1.24, whisperDelay: 3100 },
  { key: 'synthesis', title: 'FINAL SYNTHESIS', subtitle: 'Collapse of the Mask', start: 7000, end: WORLD_WIDTH, color: 0x090505, accent: '#ffffff', accentHex: 0xffffff, pressureRate: 1.42, whisperDelay: 2400 }
];

class StartScene extends Phaser.Scene {
  constructor() { super('StartScene'); }
  create() {
    this.cameras.main.setBackgroundColor('#050509');
    const cx = GAME_WIDTH / 2;

    for (let i = 0; i < 60; i++) {
      const star = this.add.circle(
        Phaser.Math.Between(0, GAME_WIDTH),
        Phaser.Math.Between(0, GAME_HEIGHT),
        Phaser.Math.FloatBetween(0.5, 1.8),
        0xffffff, Phaser.Math.FloatBetween(0.1, 0.5)
      );
      this.tweens.add({ targets: star, alpha: 0.05, duration: Phaser.Math.Between(1200, 3500), yoyo: true, repeat: -1, delay: Phaser.Math.Between(0, 2000) });
    }

    this.add.text(cx, 88, 'The Weight of the Mask', {
      fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '52px', color: '#ffffff', fontStyle: 'italic'
    }).setOrigin(0.5);

    this.add.rectangle(cx, 123, 340, 1, 0xffd35a, 0.5);

    this.add.text(cx, 140, 'An Interactive ENG4U Literary Synthesis', {
      fontFamily: 'Georgia, serif', fontSize: '18px', color: '#b8b8d8'
    }).setOrigin(0.5);

    const zones = [
      { label: 'Brother', color: '#f2c26b' },
      { label: 'Frankenstein', color: '#9ff4ff' },
      { label: 'Hamlet', color: '#d4b0ff' }
    ];
    zones.forEach((z, i) => {
      const px = cx - 220 + i * 220;
      const pill = this.add.graphics();
      const col = Phaser.Display.Color.HexStringToColor(z.color);
      pill.fillStyle(col.color, 0.1);
      pill.fillRoundedRect(px - 72, 178, 144, 36, 8);
      pill.lineStyle(1, col.color, 0.4);
      pill.strokeRoundedRect(px - 72, 178, 144, 36, 8);
      this.add.text(px, 196, z.label, { fontFamily: 'Georgia, serif', fontSize: '16px', color: z.color }).setOrigin(0.5);
    });

    const panelG = this.add.graphics();
    panelG.fillStyle(0xffffff, 0.03);
    panelG.fillRoundedRect(cx - 370, 232, 740, 130, 10);
    panelG.lineStyle(1, 0xffffff, 0.08);
    panelG.strokeRoundedRect(cx - 370, 232, 740, 130, 10);

    const instrLines = [
      ['Arrow Keys', 'Move      ', 'Space', 'Jump      ', 'E', 'Interact'],
      ['Memory Fragments', '→ ease pressure      ', 'Books', '→ checkpoint      ', 'Red Cone / ⚡', '→ danger']
    ];
    instrLines.forEach((parts, row) => {
      let xPos = cx - 330;
      const y = 260 + row * 44;
      parts.forEach((part, idx) => {
        const isKey = idx % 2 === 0;
        const t = this.add.text(xPos, y, part, {
          fontFamily: 'Arial', fontSize: '15px',
          color: isKey ? '#ffd35a' : '#9090b0',
          fontStyle: isKey ? 'bold' : 'normal'
        });
        xPos += t.width + 6;
      });
    });

    this.add.text(cx, 386, 'Collect 7 memory fragments through all zones.', {
      fontFamily: 'Georgia, serif', fontSize: '17px', color: '#c8c8c8', align: 'center'
    }).setOrigin(0.5);
    this.add.text(cx, 412, 'Reach the final portal to complete your synthesis.', {
      fontFamily: 'Georgia, serif', fontSize: '15px', color: '#808098', align: 'center'
    }).setOrigin(0.5);

    const beginBg = this.add.graphics();
    beginBg.fillStyle(0xffd35a, 0.12);
    beginBg.fillRoundedRect(cx - 140, 448, 280, 50, 25);
    beginBg.lineStyle(1, 0xffd35a, 0.5);
    beginBg.strokeRoundedRect(cx - 140, 448, 280, 50, 25);
    const beginText = this.add.text(cx, 473, 'PRESS SPACE TO BEGIN', {
      fontFamily: 'Arial', fontSize: '18px', color: '#ffd35a', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({ targets: [beginText, beginBg], alpha: 0.3, duration: 700, yoyo: true, repeat: -1 });
    this.input.keyboard.once('keydown-SPACE', () => {
      this.cameras.main.fadeOut(400, 5, 5, 9);
      this.time.delayedCall(420, () => this.scene.start('GameScene'));
    });
  }
}

class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  create() {
    this.pressure = 0;
    this.currentJumpVelocity = -520;
    this.shakeCooldown = 0;
    this.lastWhisperTime = 0;
    this.heavyUntil = 0;
    this.lastSpotlightHit = 0;
    this.memoriesCollected = 0;
    this.requiredMemories = 7;
    this.currentSectionKey = '';
    this.pauseUntil = 0;
    this.lastCheckpoint = { x: 80, y: 430 };
    this.lastFallTime = 0;
    this.spotlightWarningUntil = 0;
    this.taskNearby = null;
    this.taskActive = false;
    this.taskComplete = {};
    this.currentTask = null;

    this.physics.world.setBounds(0, 0, WORLD_WIDTH, GAME_HEIGHT);
    this.physics.world.gravity.y = 620;

    this.createWorldArt();
    this.createPlatforms();
    this.createPlayer();
    this.createMemoryFragments();
    this.createTaskStations();
    this.createCheckpointBooks();
    this.createSpotlights();
    this.createElectricHazards();
    this.createPortal();
    this.createUi();

    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, GAME_HEIGHT);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.fadeIn(900, 5, 5, 9);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  }

  createWorldArt() {
    SECTION_DATA.forEach((section) => {
      const width = section.end - section.start;
      const center = section.start + width / 2;

      this.add.rectangle(center, GAME_HEIGHT / 2, width, GAME_HEIGHT, section.color);
      this.add.rectangle(center, GROUND_Y + 10, width, 80, section.accentHex, 0.03);

      if (section.start > 0) {
        this.add.rectangle(section.start, GAME_HEIGHT / 2, 2, GAME_HEIGHT, section.accentHex, 0.18);
      }

      const headerG = this.add.graphics();
      headerG.fillStyle(section.accentHex, 0.07);
      headerG.fillRoundedRect(section.start + 24, 88, 320, 56, 6);
      headerG.lineStyle(1, section.accentHex, 0.22);
      headerG.strokeRoundedRect(section.start + 24, 88, 320, 56, 6);

      this.add.text(section.start + 36, 100, section.title, {
        fontFamily: 'Arial', fontSize: '13px', color: section.accent, fontStyle: 'bold'
      });
      this.add.text(section.start + 36, 118, section.subtitle, {
        fontFamily: 'Georgia, serif', fontSize: '17px', color: section.accent
      });
    });

    const words = ['BELONG', 'MONSTER', 'WATCHED', 'PERFORM', 'REJECTED', 'HIDE'];
    words.forEach((word, idx) => {
      this.add.text(180 + idx * 750, Phaser.Math.Between(140, 400), word, {
        fontFamily: 'Georgia, serif', fontSize: '72px', color: '#ffffff', fontStyle: 'italic'
      }).setAlpha(0.025).setRotation(Phaser.Math.FloatBetween(-0.15, 0.15));
    });

    for (let i = 0; i < 24; i++) {
      const sec = SECTION_DATA[Phaser.Math.Between(0, SECTION_DATA.length - 1)];
      const ox = Phaser.Math.Between(sec.start + 100, sec.end - 100);
      const oy = Phaser.Math.Between(100, 440);
      const orb = this.add.circle(ox, oy, Phaser.Math.Between(20, 55), sec.accentHex, 0.035);
      this.tweens.add({ targets: orb, alpha: 0.01, duration: Phaser.Math.Between(2500, 5000), yoyo: true, repeat: -1, delay: Phaser.Math.Between(0, 3000) });
    }

    for (let i = 0; i < 30; i++) {
      const px = Phaser.Math.Between(0, WORLD_WIDTH);
      const py = Phaser.Math.Between(80, 470);
      const dust = this.add.circle(px, py, Phaser.Math.FloatBetween(0.8, 2), 0xffffff, Phaser.Math.FloatBetween(0.05, 0.2));
      this.tweens.add({ targets: dust, y: py - Phaser.Math.Between(30, 80), alpha: 0, duration: Phaser.Math.Between(3000, 7000), repeat: -1, delay: Phaser.Math.Between(0, 5000), onRepeat: () => { dust.y = py; dust.alpha = Phaser.Math.FloatBetween(0.05, 0.2); } });
    }
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.collapsingPlatforms = [];

    this.addPlatform(WORLD_WIDTH / 2, GROUND_Y + 20, WORLD_WIDTH, 40, 0x1a1a1a, false);

    this.addPlatform(320, 420, 240, 24, 0x3d4a54);
    this.addPlatform(620, 360, 180, 24, 0x3d4a54);
    this.addPlatform(920, 430, 260, 24, 0x3d4a54);
    this.addPlatform(1260, 370, 210, 24, 0x3d4a54);
    this.addPlatform(1520, 420, 190, 24, 0x3d4a54);

    this.addPlatform(1885, 438, 280, 20, 0x252528);
    this.addPlatform(2210, 408, 240, 20, 0x252528);

    this.addPlatform(2690, 430, 230, 26, 0x0e2a3e);
    this.addPlatform(2960, 365, 180, 26, 0x0e2a3e);
    this.addPlatform(3240, 410, 200, 26, 0x0e2a3e);
    this.addPlatform(3580, 340, 190, 26, 0x0e2a3e);
    this.addPlatform(3890, 405, 240, 26, 0x0e2a3e);
    this.addPlatform(4200, 350, 180, 26, 0x0e2a3e);

    this.addPlatform(4590, 430, 260, 20, 0x181e24);
    this.addPlatform(4940, 398, 230, 20, 0x181e24);

    this.addPlatform(5360, 420, 230, 26, 0x1e1628);
    this.addCollapsingPlatform(5660, 352, 200, 0x6b2e74);
    this.addPlatform(5940, 405, 250, 26, 0x1e1628);
    this.addCollapsingPlatform(6260, 332, 190, 0x6b2e74);
    this.addPlatform(6560, 395, 220, 26, 0x1e1628);
    this.addCollapsingPlatform(6860, 328, 180, 0x6b2e74);

    this.addPlatform(7180, 415, 250, 26, 0x2a2030);
    this.addCollapsingPlatform(7470, 352, 190, 0x8a4080);
    this.addPlatform(7760, 405, 220, 26, 0x2a2030);
    this.addPlatform(8070, 336, 200, 26, 0x2a2030);
    this.addCollapsingPlatform(8360, 402, 210, 0x8a4080);
    this.addPlatform(8660, 333, 200, 26, 0x2a2030);
    this.addPlatform(8960, 410, 250, 26, 0x2a2030);
  }

  addPlatform(x, y, width, height = 28, color = 0x2a2a2a, isElevated = true) {
    const g = this.add.graphics();
    g.fillStyle(color, 1);
    g.fillRect(x - width / 2, y - height / 2, width, height);
    if (isElevated) {
      g.lineStyle(1, 0xffffff, 0.12);
      g.strokeRect(x - width / 2, y - height / 2, width, height);
      g.lineStyle(2, 0xffffff, 0.08);
      g.beginPath();
      g.moveTo(x - width / 2, y - height / 2);
      g.lineTo(x + width / 2, y - height / 2);
      g.strokePath();
    }
    const platform = this.add.rectangle(x, y, width, height, color, 0);
    this.physics.add.existing(platform, true);
    this.platforms.add(platform);
    return platform;
  }

  addCollapsingPlatform(x, y, width, color = 0x5c3c61) {
    const g = this.add.graphics();
    g.fillStyle(color, 0.85);
    g.fillRect(x - width / 2, y - 14, width, 28);
    g.lineStyle(1, 0xffffff, 0.3);
    g.strokeRect(x - width / 2, y - 14, width, 28);

    const platform = this.add.rectangle(x, y, width, 28, color, 0);
    platform.isCollapsing = true;
    platform.collapseState = 'stable';
    platform._gfx = g;
    this.physics.add.existing(platform, true);
    this.platforms.add(platform);
    this.collapsingPlatforms.push(platform);
    return platform;
  }

  createPlayer() {
    this.playerGfx = this.add.graphics();
    this.drawPlayer(this.playerGfx, 0, 0, 1.0);

    this.player = this.add.rectangle(80, 430, 30, 48, 0xffffff, 0);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);
    this.player.body.setSize(30, 48);
    this.physics.add.collider(this.player, this.platforms, (player, platform) => {
      this.handlePlatformContact(player, platform);
    });
  }

  drawPlayer(g, offX, offY, alpha) {
    g.clear();
    g.fillStyle(0xf0f0ff, alpha);
    g.fillRoundedRect(offX - 14, offY - 22, 28, 44, 6);
    g.fillStyle(0xd0d0ee, alpha * 0.5);
    g.fillRoundedRect(offX - 10, offY - 18, 10, 36, 4);
    g.fillStyle(0xffeedd, alpha);
    g.fillCircle(offX, offY - 26, 10);
    g.fillStyle(0x111122, alpha);
    g.fillCircle(offX - 3, offY - 27, 1.5);
    g.fillCircle(offX + 3, offY - 27, 1.5);
  }

  handlePlatformContact(_player, platform) {
    if (!platform.isCollapsing || platform.collapseState !== 'stable' || !this.player.body.blocked.down) return;
    platform.collapseState = 'warning';
    if (platform._gfx) {
      this.tweens.add({ targets: platform._gfx, alpha: 0.2, duration: 100, yoyo: true, repeat: 4 });
    }
    this.time.delayedCall(650, () => {
      platform.collapseState = 'fallen';
      platform.body.enable = false;
      if (platform._gfx) platform._gfx.setVisible(false);
      this.time.delayedCall(2800, () => {
        if (platform._gfx) { platform._gfx.setVisible(true); platform._gfx.setAlpha(1); }
        platform.body.enable = true;
        platform.collapseState = 'stable';
      });
    });
  }

  createMemoryFragments() {
    this.memoryFragments = this.physics.add.staticGroup();
    const fragments = [
      { x: 760, y: 300, symbol: '♫', color: 0xffd35a, quote: '"Music became a way to survive the silence."' },
      { x: 1350, y: 320, symbol: '◆', color: 0xffd35a, quote: '"Belonging felt temporary — always conditional."' },
      { x: 2050, y: 360, symbol: '♪', color: 0xffd35a, quote: '"Expectation begins with perception of another."' },
      { x: 3060, y: 320, symbol: '⚡', color: 0x9ff4ff, quote: '"Appearance becomes destiny in the eyes of others."' },
      { x: 3820, y: 360, symbol: '✦', color: 0x9ff4ff, quote: '"The Creature learns humanity before hatred."' },
      { x: 4810, y: 348, symbol: '✧', color: 0x9ff4ff, quote: '"Society creates the monsters it chooses to fear."' },
      { x: 5920, y: 356, symbol: '☾', color: 0xd4b0ff, quote: '"Thought becomes paralysis when action is demanded."' },
      { x: 6680, y: 280, symbol: '☠', color: 0xd4b0ff, quote: '"Performance replaces identity entirely."' },
      { x: 8140, y: 288, symbol: '◎', color: 0xffffff, quote: '"Identity bends beneath the weight of expectation."' },
      { x: 8720, y: 360, symbol: '◈', color: 0xffffff, quote: '"The self survives only when it resists the mask."' }
    ];
    fragments.forEach((f) => this.addMemoryFragment(f));
    this.physics.add.overlap(this.player, this.memoryFragments, (_p, fragment) => {
      if (!fragment.active) return;
      fragment.body.enable = false;
      fragment.setActive(false);
      fragment.setVisible(false);
      this.memoriesCollected += 1;
      this.easePressure(-16);
      this.pauseUntil = this.time.now + 1000;
      this.player.body.setVelocity(0, 0);
      this.showQuote(fragment.quote, 3800);
      this.flashFragmentEffect(fragment.x, fragment.y, fragment.memoryColor);
    });
  }

  addMemoryFragment({ x, y, symbol, color, quote }) {
    const item = this.add.container(x, y);
    const g = this.add.graphics();
    g.fillStyle(color, 0.08);
    g.fillCircle(0, 0, 28);
    g.lineStyle(1, color, 0.3);
    g.strokeCircle(0, 0, 26);
    g.fillStyle(color, 0.85);
    g.fillRoundedRect(-16, -16, 32, 32, 5);
    g.lineStyle(1.5, 0xffffff, 0.25);
    g.strokeRoundedRect(-16, -16, 32, 32, 5);

    const text = this.add.text(0, 0, symbol, {
      fontFamily: 'Arial', fontSize: '18px', color: '#111111', fontStyle: 'bold'
    }).setOrigin(0.5);

    item.add([g, text]);
    item.quote = quote;
    item.memoryColor = color;
    this.physics.add.existing(item, true);
    item.body.setSize(44, 44);
    this.memoryFragments.add(item);

    this.tweens.add({ targets: item, y: y - 14, duration: 1200 + Phaser.Math.Between(0, 400), ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });
    this.tweens.add({ targets: g, alpha: 0.5, duration: 800, yoyo: true, repeat: -1, delay: Phaser.Math.Between(0, 600) });
  }

  flashFragmentEffect(x, y, color) {
    for (let i = 0; i < 3; i++) {
      const ring = this.add.graphics();
      ring.lineStyle(2 - i * 0.5, color, 0.8 - i * 0.2);
      ring.strokeCircle(x, y, 10 + i * 6);
      this.tweens.add({ targets: ring, scaleX: 4 + i, scaleY: 4 + i, alpha: 0, duration: 500 + i * 120, onComplete: () => ring.destroy() });
    }
    this.cameras.main.flash(200, 255, 242, 182, false);
  }

  createTaskStations() {
    this.taskStations = this.physics.add.staticGroup();
    const tasks = [
      { x: 1120, y: 430, id: 'brother', name: 'Fix the Valve', color: 0xf2c26b, accentStr: '#f2c26b', icon: '⚙', question: 'Choose the response that eases societal pressure.', options: ['OVERLOAD', 'BALANCE', 'SHUT OFF'], answer: 1, success: 'Equilibrium found. The watcher softens.' },
      { x: 3220, y: 380, id: 'frankenstein', name: 'Reset Circuit', color: 0x9ff4ff, accentStr: '#9ff4ff', icon: '⚡', question: 'Find the choice that calms the creation.', options: ['REMOVE HEART', 'REPAIR', 'ABANDON'], answer: 1, success: 'The laboratory quiets. Something heals.' },
      { x: 6350, y: 345, id: 'hamlet', name: 'Balance the Stage', color: 0xd4b0ff, accentStr: '#d4b0ff', icon: '♟', question: 'What loosens the grip of performance?', options: ['ACT HARDER', 'STAND STILL', 'QUESTION'], answer: 2, success: 'Doubt steadies you. The stage breathes again.' }
    ];

    tasks.forEach((task) => {
      const g = this.add.graphics();
      g.fillStyle(task.color, 0.1);
      g.fillRoundedRect(task.x - 44, task.y - 40, 88, 80, 8);
      g.lineStyle(1.5, task.color, 0.5);
      g.strokeRoundedRect(task.x - 44, task.y - 40, 88, 80, 8);
      g.lineStyle(1, task.color, 0.15);
      for (let xi = task.x - 36; xi < task.x + 44; xi += 8) {
        g.strokeLineShape(new Phaser.Geom.Line(xi, task.y - 38, xi, task.y + 38));
      }

      const icon = this.add.text(task.x, task.y - 14, task.icon, {
        fontFamily: 'Arial', fontSize: '28px', color: task.accentStr
      }).setOrigin(0.5);
      this.add.text(task.x, task.y + 18, task.name, {
        fontFamily: 'Arial', fontSize: '11px', color: task.accentStr, fontStyle: 'bold'
      }).setOrigin(0.5);
      const ePrompt = this.add.text(task.x, task.y - 52, '[E]', {
        fontFamily: 'Arial', fontSize: '14px', color: '#ffffff'
      }).setOrigin(0.5).setAlpha(0.7);

      this.tweens.add({ targets: icon, y: task.y - 20, duration: 1000, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });
      this.tweens.add({ targets: ePrompt, alpha: 0.2, duration: 600, yoyo: true, repeat: -1 });

      const station = this.add.rectangle(task.x, task.y, 88, 80, 0x000000, 0);
      station.taskId = task.id;
      station.taskData = task;
      this.physics.add.existing(station, true);
      station.body.setSize(88, 80);
      this.taskStations.add(station);
    });
  }

  createCheckpointBooks() {
    this.checkpointBooks = this.physics.add.staticGroup();
    const books = [
      { x: 1700, y: 412, color: 0xffd35a, accentStr: '#ffd35a' },
      { x: 4300, y: 390, color: 0x9ff4ff, accentStr: '#9ff4ff' },
      { x: 6900, y: 380, color: 0xd4b0ff, accentStr: '#d4b0ff' }
    ];
    books.forEach((data) => {
      const g = this.add.graphics();
      g.fillStyle(data.color, 0.07);
      g.fillCircle(data.x, data.y, 30);
      g.fillStyle(data.color, 0.95);
      g.fillRoundedRect(data.x - 18, data.y - 24, 36, 46, 3);
      g.fillStyle(0x000000, 0.3);
      g.fillRect(data.x - 18, data.y - 24, 7, 46);
      g.lineStyle(1, 0xffffff, 0.4);
      for (let pi = 0; pi < 4; pi++) {
        g.strokeLineShape(new Phaser.Geom.Line(data.x - 10, data.y - 20 + pi * 4, data.x + 18, data.y - 20 + pi * 4));
      }
      this.add.text(data.x, data.y + 34, 'SAVE', {
        fontFamily: 'Arial', fontSize: '10px', color: data.accentStr, fontStyle: 'bold'
      }).setOrigin(0.5).setAlpha(0.8);
      this.tweens.add({ targets: g, y: '-=6', duration: 1100, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });

      const book = this.add.rectangle(data.x, data.y, 40, 52, 0x000000, 0);
      this.physics.add.existing(book, true);
      book.body.setSize(40, 52);
      this.checkpointBooks.add(book);
    });

    this.physics.add.overlap(this.player, this.checkpointBooks, (_p, book) => {
      if (!book.active) return;
      book.body.enable = false;
      book.setActive(false);
      book.setVisible(false);
      this.lastCheckpoint = { x: book.x, y: book.y - 24 };
      this.showQuote('✓  Checkpoint saved. The last book holds your place.', 2400);
      this.easePressure(-12);
    });
  }

  createSpotlights() {
    this.spotlights = [];
    const data = [
      { x: 480, y: 110, range: 160, width: 130 },
      { x: 1110, y: 100, range: 190, width: 145 },
      { x: 7340, y: 90, range: 180, width: 135 }
    ];
    data.forEach((item) => {
      const lampG = this.add.graphics();
      lampG.fillStyle(0xcc3333, 1);
      lampG.fillCircle(item.x, item.y, 10);
      lampG.lineStyle(2, 0xffffff, 0.4);
      lampG.strokeCircle(item.x, item.y, 10);
      lampG.lineStyle(2, 0x888888, 0.8);
      lampG.strokeLineShape(new Phaser.Geom.Line(item.x, item.y, item.x, item.y - 16));

      const beam = this.add.triangle(item.x, item.y + 10, 0, 0, -65, 370, 65, 370, 0xff3333, 0.13);
      const beamInner = this.add.triangle(item.x, item.y + 10, 0, 0, -20, 370, 20, 370, 0xff6666, 0.06);
      const watchLabel = this.add.text(item.x, item.y - 28, '◉ WATCH', {
        fontFamily: 'Arial', fontSize: '12px', color: '#ff8888', fontStyle: 'bold'
      }).setOrigin(0.5);

      this.spotlights.push({ ...item, beam, beamInner, lampG, watchLabel });
    });
  }

  createElectricHazards() {
    this.electricHazards = this.physics.add.staticGroup();
    this.electricList = [];
    const hazardData = [
      { x: 2840, y: 388, h: 125, offset: 0 },
      { x: 3400, y: 370, h: 150, offset: 650 },
      { x: 4040, y: 382, h: 130, offset: 1200 },
      { x: 7900, y: 376, h: 145, offset: 350 },
      { x: 8530, y: 360, h: 155, offset: 900 }
    ];
    hazardData.forEach((data) => {
      const g = this.add.graphics();
      g.fillStyle(0xff4b4b, 0.1);
      g.fillRoundedRect(data.x - 16, data.y - data.h / 2, 32, data.h, 4);
      g.lineStyle(1.5, 0xff4b4b, 0.4);
      g.strokeRoundedRect(data.x - 16, data.y - data.h / 2, 32, data.h, 4);

      const bolt = this.add.text(data.x, data.y, '⚡', {
        fontFamily: 'Arial', fontSize: '22px', color: '#ffffff'
      }).setOrigin(0.5);

      const hitbox = this.add.rectangle(data.x, data.y, 32, data.h, 0x000000, 0);
      hitbox.warning = false;
      hitbox.activeArc = false;
      hitbox.offset = data.offset;
      hitbox.lastHitTime = 0;
      hitbox._gfx = g;
      hitbox._bolt = bolt;
      hitbox._h = data.h;
      hitbox._yd = data.y;
      this.physics.add.existing(hitbox, true);
      hitbox.body.setSize(32, data.h);
      this.electricHazards.add(hitbox);
      this.electricList.push(hitbox);
    });
    this.physics.add.overlap(this.player, this.electricHazards, (_p, hazard) => {
      if (!hazard.activeArc || this.time.now < hazard.lastHitTime + 1100) return;
      hazard.lastHitTime = this.time.now;
      this.spikePressure(14, 'UNSTABLE CREATION');
    });
  }

  createPortal() {
    this.portal = this.add.container(WORLD_WIDTH - 135, GROUND_Y - 80);
    const g = this.add.graphics();
    g.lineStyle(3, 0x8f5cff, 0.5);
    g.strokeRoundedRect(-38, -68, 76, 136, 12);
    g.fillStyle(0x2b0f6d, 0.85);
    g.fillRoundedRect(-34, -64, 68, 128, 10);
    for (let si = 0; si < 5; si++) {
      g.fillStyle(0x8f5cff, 0.04 + si * 0.02);
      g.fillRect(-28 + si * 3, -60, 4, 120);
    }

    const exitText = this.add.text(0, -10, 'EXIT', {
      fontFamily: 'Arial', fontSize: '15px', color: '#c8aaff', fontStyle: 'bold'
    }).setOrigin(0.5);
    const exitSub = this.add.text(0, 10, 'portal', {
      fontFamily: 'Georgia, serif', fontSize: '12px', color: '#8f5cff'
    }).setOrigin(0.5);

    this.portal.add([g, exitText, exitSub]);
    this.physics.add.existing(this.portal, true);

    this.tweens.add({ targets: exitText, alpha: 0.4, duration: 700, yoyo: true, repeat: -1 });
    this.tweens.add({ targets: g, alpha: 0.7, duration: 1100, yoyo: true, repeat: -1 });

    this.physics.add.overlap(this.player, this.portal, () => {
      if (this.memoriesCollected >= this.requiredMemories) {
        this.cameras.main.fadeOut(600, 5, 5, 9);
        this.time.delayedCall(620, () => this.scene.start('EndScene'));
      } else if (!this.portalWarningActive) {
        this.portalWarningActive = true;
        this.showQuote(`Collect ${this.requiredMemories} memory fragments before you can finish. (${this.memoriesCollected}/${this.requiredMemories})`, 2600);
        this.time.delayedCall(2700, () => { this.portalWarningActive = false; });
      }
    });
  }

  createUi() {
    const hudG = this.add.graphics().setScrollFactor(0).setDepth(1000);
    hudG.fillStyle(0x000000, 0.82);
    hudG.fillRect(0, 0, GAME_WIDTH, 80);
    hudG.lineStyle(1, 0xffffff, 0.08);
    hudG.strokeLineShape(new Phaser.Geom.Line(0, 80, GAME_WIDTH, 80));

    this.add.text(24, 12, 'SOCIETAL PRESSURE', {
      fontFamily: 'Arial', fontSize: '11px', color: '#6666aa', fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(1001);

    const barTrack = this.add.graphics().setScrollFactor(0).setDepth(1001);
    barTrack.fillStyle(0xffffff, 0.06);
    barTrack.fillRoundedRect(24, 30, 280, 14, 7);
    barTrack.lineStyle(1, 0xffffff, 0.12);
    barTrack.strokeRoundedRect(24, 30, 280, 14, 7);

    this.pressureBarGfx = this.add.graphics().setScrollFactor(0).setDepth(1002);

    this.pressureText = this.add.text(314, 30, '0%', {
      fontFamily: 'Arial', fontSize: '14px', color: '#ffd35a', fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(1001);

    this.memoryText = this.add.text(400, 12, '', {
      fontFamily: 'Arial', fontSize: '11px', color: '#aaaacc'
    }).setScrollFactor(0).setDepth(1001);

    this.memoryBarGfx = this.add.graphics().setScrollFactor(0).setDepth(1001);

    this.sectionText = this.add.text(GAME_WIDTH - 20, 12, '', {
      fontFamily: 'Georgia, serif', fontSize: '14px', color: '#8888cc', align: 'right'
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(1001);

    this.warningText = this.add.text(GAME_WIDTH / 2, 92, '', {
      fontFamily: 'Arial', fontSize: '18px', color: '#ff5555', fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

    this.taskInstructionText = this.add.text(GAME_WIDTH / 2, 62, '', {
      fontFamily: 'Arial', fontSize: '13px', color: '#aaaacc'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

    this.add.text(24, 60, '◉ Red cone = WATCH  ⚡ = electric  📖 = save', {
      fontFamily: 'Arial', fontSize: '11px', color: '#44445a'
    }).setScrollFactor(0).setDepth(1001);

    this.quoteBoxGfx = this.add.graphics().setScrollFactor(0).setDepth(1000).setVisible(false);
    this.quoteText = this.add.text(GAME_WIDTH / 2, 190, '', {
      fontFamily: 'Georgia, serif', fontSize: '20px', color: '#fff2b6', align: 'center',
      wordWrap: { width: 740 }, fontStyle: 'italic'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001).setVisible(false);

    this.struggleOverlay = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0xff4e5a, 0)
      .setOrigin(0, 0).setScrollFactor(0).setDepth(900);
    this.vignette = this.add.graphics().setScrollFactor(0).setDepth(901);

    this.taskPanelGfx = this.add.graphics().setScrollFactor(0).setDepth(1002).setVisible(false);
    this.taskPromptText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 110, '', {
      fontFamily: 'Georgia, serif', fontSize: '20px', color: '#e8e8ff', align: 'center',
      wordWrap: { width: 820 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1003).setVisible(false);
    this.taskOptionText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 60, '', {
      fontFamily: 'Arial', fontSize: '17px', color: '#ffd35a', align: 'center',
      wordWrap: { width: 820 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1003).setVisible(false);
  }

  showQuote(quote, duration = 3500) {
    if (!this.quoteBoxGfx || !this.quoteText) return;
    this.quoteText.setText(quote);
    this.quoteBoxGfx.clear();
    this.quoteBoxGfx.fillStyle(0x000000, 0.82);
    this.quoteBoxGfx.fillRoundedRect(GAME_WIDTH / 2 - 420, 152, 840, 72, 8);
    this.quoteBoxGfx.lineStyle(1, 0xffd35a, 0.2);
    this.quoteBoxGfx.strokeRoundedRect(GAME_WIDTH / 2 - 420, 152, 840, 72, 8);
    this.quoteBoxGfx.setVisible(true).setAlpha(1);
    this.quoteText.setVisible(true).setAlpha(1);

    this.time.delayedCall(duration, () => {
      this.tweens.add({
        targets: [this.quoteBoxGfx, this.quoteText], alpha: 0, duration: 400,
        onComplete: () => { this.quoteBoxGfx.setVisible(false); this.quoteText.setVisible(false); }
      });
    });
  }

  update(time, delta) {
    this.updateSection();
    this.updateSpotlights(time);
    this.updateElectricHazards(time);
    this.updatePlayerGraphics();

    if (this.player.y > GAME_HEIGHT + 120) this.resetToCheckpoint();

    if (this.taskActive) {
      this.player.body.setVelocityX(0);
      if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) this.changeTaskChoice(-1);
      if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) this.changeTaskChoice(1);
      if (Phaser.Input.Keyboard.JustDown(this.spaceKey) || Phaser.Input.Keyboard.JustDown(this.keyE)) this.submitTask();
      this.updatePressure(time, delta, false);
      this.updatePressureUi();
      return;
    }

    this.taskNearby = null;
    this.physics.overlap(this.player, this.taskStations, (_p, station) => { this.taskNearby = station; });
    this.updateTaskInstruction();
    if (this.taskNearby && Phaser.Input.Keyboard.JustDown(this.keyE)) this.startTask(this.taskNearby);

    if (time < this.pauseUntil) {
      this.player.body.setVelocityX(0);
      this.updatePressure(time, delta, true);
      this.updatePressureUi();
      return;
    }

    const section = this.getCurrentSection();
    const baseSpeed = section.key.includes('reflection') ? 150 : 220;
    const heavyPenalty = time < this.heavyUntil ? 55 : 0;
    const pressurePenalty = Phaser.Math.Clamp(this.pressure * 0.26, 0, 28);
    const speed = baseSpeed - heavyPenalty - pressurePenalty;

    if (this.cursors.left.isDown) this.player.body.setVelocityX(-speed);
    else if (this.cursors.right.isDown) this.player.body.setVelocityX(speed);
    else this.player.body.setVelocityX(0);

    if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.player.body.blocked.down) {
      this.player.body.setVelocityY(this.currentJumpVelocity);
    }

    this.updatePressure(time, delta, false);
    this.updatePressureUi();
  }

  updatePlayerGraphics() {
    if (!this.playerGfx || !this.player) return;
    this.playerGfx.x = this.player.x;
    this.playerGfx.y = this.player.y;
    const pressureAlpha = 1 - (this.pressure / 100) * 0.4;
    this.drawPlayer(this.playerGfx, 0, 0, pressureAlpha);
    if (this.cursors.left.isDown) this.playerGfx.setRotation(-0.12);
    else if (this.cursors.right.isDown) this.playerGfx.setRotation(0.12);
    else this.playerGfx.setRotation(0);
  }

  getCurrentSection() {
    return SECTION_DATA.find((s) => this.player.x >= s.start && this.player.x < s.end) || SECTION_DATA[SECTION_DATA.length - 1];
  }

  updateSection() {
    const section = this.getCurrentSection();
    if (section.key === this.currentSectionKey) return;
    this.currentSectionKey = section.key;
    this.sectionText.setText(section.title + '\n' + section.subtitle);
    this.sectionText.setColor(section.accent);
    this.cameras.main.flash(350, 255, 255, 255, true);
  }

  updateSpotlights(time) {
    this.spotlights.forEach((spot) => {
      const sweep = Math.sin(time * 0.0014) * spot.range;
      spot.beam.x = spot.x + sweep;
      spot.beamInner.x = spot.x + sweep;
      spot.watchLabel.x = spot.x + sweep * 0.26;
      const alpha = 0.1 + Math.sin(time / 160) * 0.04;
      spot.beam.setAlpha(alpha);
      spot.beamInner.setAlpha(alpha * 0.7);

      const caughtH = Math.abs(this.player.x - spot.beam.x) < spot.width / 2;
      const inBeamHeight = this.player.y > spot.y + 80;
      const correctSection = Math.abs(this.player.x - spot.x) < spot.range + 320;

      if (caughtH && inBeamHeight && correctSection && time > this.lastSpotlightHit + 1800) {
        this.lastSpotlightHit = time;
        this.spotlightWarningUntil = time + 1200;
        this.spikePressure(16, '◉  SPOTTED — AVOID THE CONE');
      }
    });
  }

  updateElectricHazards(time) {
    this.electricList.forEach((hazard) => {
      const cycle = (time + hazard.offset) % 2600;
      hazard.warning = cycle > 1200 && cycle <= 1650;
      hazard.activeArc = cycle > 1650 && cycle < 2325;

      hazard._gfx.clear();
      let fillColor = 0xff4b4b, fillAlpha = 0.10, borderColor = 0xff4b4b, borderAlpha = 0.35;
      let boltColor = '#ff9999';

      if (hazard.activeArc) {
        fillColor = 0x68f4ff; fillAlpha = 0.30; borderColor = 0x68f4ff; borderAlpha = 0.8;
        boltColor = '#ffffff';
        hazard._gfx.lineStyle(1, 0x68f4ff, 0.6);
        for (let ai = 0; ai < 3; ai++) {
          const ay = hazard._yd - hazard._h / 2 + Phaser.Math.Between(10, hazard._h - 10);
          hazard._gfx.strokeLineShape(new Phaser.Geom.Line(
            hazard.x - 10 + Phaser.Math.Between(-5, 5), ay,
            hazard.x + 10 + Phaser.Math.Between(-5, 5), ay + Phaser.Math.Between(-10, 10)
          ));
        }
      } else if (hazard.warning) {
        fillColor = 0xff9b28; fillAlpha = 0.18; borderColor = 0xff9b28; borderAlpha = 0.6;
        boltColor = '#ffd55b';
      }

      hazard._gfx.fillStyle(fillColor, fillAlpha);
      hazard._gfx.fillRoundedRect(hazard.x - 16, hazard._yd - hazard._h / 2, 32, hazard._h, 4);
      hazard._gfx.lineStyle(1.5, borderColor, borderAlpha);
      hazard._gfx.strokeRoundedRect(hazard.x - 16, hazard._yd - hazard._h / 2, 32, hazard._h, 4);
      hazard._bolt.setColor(boltColor);
    });
  }

  updatePressure(time, delta, isPaused) {
    const section = this.getCurrentSection();
    const seconds = delta / 1000;
    const moveMult = Math.abs(this.player.body.velocity.x) > 8 ? 1 : 0.44;
    const dp = section.pressureRate * seconds * 7.5 * moveMult;

    if (!isPaused) this.pressure = Phaser.Math.Clamp(this.pressure + dp, 0, 100);
    else this.pressure = Phaser.Math.Clamp(this.pressure - seconds * 10, 0, 100);

    const r = this.pressure / 100;
    const refWeight = section.key.includes('reflection') ? -80 : 0;
    const synWeight = section.key === 'synthesis' ? 80 : 0;
    this.physics.world.gravity.y = 620 + refWeight + synWeight + (320 * r);
    this.currentJumpVelocity = -520 + (120 * r);

    const vAlpha = Phaser.Math.Clamp((this.pressure - 72) / 160, 0, 0.22);
    this.vignette.clear();
    if (vAlpha > 0.01) {
      this.vignette.fillStyle(0x000000, vAlpha * 0.9);
      this.vignette.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }

    let sColor = 0xff4e5a;
    if (section.key === 'frankenstein') sColor = 0x9ff4ff;
    else if (section.key === 'hamlet') sColor = 0xaa77ff;
    this.struggleOverlay.setFillStyle(sColor, 1);
    this.struggleOverlay.setAlpha(Phaser.Math.Clamp((this.pressure - 55) / 210, 0, 0.18));

    this.shakeCooldown -= delta;
    if (this.pressure >= 75 && this.shakeCooldown <= 0) {
      this.cameras.main.shake(120, 0.002 + r * 0.004);
      this.shakeCooldown = section.key === 'synthesis' ? 850 : 1250;
    }
    this.updateWhispers(time, section);
  }

  updateWhispers(time, section) {
    const gate = (section.key === 'hamlet' || section.key === 'synthesis') ? 24 : 40;
    if (this.pressure <= gate || (this.lastWhisperTime && time <= this.lastWhisperTime + section.whisperDelay)) return;

    const whispers = {
      brother: ['"Belong."', '"Act normal."', '"Watch yourself."', '"Prove yourself."'],
      reflection1: ['"Expectation begins with perception."', '"Who is allowed to be seen clearly?"'],
      frankenstein: ['"Monster."', '"Appearance becomes destiny."', '"You are what they fear."'],
      reflection2: ['"Society creates the monsters it fears."', '"Rejection teaches isolation."'],
      hamlet: ['"Avenge."', '"Perform."', '"Be a man."', '"You are losing yourself."'],
      synthesis: ['"Belong."', '"Monster."', '"Perform."', '"The mask is all they see."']
    };

    const isSyn = section.key === 'synthesis';
    const whisper = this.add.text(
      this.player.x + Phaser.Math.Between(-90, 90),
      this.player.y - Phaser.Math.Between(80, 120),
      Phaser.Utils.Array.GetRandom(whispers[section.key] || []),
      { fontFamily: 'Georgia, serif', fontSize: isSyn ? '22px' : '18px', color: '#ffffff', fontStyle: 'italic' }
    ).setAlpha(isSyn ? 0.75 : 0.55);

    this.tweens.add({
      targets: whisper, alpha: 0, y: whisper.y - 50,
      duration: isSyn ? 2000 : 2800,
      onComplete: () => whisper.destroy()
    });
    this.lastWhisperTime = time;
  }

  spikePressure(amount, warning) {
    this.pressure = Phaser.Math.Clamp(this.pressure + amount, 0, 100);
    this.heavyUntil = this.time.now + 2600;
    this.cameras.main.shake(170, 0.004);
    this.warningText.setText(warning).setAlpha(1);
    this.tweens.add({ targets: this.warningText, alpha: 0, duration: 2200, delay: 600 });
  }

  easePressure(amount) {
    this.pressure = Phaser.Math.Clamp(this.pressure + amount, 0, 100);
  }

  updatePressureUi() {
    const pct = this.pressure / 100;
    const r = 255;
    const g = Math.round(210 * (1 - pct));
    const hex = (r << 16) | (g << 8) | 0;

    this.pressureBarGfx.clear();
    const barW = Math.round(280 * pct);
    if (barW > 0) {
      this.pressureBarGfx.fillStyle(hex, 1);
      this.pressureBarGfx.fillRoundedRect(24, 30, barW, 14, 7);
    }
    if (this.pressure > 60) {
      this.pressureBarGfx.fillStyle(0xffffff, 0.12 * Math.sin(this.time.now / 200));
      this.pressureBarGfx.fillRoundedRect(24, 30, barW, 6, 4);
    }

    this.pressureText.setText(`${Math.round(this.pressure)}%`);
    this.pressureText.setColor(this.pressure > 75 ? '#ff5555' : this.pressure > 50 ? '#ffaa33' : '#ffd35a');

    this.memoryText.setText(`FRAGMENTS  ${this.memoriesCollected} / ${this.requiredMemories}`);
    this.memoryBarGfx.clear();
    for (let mi = 0; mi < this.requiredMemories; mi++) {
      const mx = 400 + mi * 18;
      const filled = mi < this.memoriesCollected;
      this.memoryBarGfx.fillStyle(filled ? 0xffd35a : 0x333344, 1);
      this.memoryBarGfx.fillCircle(mx, 55, filled ? 5 : 4);
      if (filled) {
        this.memoryBarGfx.lineStyle(1, 0xffffff, 0.3);
        this.memoryBarGfx.strokeCircle(mx, 55, 5);
      }
    }

    if (this.time.now > this.spotlightWarningUntil) {
      if (this.pressure > 88) this.warningText.setText('THE MASK IS BECOMING TOO HEAVY').setAlpha(1);
      else if (this.pressure > 66) this.warningText.setText('YOU ARE LOSING YOURSELF').setAlpha(1);
      else if (this.pressure > 42) this.warningText.setText('EXPECTATIONS ARE GROWING').setAlpha(0.8);
      else if (this.time.now > this.heavyUntil) this.warningText.setText('').setAlpha(1);
    }
  }

  startTask(station) {
    if (this.taskComplete[station.taskId]) {
      this.showQuote('Task already completed. Keep moving toward the next checkpoint.', 2200);
      return;
    }
    this.taskActive = true;
    this.currentTask = station.taskData;
    this.taskChoice = 0;

    this.taskPanelGfx.clear();
    this.taskPanelGfx.fillStyle(0x000000, 0.92);
    this.taskPanelGfx.fillRoundedRect(GAME_WIDTH / 2 - 450, GAME_HEIGHT - 145, 900, 130, 10);
    this.taskPanelGfx.lineStyle(1.5, this.currentTask.color, 0.45);
    this.taskPanelGfx.strokeRoundedRect(GAME_WIDTH / 2 - 450, GAME_HEIGHT - 145, 900, 130, 10);
    this.taskPanelGfx.setVisible(true);

    this.taskPromptText.setText(this.currentTask.question).setVisible(true);
    this.taskOptionText.setText(this.formatTaskOptions()).setVisible(true);
  }

  formatTaskOptions() {
    return this.currentTask.options.map((o, i) => i === this.taskChoice ? `[ ${o} ]` : `  ${o}  `).join('     ');
  }

  changeTaskChoice(dir) {
    if (!this.currentTask) return;
    this.taskChoice = Phaser.Math.Wrap(this.taskChoice + dir, 0, this.currentTask.options.length);
    this.taskOptionText.setText(this.formatTaskOptions());
  }

  submitTask() {
    if (!this.currentTask) return;
    const task = this.currentTask;
    const correct = task.answer === this.taskChoice;
    this.taskActive = false;
    this.taskPanelGfx.setVisible(false);
    this.taskPromptText.setVisible(false);
    this.taskOptionText.setVisible(false);

    if (correct) {
      this.taskComplete[task.id] = true;
      this.showQuote('✓  ' + task.success, 2800);
      this.easePressure(-18);
    } else {
      this.spikePressure(18, '✕  TASK FAILED');
      this.showQuote('The task went wrong. The mask grows heavier.', 2600);
    }
    this.currentTask = null;
  }

  updateTaskInstruction() {
    if (this.taskActive) return;
    if (this.taskNearby) {
      this.taskInstructionText.setText(
        this.taskComplete[this.taskNearby.taskId]
          ? 'Task complete — continue to the next checkpoint book'
          : 'Press  E  to begin task'
      );
    } else {
      this.taskInstructionText.setText('');
    }
  }

  resetToCheckpoint() {
    if (this.time.now < this.lastFallTime + 700) return;
    this.lastFallTime = this.time.now;
    this.player.body.reset(this.lastCheckpoint.x, this.lastCheckpoint.y);
    this.player.body.setVelocity(0, 0);
    this.showQuote('You fell. Returned to the last checkpoint book.', 2600);
    this.spikePressure(8, 'RESET');
    this.cameras.main.flash(130, 255, 255, 255, true);
  }
}

class EndScene extends Phaser.Scene {
  constructor() { super('EndScene'); }
  create() {
    this.cameras.main.setBackgroundColor('#050509');
    const cx = GAME_WIDTH / 2;

    for (let i = 0; i < 80; i++) {
      const star = this.add.circle(Phaser.Math.Between(0, GAME_WIDTH), Phaser.Math.Between(0, GAME_HEIGHT), Phaser.Math.FloatBetween(0.5, 1.8), 0xffffff, Phaser.Math.FloatBetween(0.1, 0.6));
      this.tweens.add({ targets: star, alpha: 0.05, duration: Phaser.Math.Between(1000, 3000), yoyo: true, repeat: -1, delay: Phaser.Math.Between(0, 2000) });
    }

    this.add.rectangle(cx, 40, 360, 1, 0xffd35a, 0.4);

    this.add.text(cx, 80, 'The Mask Is Set Down', {
      fontFamily: 'Georgia, serif', fontSize: '50px', color: '#ffffff', fontStyle: 'italic'
    }).setOrigin(0.5);

    this.add.text(cx, 142, 'ENG4U  ·  Literary Synthesis Complete', {
      fontFamily: 'Arial', fontSize: '14px', color: '#666688'
    }).setOrigin(0.5);

    const sources = [
      { label: 'Brother', sub: 'Expectation & belonging', color: '#f2c26b' },
      { label: 'Frankenstein', sub: 'Rejection & creation', color: '#9ff4ff' },
      { label: 'Hamlet', sub: 'Performance & identity', color: '#d4b0ff' }
    ];
    sources.forEach((s, i) => {
      const px = cx - 260 + i * 260;
      const g = this.add.graphics();
      const col = Phaser.Display.Color.HexStringToColor(s.color);
      g.fillStyle(col.color, 0.08);
      g.fillRoundedRect(px - 100, 200, 200, 64, 8);
      g.lineStyle(1, col.color, 0.35);
      g.strokeRoundedRect(px - 100, 200, 200, 64, 8);
      this.add.text(px, 220, s.label, { fontFamily: 'Georgia, serif', fontSize: '18px', color: s.color }).setOrigin(0.5);
      this.add.text(px, 244, s.sub, { fontFamily: 'Arial', fontSize: '12px', color: '#888888' }).setOrigin(0.5);
    });

    this.add.text(cx, 305, 'The journey through all three texts reveals how societal expectations', {
      fontFamily: 'Georgia, serif', fontSize: '18px', color: '#c8c8e8', align: 'center', wordWrap: { width: 760 }
    }).setOrigin(0.5);
    this.add.text(cx, 335, 'shape and distort identity — forcing the self to hide beneath a mask.', {
      fontFamily: 'Georgia, serif', fontSize: '18px', color: '#c8c8e8', align: 'center', wordWrap: { width: 760 }, fontStyle: 'italic'
    }).setOrigin(0.5);
    this.add.text(cx, 388, 'When the mask is set down, the self remains — changed, but present.', {
      fontFamily: 'Georgia, serif', fontSize: '15px', color: '#666688', align: 'center', wordWrap: { width: 700 }
    }).setOrigin(0.5);

    const restartG = this.add.graphics();
    restartG.fillStyle(0xffd35a, 0.1);
    restartG.fillRoundedRect(cx - 160, 440, 320, 48, 24);
    restartG.lineStyle(1, 0xffd35a, 0.4);
    restartG.strokeRoundedRect(cx - 160, 440, 320, 48, 24);
    const restart = this.add.text(cx, 464, 'PRESS SPACE  —  RETURN TO TITLE', {
      fontFamily: 'Arial', fontSize: '15px', color: '#ffd35a'
    }).setOrigin(0.5);

    this.tweens.add({ targets: [restart, restartG], alpha: 0.3, duration: 800, yoyo: true, repeat: -1 });
    this.input.keyboard.once('keydown-SPACE', () => {
      this.cameras.main.fadeOut(400, 5, 5, 9);
      this.time.delayedCall(420, () => this.scene.start('StartScene'));
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#050509',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 620 }, debug: false }
  },
  scene: [StartScene, GameScene, EndScene],
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }
};

new Phaser.Game(config);