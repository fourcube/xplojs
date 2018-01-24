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

  constructor(selector: string) {

    this.el = document.querySelector(selector) as HTMLCanvasElement;
    if (!this.el.parentElement) {
      return;
    }

    this.el.width = this.el.parentElement.clientWidth * 2;
    this.el.height = this.el.parentElement.clientHeight * 2;

    this.width = this.el.width / 2
    this.height = this.el.height / 2;

    this.el.style.width = this.width + 'px';
    this.el.style.height = this.height + 'px';

    this.ctx = this.el.getContext('2d') as CanvasRenderingContext2D;

    this.objects.push(new Rocket(this.ctx, {
      alpha: 1,
      x: this.width / 2,
      y: this.height,
      direction: -135,
      velocity: 0.25,
      decay: 0,
      gravity: 0,
      color: 0,
    }))

    this.ctx.scale(2, 2);
    this.clear();
    this.render(0);
  }

  render(t: number) {
    const now = Date.now();
    requestAnimationFrame(this.render.bind(this));

    this.objects = this.objects.filter(o => {
     return !o.dead;
    });

    if (this.objects.filter(o => o instanceof Rocket).length < 1) {
      this.seed();
    }

    if (!this.needsRedraw()) {
      return;
    }

    if (now - this.lastLoop > (1 / this.fps) * 1000) {
      this.lastLoop = now;

      this.ctx.fillStyle = 'rgba(31, 127, 103, 0.09)'
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

  seed() {
    const count = Math.ceil((Math.random() * 10));

    for (let i = 0; i < count; i++) {
      this.objects.push(new Rocket(this.ctx, {
        alpha: 1,
        x: Math.random() * this.width,
        y: this.height,
        direction: (Math.random() * 60) - 180,
        velocity: 0.25,
        decay: 0,
        gravity: Math.random() < 0.08 ? Math.random() * 4 : 0,
        color: 0,
      }))
    }
  }

  clear() {
    this.ctx.fillStyle = '#1F7F67';
    this.ctx.fillRect(0,0,this.width, this.height);
  }

  private needsRedraw() {
    return this.objects.find(d => d.dirty);
  }
}