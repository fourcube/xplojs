export default class Xplojs {
    private selector;
    private el;
    private ctx;
    private fps;
    private lastLoop;
    private lastTime;
    private objects;
    private width;
    private height;
    private startTime;
    /**
     * Maximal duration of fireworks in milliseconds;
     */
    fireworksDuration: number;
    constructor(selector: string | HTMLElement);
    reset(): void;
    render(t: number): void;
    seed(n?: number): void;
    keepRunning(): boolean;
    clear(): void;
    private needsRedraw();
}
