interface Point {
    x: number;
    y: number;
}

class CoordinatePlotter {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private xInput: HTMLInputElement;
    private yInput: HTMLInputElement;

    constructor() {
        this.initializeElements();
        this.setupCanvas();
        this.setupEventListeners();
    }

    private initializeElements(): void {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (!this.canvas) {
            throw new Error('Canvas element not found');
        }

        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get canvas context');
        }
        this.ctx = context;

        this.xInput = document.getElementById('xCoord') as HTMLInputElement;
        this.yInput = document.getElementById('yCoord') as HTMLInputElement;
        if (!this.xInput || !this.yInput) {
            throw new Error('Input elements not found');
        }
    }

    private setupCanvas(): void {
        this.resizeCanvas();
    }

    private setupEventListeners(): void {
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    private resizeCanvas(): void {
        this.canvas.width = window.innerWidth - 40; 
        this.canvas.height = window.innerHeight - 100;
    }

    private getRandomColor(): string {
        const letters: string = '0123456789ABCDEF';
        let color: string = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    public plotPoint(): void {
        const x = parseFloat(this.xInput.value);
        const y = parseFloat(this.yInput.value);

        if (isNaN(x) || isNaN(y)) {
            alert('Please enter valid coordinates');
            return;
        }

        const point: Point = { x, y };
        const pointColor = this.getRandomColor();

        this.drawPoint(point, pointColor);
        this.drawCoordinatesText(point, pointColor);
        this.clearInputs();
    }

    private drawPoint(point: Point, color: string): void {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    private drawCoordinatesText(point: Point, color: string): void {
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = color;
        this.ctx.fillText(`(${point.x}, ${point.y})`, point.x + 8, point.y - 8);
    }

    private clearInputs(): void {
        this.xInput.value = '';
        this.yInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const plotter = new CoordinatePlotter();
    
    const plotButton = document.getElementById('plotButton');
    if (plotButton) {
        plotButton.addEventListener('click', () => plotter.plotPoint());
    }
});
