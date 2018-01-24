export interface Drawable {
  dirty: boolean;
  dead: boolean;
  integrate(time: number): void;
  draw(): void;
}