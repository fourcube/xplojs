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
export declare class Particle implements Drawable {
    protected ctx: CanvasRenderingContext2D;
    protected config: ParticleConfig;
    protected age: number;
    constructor(ctx: CanvasRenderingContext2D, config: ParticleConfig);
    draw(): void;
    integrate(time: number): void;
    readonly dirty: boolean;
    readonly dead: boolean;
}
