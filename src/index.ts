import { Loader, Sprite } from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { pixelWorldHeight, pixelWorldWidth } from './lib/World/constants';
import { creatureDeserializer } from './lib/Creature/Creature';
import { App } from './lib/App/Main';
import { mod } from './lib/Maths';

const app = new App();

const viewport = new Viewport({
  screenHeight: window.innerHeight,
  screenWidth: window.innerWidth,
  worldWidth: pixelWorldWidth,
  worldHeight: pixelWorldHeight - 10,
  disableOnContextMenu: true,
  interaction: app.pixi.renderer.plugins.interaction,
});

app.pixi.stage.addChild(viewport)

viewport.drag().pinch().wheel().decelerate().clampZoom({
  maxScale: 2,
  minScale: 0.5,
}).clamp({
  direction: 'y',
});

let currentPos = 0;

const loader = Loader.shared;
loader.reset();
loader.add('bg', "images/back2.png");
loader.add('bg0', "images/bgtiles0000.png");
loader.add('bg1', "images/bgtiles0001.png");
loader.add('bg2', "images/bgtiles0002.png");
loader.add('bg3', "images/bgtiles0003.png");

loader.load((loader, resources) => {
  window.scrollTo({
    top: 1,
    left: 0
  });

  if (resources.bg.texture) {
    // const bg = new Sprite(resources.bg.texture);
    const bg0 = new Sprite(resources.bg0.texture);
    const bg1 = new Sprite(resources.bg1.texture);
    const bg2 = new Sprite(resources.bg2.texture);
    const bg3 = new Sprite(resources.bg3.texture);

    // bg.position.x = 0;
    // bg.position.y = 0;

    viewport.addChild(bg0);
    viewport.addChild(bg1);
    viewport.addChild(bg2);
    viewport.addChild(bg3);

    let pos = Math.floor((viewport.center.x) / 2088);

    // pos = 0

    const bgs = [bg0, bg1, bg2, bg3];

    for (let i = 0; i < bgs.length; i++) {
      bgs[i].position.x = (pos + i) * 2088;
    }

    viewport.on('moved', () => {
      let pos = Math.floor((viewport.center.x) / 2088);
      
      const prev = mod(pos - 1, 4);
      const show = mod(pos, 4);
      const next = mod(pos + 1, 4);
      const last = mod(pos + 2, 4);

      for (let i = 0; i < bgs.length; i++) {
        bgs[prev].position.x = (pos - 1) * 2088;
        bgs[show].position.x = pos * 2088;
        bgs[next].position.x = (pos + 1) * 2088;
        bgs[last].position.x = (pos + 2) * 2088;
      }
    });
  }
});

var c = creatureDeserializer({
  "biochemistry": {
    "atp_requirement": 255,
    "owner": 0,
    "chemicals": [{
      "id": 4,
      "name": "COLDNESS",
      "concentration": 255,
      "halflife": {
        "value": 64
      },
    }],
    "organs": [],
    "heart_organs": [],
    "heart_rate": 25
  },
  "biotick": 0,
  "dead": false,
  "dreaming": false,
  "unconscious": false
});
