import { Particle, ParticleConfig } from "./particle";

export class Rocket extends Particle {
  age = 0;

  constructor (
    ctx: CanvasRenderingContext2D,
    config: ParticleConfig
  ) {
    super(ctx, config);
  }

  draw() {
    const ctx = this.ctx;
    const {x, y, direction, velocity} = this.config;

    const angle = Math.PI * (direction + 135) / 180;

    ctx.fillStyle = `rgba(255, 255, 255, ${this.config.alpha})`;
    ctx.beginPath();
    ctx.ellipse(x, y, 1, 10, angle, 0, Math.PI * 2);
    ctx.fill();
  }

  explode(force = false): Particle[] {
    if (this.age < 5000) {
      if (this.config.y > this.ctx.canvas.height / 5) {
        return [];
      }

      if (Math.random() > 0.03) {
        return [];
      }
    }

    const particleCount = 170 + (Math.random() * 400);
    const particles: Particle[] = [];

    for(let i=0;i<particleCount;i++) {
      const newConfig = Object.assign({}, this.config);

      newConfig.direction = (Math.random() * 360) - 180;
      newConfig.velocity = newConfig.velocity * (Math.random() * 1.9);
      newConfig.alpha = Math.random();
      newConfig.decay = Math.max(Math.random() * 0.10, 0.008);
      newConfig.gravity = Math.random() < 0.1 ? Math.random() * 10 : 0;

      particles.push(new Particle(this.ctx, newConfig));
    }

    this.destroy();
    return particles;
  }

  integrate(time: number) {

    super.integrate(time);
    this.age += time;
  }

  destroy() {
    this.config.alpha = 0;
  }
}