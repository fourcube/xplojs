import { Drawable } from "./drawable";

export interface ParticleConfig {
  alpha: number;
  decay: number;
  color: number;
  direction: number;
  velocity: number;
  gravity: number;
  x: number;
  y: number;
}

export class Particle implements Drawable {
  protected age = 0;
  constructor (
    protected ctx: CanvasRenderingContext2D,
    protected config: ParticleConfig
  ) {}

  draw() {
    const ctx = this.ctx;
    const {x, y, direction, velocity} = this.config;

    const angle = Math.PI * direction / 180;

    ctx.fillStyle = `rgba(255, 255, 255, ${this.config.alpha})`;
    ctx.beginPath();
    ctx.ellipse(x, y, 3, 3, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  integrate(time: number) {
    const angle = Math.PI * this.config.direction / 180;
    const velocity = this.config.velocity * time;

    const x1 = velocity * Math.cos(angle) - velocity * Math.sin(angle);
    const y1 = velocity * Math.sin(angle) + velocity * Math.cos(angle);

    this.config.x += x1;
    this.config.y += y1;

    this.config.velocity *= 0.99;
    this.config.alpha -= time * this.config.decay * 0.05;

    if (Math.random() > 0.5) {
      this.config.direction -= this.config.gravity;
    } else {
      this.config.direction += this.config.gravity;
    }
  }

  get dirty() {
    return true;
  }

  get dead() {
    return this.config.alpha <= 0;
  }
}