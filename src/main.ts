import * as pkg from '../package.json'
import { Drawable } from './drawable';
import { Particle } from './particle';
import { Rocket } from './rocket';

export default class Xplojs {
  private el: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private fps = 120;
  private lastLoop = Date.now();
  private lastTime: number = 0;
  private objects: Drawable[] = [];
  private width: number;
  private height: number;
  private startTime: number;

  /**
   * Maximal duration of fireworks in milliseconds;
   */
  public fireworksDuration: number;

  /**
   * Background fill color.
   */
  public fillColor: string;

  constructor(private selector: string | HTMLElement) {
    this.el = null as any;
    this.ctx = null as any;
    this.width = 0;
    this.height = 0;
    this.startTime = 0;
    this.fillColor = '';
    this.fireworksDuration = 0;

    this.reset();
    this.clear();
  }

  reset() {
    if (this.selector instanceof HTMLElement) {
      this.el = this.selector as HTMLCanvasElement;
    } else {
      this.el = document.querySelector(this.selector) as HTMLCanvasElement;
    }

    if (!this.el || !this.el.parentElement) {
      throw new Error("Missing selector or target element for xplojs construction");
    }

    this.el.width = this.el.parentElement.clientWidth * 2;
    this.el.height = this.el.parentElement.clientHeight * 2;

    this.width = this.el.width / 2
    this.height = this.el.height / 2;

    this.el.style.width = this.width + 'px';
    this.el.style.height = this.height + 'px';

    this.fireworksDuration = parseInt(this.el.getAttribute('data-fireworks-duration') || '0');

    this.fillColor = this.el.getAttribute('data-fireworks-fill-color') || 'rgba(31, 127, 103, 0.14)';
      this.ctx = this.el.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.scale(2, 2);

    this.objects = [];
  }

  start() {
    this.startTime = Date.now();
    this.seed(8);
    this.render();
  }

  stop() {
    // Set to 1ms, this will make the animation end after all particles
    // have disappeared.
    this.fireworksDuration = 1;
  }

  render(t = 0) {
    const now = Date.now();


    if (!this.keepRunning() && this.objects.length == 0) {
      this.clear();
      return;
    }

    requestAnimationFrame(this.render.bind(this));
    this.objects = this.objects.filter(o => {
     return !o.dead;
    });

    if (this.keepRunning() && this.objects.filter(o => o instanceof Rocket).length < 3) {
      this.seed();
    }

    if (!this.needsRedraw()) {
      return;
    }

    if (now - this.lastLoop > (1 / this.fps) * 1000) {
      this.lastLoop = now;

      this.ctx.fillStyle = this.fillColor;
      this.ctx.fillRect(0,0,this.width, this.height);

      this.objects.forEach(o => {
        o.integrate(t - this.lastTime);

        if (o instanceof Rocket) {
          const rocketParticles = o.explode();

          if (rocketParticles.length > 0) {
            this.objects.push(...rocketParticles);
          }
        }
        o.draw();
      });

      this.lastTime = t;
    }
  }

  seed(n?: number) {
    const count = n || Math.ceil((Math.random() * 7));

    for (let i = 0; i < count; i++) {
      this.objects.push(new Rocket(this.ctx, {
        alpha: 1,
        x: (this.width / 10) +  (Math.random() * (this.width / 1.2)) ,
        y: this.height,
        direction: -135 - ((Math.random() * 30) - 15) ,
        velocity: 0.3,
        decay: 0,
        gravity: Math.random() < 0.08 ? Math.random() * 4 : 0,
        color: 0,
      }))
    }
  }

  keepRunning() {
    const duration = Date.now() - this.startTime;

    /**
     * Stop when the duration has been reached.
     */
    if (this.fireworksDuration > 0 && duration > this.fireworksDuration) {
      return false;
    }

    return true;
  }

  clear() {
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fillRect(0,0,this.width, this.height);
  }

  private needsRedraw() {
    return this.objects.find(d => d.dirty);
  }
}