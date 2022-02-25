import { Application } from "pixi.js"

export class App {
  public pixi: Application;

  private lastTrigger: number;
  private interval: number;
  private timeout: number;
  
  constructor() {
    this.lastTrigger = 0;
    this.interval = 1000;
    this.timeout = 0;

    this.pixi = new Application({
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: 0x000000,
      width: window.innerWidth,
      height: window.innerHeight
    });

    window.addEventListener('resize', () => this.resize());
  }

  private doResize() {
    this.pixi.renderer.resize(window.innerWidth, window.innerHeight);
  }

  private resize() {
    const now = Date.now();
    if (now - this.lastTrigger > this.interval) {
      console.log('resizing');
      this.doResize();
      this.lastTrigger = now;
    }

    if (this.timeout != 0) {
      clearTimeout(this.timeout);
      this.timeout = 0;
    }

    this.timeout = setTimeout(() => {
      console.log('resizing timeout');
      this.doResize();
    }, this.interval);
  }
}
