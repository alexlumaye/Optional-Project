import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class House extends GrObject {
    constructor() {
        let group = new T.Group();
        let geometry2 = new T.BufferGeometry();

        const vertices2 = [
            // Front Face
            { pos: [0, 0, 0], uv: [0, 0] },
            { pos: [1, 0, 0], uv: [1 / 2, 0] },
            { pos: [1, 1, 0], uv: [1 / 2, 1] },

            { pos: [1, 1, 0], uv: [1 / 2, 1] },
            { pos: [0, 1, 0], uv: [0, 1] },
            { pos: [0, 0, 0], uv: [0, 0] },

            // Right Face
            { pos: [1, 0, 0], uv: [1 / 2, 0] },
            { pos: [1, 0, -1], uv: [1, 0] },
            { pos: [1, 1, -1], uv: [1, 1] },

            { pos: [1, 1, -1], uv: [1, 1] },
            { pos: [1, 1, 0], uv: [1 / 2, 1] },
            { pos: [1, 0, 0], uv: [1 / 2, 0] },

            // Back face
            { pos: [1, 0, -1], uv: [1 / 2, 0] },
            { pos: [0, 0, -1], uv: [1, 0] },
            { pos: [0, 1, -1], uv: [1, 1] },

            { pos: [0, 1, -1], uv: [1, 1] },
            { pos: [1, 1, -1], uv: [1 / 2, 1] },
            { pos: [1, 0, -1], uv: [1 / 2, 0] },

            // Left face
            { pos: [0, 0, -1], uv: [1 / 2, 0] },
            { pos: [0, 0, 0], uv: [1, 0] },
            { pos: [0, 1, 0], uv: [1, 1] },

            { pos: [0, 1, 0], uv: [1, 1] },
            { pos: [0, 1, -1], uv: [1 / 2, 1] },
            { pos: [0, 0, -1], uv: [1 / 2, 0] },

            // Top face
            { pos: [0, 1, 0] },
            { pos: [1, 1, 0] },
            { pos: [1, 1, -1] },

            { pos: [1, 1, -1] },
            { pos: [0, 1, -1] },
            { pos: [0, 1, 0] },

            // Bottom face
            { pos: [0, 0, -1] },
            { pos: [1, 0, -1] },
            { pos: [1, 0, 0] },

            { pos: [1, 0, 0] },
            { pos: [0, 0, 0] },
            { pos: [0, 0, -1] },
        ];

        let positions2 = vertices2.map(vertex => vertex.pos).flat();
        let norms2 = vertices2.map(vertex => vertex.norm).flat();
        let uvs2 = vertices2.map(vertex => vertex.uv).flat();

        geometry2.setAttribute('position', new T.BufferAttribute(new Float32Array(positions2), 3));
        geometry2.setAttribute('uv', new T.BufferAttribute(new Float32Array(uvs2), 2));
        geometry2.setAttribute('normal', new T.BufferAttribute(new Float32Array(norms2), 3));

        let tl2 = new T.TextureLoader().load("./textures/wall.jpg");

        // load the texture and assign it to the material
        let material2 = new T.MeshStandardMaterial({
            roughness: 0.75,
            map: tl2,
            bumpMap: tl2,
            bumpScale: 50,
        });

        let base = new T.Mesh(geometry2, material2);
        base.translateX(-0.5);
        base.translateZ(0.5);
        base.scale.set(10, 10, 10);
        group.add(base);

        let geometry = new T.BufferGeometry();
        const vertices = [
            // Front top
            { pos: [0, 1, 0], uv: [0, 0] },
            { pos: [1, 1, 0], uv: [1 / 3, 0] },
            { pos: [.5, 2, -.5], uv: [1 / 3, 1] },

            // Right top
            { pos: [1, 1, 0], uv: [0, 0] },
            { pos: [1, 1, -1], uv: [1 / 3, 0] },
            { pos: [.5, 2, -0.5], uv: [1 / 3, 1] },

            // Back top
            { pos: [1, 1, -1], uv: [0, 0] },
            { pos: [0, 1, -1], uv: [1 / 3, 0] },
            { pos: [.5, 2, -.5], uv: [1 / 3, 1] },

            // Left top
            { pos: [0, 1, -1], uv: [0, 0] },
            { pos: [0, 1, 0], uv: [1 / 3, 0] },
            { pos: [.5, 2, -0.5], uv: [1 / 3, 1] },
        ]

        let positions = vertices.map(vertex => vertex.pos).flat();
        let norms = vertices.map(vertex => vertex.norm).flat();
        let uvs = vertices.map(vertex => vertex.uv).flat();

        geometry.setAttribute('position', new T.BufferAttribute(new Float32Array(positions), 3));
        geometry.setAttribute('uv', new T.BufferAttribute(new Float32Array(uvs), 2));
        geometry.setAttribute('normal', new T.BufferAttribute(new Float32Array(norms), 3));

        let tl = new T.TextureLoader().load("./textures/roof.jpg");

        // load the texture and assign it to the material
        let material = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.75,
            map: tl,
            bumpMap: tl,
            bumpScale: 3,
        });

        let roof = new T.Mesh(geometry, material);
        base.add(roof);

        base.rotateY(Math.random() * 2 * Math.PI)

        super("House", [group]);
    }
}