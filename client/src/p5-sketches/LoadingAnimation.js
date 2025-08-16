export default function loader(p) {
    let time = 0;
    let particles = [];
    let numParticles = 9;

    p.setup = () => {
        p.createCanvas(80, 80);

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                angle: (p.TWO_PI / numParticles) * i,
                radius: 25,
                size: 0,
                delay: i * 0.2
            });
        }
    };

    p.draw = () => {
        p.background(255, 0);
        p.translate(p.width / 2, p.height / 2);

        // Outer rotating ring
        p.push();
        p.rotate(time * 0.02);
        p.strokeWeight(2);
        p.stroke(0, 123, 255, 100);
        p.noFill();
        p.circle(0, 0, 60);
        p.pop();

        // Inner pulsing circle
        let pulse = p.sin(time * 0.1) * 5 + 15;
        p.fill(0, 123, 255, 50);
        p.noStroke();
        p.circle(0, 0, pulse);

        // Animated particles
        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];

            // Calculate position with wave motion
            let waveOffset = p.sin(time * 0.05 + particle.delay) * 8;
            let x = p.cos(particle.angle + time * 0.03) * (particle.radius + waveOffset);
            let y = p.sin(particle.angle + time * 0.03) * (particle.radius + waveOffset);
            
            // Animate particle size
            let sizeWave = p.sin(time * 0.08 + particle.delay * 2) * 0.5 + 0.5;
            particle.size = sizeWave * 6 + 2;

            // Color based on position and time
            let colorPhase = (time * 0.02 + particle.delay) % p.TWO_PI;
            let r = p.sin(colorPhase) * 50 + 100;
            let g = p.sin(colorPhase + p.TWO_PI/3) * 50 + 150;
            let b = p.sin(colorPhase + 2*p.TWO_PI/3) * 50 + 200;

            p.fill(r, g, b, 200);
            p.noStroke();
            p.circle(x, y, particle.size);

            // Add glow effect
            p.fill(r, g, b, 50);
            p.circle(x, y, particle.size * 2);
        }

        // Central spinning elements
        p.push();
        p.rotate(-time * 0.04);
        for (let i = 0; i < 3; i++) {
            p.push();
            p.rotate((p.TWO_PI / 3) * i);
            p.strokeWeight(2);
            p.stroke(0, 150, 255, 150);
            p.line(0, -8, 0, -3);
            p.pop();
        }
        p.pop();

        time++;
    };
}