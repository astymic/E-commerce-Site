export default function sketch(p) {
    let particles = [];
    let canvas;

    class Particle {
        constructor() {
            this.x = p.random(0, p.width);
            this.y = p.random(0, p.height);
            this.r = p.random(1, 4); // Radius
            this.xSpeed = p.random(-0.5, 0.5);
            this.ySpeed = p.random(-0.5, 0.5);
        }

        // Draw particle
        createParticle() {
            p.noStroke();
            p.fill('rgba(200, 200, 200, 0.5)')
            p.circle(this.x, this.y, this.r);
        }

        // Move the particle
        moveParticle() {
            if (this.x < 0 || this.x > p.width) this.xSpeed *= -1;
            if (this.x < 0 || this.x > p.height) this.ySpeed *= -1;
            this.x += this.xSpeed;
            this.y += this.ySpeed;
        }
    }

    p.setup = () => {
        const container = document.querySelector('.hero-banner');
        if (container) {
            canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);

            canvas.style('position', 'absolute');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '-1'); // Place canvas behind content
            
            canvas.parent(container); // Attach canvas to the hero-banner div

            for (let i = 0; i < p.width / 10; i++) {
                particles.push(new Particle());
            }
        }
    };

    p.draw = () => {
        if (!canvas) return;
        p.background('#007bff');
        for (let i = 0; i < particles.length; i++) {
            particles[i].createParticle();
            particles[i].moveParticle();
        }
    };

    p.windowResize = () => {
        const container = document.querySelector('.hero-banner');
        if (container) {
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        }
    };
}