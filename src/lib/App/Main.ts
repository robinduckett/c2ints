import { Application } from "pixi.js"
import { Background } from "./Background";

export class App {
  public pixi: Application;

  private lastTrigger: number;
  private interval: number;
  private timeout: number | NodeJS.Timeout;

  private view: HTMLCanvasElement;

  private background: Background;
  
  constructor(element: HTMLCanvasElement) {
    this.lastTrigger = 0;
    this.interval = 1000;
    this.timeout = 0;

    const view = this.view = element;

    const width = (view.parentNode as HTMLDivElement).clientWidth;
    const height = (view.parentNode as HTMLDivElement).clientHeight;

    this.pixi = new Application({
      view,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: 0x000000,
      width,
      height
    });

    this.background = new Background(this);

    this.background.on('loaded', () => {
      console.log('background loaded');
    });

    this.background.on('progress', (...args) => {
      console.log('progress', args);
    });

    this.pixi.stage.addChild(this.background);

    window.addEventListener('resize', () => this.resize());
  }

  public get width(): number {
    return (this.view.parentNode as HTMLDivElement).clientWidth;
  }

  public get height(): number {
    return (this.view.parentNode as HTMLDivElement).clientHeight;
  }

  private doResize() {
    const { width, height } = this;

    this.pixi.renderer.resize(width, height);
    this.background.resize(width, height);
  }

  private resize() {
    const now = Date.now();
    if (now - this.lastTrigger > this.interval) {
      this.doResize();
      this.lastTrigger = now;
    }

    if (this.timeout != 0) {
      clearTimeout(this.timeout as number);
      this.timeout = 0;
    }

    this.timeout = setTimeout(() => {
      this.doResize();
    }, this.interval);
  }
}
