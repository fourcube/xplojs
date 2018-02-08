import { Particle, ParticleConfig } from "./particle";
export declare class Rocket extends Particle {
    age: number;
    constructor(ctx: CanvasRenderingContext2D, config: ParticleConfig);
    draw(): void;
    explode(force?: boolean): Particle[];
    integrate(time: number): void;
    destroy(): void;
}
