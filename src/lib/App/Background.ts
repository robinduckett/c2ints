import { Loader, LoaderResource, Sprite } from 'pixi.js';
import { Viewport } from "pixi-viewport";
import { Dict } from '@pixi/utils';

import { mod } from '../Maths';

import {
  pixelWorldHeight,
  pixelWorldWidth
} from "../World/constants";

import { App } from "./Main";

const CHUNK_TILE_WIDTH = pixelWorldWidth / 4;

export class Background extends Viewport {
  private bgs: Sprite[];

  constructor(app: App) {
    super({
      screenWidth: app.width,
      screenHeight: app.height,
      worldWidth: pixelWorldWidth,
      worldHeight: pixelWorldHeight,
      disableOnContextMenu: true,
      interaction: app.pixi.renderer.plugins.interaction,
    });

    this.bgs = [];
    
    this.drag().pinch().wheel().decelerate().clampZoom({
      maxScale: 2,
      minScale: 0.5,
    }).clamp({
      direction: 'y',
    });

    this.loadBackground();
  }

  resize(width: number, height: number) {
    this.screenWidth = width;
    this.screenHeight = height;
  }

  loadBackground() {
    const loader = new Loader();

    loader.add('bg0', "images/bgtiles0000.png");
    loader.add('bg1', "images/bgtiles0001.png");
    loader.add('bg2', "images/bgtiles0002.png");
    loader.add('bg3', "images/bgtiles0003.png");

    loader.load((_, resources) => this.handleLoader(resources));

    loader.onProgress.add((...args) => this.emit('progress', ...args));
  }

  private handleLoader(resources: Dict<LoaderResource>): void {
    if (resources.bg0.texture) {
      this.bgs = [
        new Sprite(resources.bg0.texture),
        new Sprite(resources.bg1.texture),
        new Sprite(resources.bg2.texture),
        new Sprite(resources.bg3.texture)
      ];

      for (const bg of this.bgs) {
        this.addChild(bg);
      }

      this.on('moved', () => this.updateChunks());

      this.updateChunks();

      this.emit('loaded');
    }

  }

  private updateChunks() {
    const currentPos = Math.floor(this.center.x / CHUNK_TILE_WIDTH);

    const prev = mod(currentPos - 1, 4);
    const show = mod(currentPos, 4);
    const next = mod(currentPos + 1, 4);
    const last = mod(currentPos + 2, 4);

    for (let i = 0; i < this.bgs.length; i++) {
      this.bgs[prev].position.x = (currentPos - 1) * CHUNK_TILE_WIDTH;
      this.bgs[show].position.x = currentPos * CHUNK_TILE_WIDTH;
      this.bgs[next].position.x = (currentPos + 1) * CHUNK_TILE_WIDTH;
      this.bgs[last].position.x = (currentPos + 2) * CHUNK_TILE_WIDTH;
    }
  }
}
