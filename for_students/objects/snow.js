import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class Snow extends GrObject {
    constructor(params = {}) {
        let snow = new T.Points(
            new T.BufferGeometry(),
            new T.PointsMaterial({
                color: "white",
                size: 0.02,
                transparent: true,
            })
        )

        super("Snow", snow);

        this.snowParticles = [];
        this.snow = snow;
    }

    stepWorld(delta, timeOfDay) {
        let newSnowCount = delta / 10; // Take into account speed so that none spawn at 0

        for (let i = 0; i < newSnowCount; i++) {
            this.snowParticles.push({
                x: Math.random() * 200 - 100,
                y: Math.random() * 15 + 30,
                z: Math.random() * 200 - 100
            })
        }

        this.snowParticles = this.snowParticles.filter(particle => {
            particle.y -= delta / 100;

            return particle.y > -50;
        })

        let bufferPositions = this.snowParticles.flatMap(p => [p.x, p.y, p.z])

        this.snow.geometry.setAttribute('position', new T.Float32BufferAttribute(bufferPositions, 3))
        this.snow.geometry.attributes.position.needsUpdate = true;
    }
}
