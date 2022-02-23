import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { pixelWorldHeight, pixelWorldWidth } from './lib/World/constants';
import { creatureDeserializer } from './lib/Creature/Creature';

const app = new PIXI.Application();

document.body.appendChild(app.view);

const viewport = new Viewport({
  screenHeight: window.innerHeight,
  screenWidth: window.innerWidth,
  worldWidth: pixelWorldWidth,
  worldHeight: pixelWorldHeight,
  disableOnContextMenu: true,
  interaction: app.renderer.plugins.interaction
});

app.stage.addChild(viewport)

viewport.drag().pinch().wheel().decelerate();

const sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE));
sprite.tint = 0xff0000;
sprite.width = sprite.height = 100;
sprite.position.set(100, 100);

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
