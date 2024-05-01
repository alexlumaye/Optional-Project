import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class Particles extends GrObject {
    constructor(params = {}) {
        let particle = new T.Points(
            new T.BufferGeometry(),
            new T.PointsMaterial({
                color: "white",
                size: 0.01,
                transparent: true,
                opacity: 0.5,
            })
        )

        super("Particles", particle);

        this.particles = [];
        this.particle = particle;
    }

    stepWorld(delta, timeOfDay) {
        let particleCount = delta / 100; // Take into account speed so that none spawn at 0

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * 100 - 50,
                y: 0,
                z: Math.random() * 100 - 50
            })
        }

        this.particles = this.particles.filter(particle => {
            particle.y += delta / 1000;

            return particle.y < 50;
        })

        let bufferPositions = this.particles.flatMap(p => [p.x, p.y, p.z])

        this.particle.geometry.setAttribute('position', new T.Float32BufferAttribute(bufferPositions, 3))
        this.particle.geometry.attributes.position.needsUpdate = true;
    }
}
