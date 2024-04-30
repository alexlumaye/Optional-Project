import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

export class CarBG extends GrObject {
    constructor() {
        let geometry = new T.BufferGeometry();

        let map = new T.TextureLoader().load("./textures/Ice.jpg");
        let bumpMap = new T.TextureLoader().load("./textures/Ice_Gray.jpg");

        const vertices = [
            // Newly organized
            // Front top
            { pos: [-1, 1, 0] },
            { pos: [1, 1, 0] },
            { pos: [1, 1, -1] },

            { pos: [1, 1, -1] },
            { pos: [-1, 1, -1] },
            { pos: [-1, 1, 0] },

            // Window
            { pos: [-1, 1, -1] }, // 3
            { pos: [1, 1, -1] },
            { pos: [1, 2, -2] },

            { pos: [1, 2, -2] },
            { pos: [-1, 2, -2] },
            { pos: [-1, 1, -1] }, // 3

            // Window side left
            { pos: [1, 1, -1] },
            { pos: [1, 1, -2] }, // 6
            { pos: [1, 2, -2] },// 4

            // Window side right
            { pos: [-1, 1, -2] },
            { pos: [-1, 1, -1] }, // 3
            { pos: [-1, 2, -2] },

            // Roof
            { pos: [-1, 2, -2] },
            { pos: [1, 2, -2] },
            { pos: [1, 2, -4] },

            { pos: [1, 2, -4] },
            { pos: [-1, 2, -4] }, //9
            { pos: [-1, 2, -2] },

            // Roof left
            { pos: [1, 1, -2] }, // 6
            { pos: [1, 2, -4] },
            { pos: [1, 2, -2] },

            { pos: [1, 1, -2] }, // 6
            { pos: [1, 1, -4] },
            { pos: [1, 2, -4] },

            // Roof right
            { pos: [-1, 1, -2] }, // 7
            { pos: [-1, 2, -2] }, // 5
            { pos: [-1, 2, -4] }, // 9

            { pos: [-1, 1, -2] }, // 7
            { pos: [-1, 2, -4] }, // 9
            { pos: [-1, 1, -4] }, // 11

            // Roof back
            { pos: [-1, 1, -4] }, // 11
            { pos: [-1, 2, -4] }, // 9
            { pos: [1, 2, -4] }, // 8

            { pos: [1, 1, -4] }, // 10
            { pos: [-1, 1, -4] }, // 11
            { pos: [1, 2, -4] }, // 8

            // Front front
            { pos: [-1, 0.5, 0] }, // 12
            { pos: [1, 1, 0] }, // 1
            { pos: [-1, 1, 0] }, // 0

            { pos: [-1, 0.5, 0] }, // 12
            { pos: [1, 0.5, 0] }, // 13
            { pos: [1, 1, 0] }, // 1

            // Side left
            { pos: [1, 0.5, 0] }, // 13
            { pos: [1, 1, -1] }, // 2
            { pos: [1, 1, 0] }, // 1

            { pos: [1, 0.5, 0] }, // 13
            { pos: [1, 0.5, -1] }, // 14
            { pos: [1, 1, -1] }, // 2

            { pos: [1, 0.5, -1] }, // 14
            { pos: [1, 1, -2] }, // 6
            { pos: [1, 1, -1] }, // 2

            { pos: [1, 0.5, -1] }, // 14
            { pos: [1, 0.5, -2] }, // 15
            { pos: [1, 1, -2] }, // 6

            { pos: [1, 0.5, -2] }, // 15
            { pos: [1, 1, -4] }, // 10
            { pos: [1, 1, -2] }, // 6

            { pos: [1, 0.5, -2] }, // 15
            { pos: [1, 0.5, -4] },// 16
            { pos: [1, 1, -4] }, // 10

            // Side right
            { pos: [-1, 0.5, 0] }, // 12
            { pos: [-1, 1, 0] }, // 0
            { pos: [-1, 1, -1] }, // 3

            { pos: [-1, 0.5, -1] },// 17
            { pos: [-1, 0.5, 0] }, // 12
            { pos: [-1, 1, -1] }, // 3

            { pos: [-1, 0.5, -1] },// 17
            { pos: [-1, 1, -1] }, // 3
            { pos: [-1, 1, -2] }, // 7

            { pos: [-1, 0.5, -2] },// 18
            { pos: [-1, 0.5, -1] },// 17
            { pos: [-1, 1, -2] }, // 7

            { pos: [-1, 0.5, -2] },// 18
            { pos: [-1, 1, -2] }, // 7
            { pos: [-1, 1, -4] }, // 11

            { pos: [-1, 0.5, -4] },// 19
            { pos: [-1, 0.5, -2] },// 18
            { pos: [-1, 1, -4] }, // 11

            // Side back
            { pos: [1, 0.5, -4] },// 16
            { pos: [-1, 1, -4] }, // 11
            { pos: [1, 1, -4] }, // 10

            { pos: [1, 0.5, -4] },// 16
            { pos: [-1, 0.5, -4] },// 19
            { pos: [-1, 1, -4] }, // 11

            // Bottom
            { pos: [-1, 0.5, 0] }, // 12
            { pos: [1, 0.5, -1] }, // 14
            { pos: [1, 0.5, 0] }, // 13

            { pos: [-1, 0.5, 0] }, // 12
            { pos: [-1, 0.5, -1] },// 17
            { pos: [1, 0.5, -1] }, // 14

            { pos: [-1, 0.5, -1] },// 17
            { pos: [1, 0.5, -2] }, // 15
            { pos: [1, 0.5, -1] }, // 14

            { pos: [-1, 0.5, -1] },// 17
            { pos: [-1, 0.5, -2] },// 18
            { pos: [1, 0.5, -2] }, // 15

            { pos: [-1, 0.5, -2] },// 18
            { pos: [1, 0.5, -4] },// 16
            { pos: [1, 0.5, -2] }, // 15

            { pos: [-1, 0.5, -2] },// 18
            { pos: [-1, 0.5, -4] },// 19
            { pos: [1, 0.5, -4] },// 16

        ]

        let positions = vertices.flatMap(vertex => vertex.pos);
        // don't ask where we learn to call this "position" and "normal"
        // the only thing I can find is to read examples...
        geometry.setAttribute('position', new T.BufferAttribute(new Float32Array(positions), 3));

        // Let THREE do this for us
        geometry.computeVertexNormals();

        const uvs = new Float32Array([
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0, 1, 1,

        ]);

        geometry.setAttribute('uv', new T.BufferAttribute(uvs, 3));
        //@@Snippet:end

        // @@Snippet:texuse

        let material = new T.MeshStandardMaterial({
            map: map,
            bumpMap: bumpMap,
            bumpScale: 5,
            color: "#00FFFD",
            roughness: 0.3,
            metalness: 0.9,
            transparent: true,
            opacity: 0.95,
            envMapIntensity: 1,
            emissive: "#00FFFD",
            emissiveIntensity: 0.1,
        });

        let mesh = new T.Mesh(geometry, material);

        let wheel1 = createWheel();
        wheel1.rotateY(Math.PI / 2)
        wheel1.position.set(1, 0.5, -1.5);
        mesh.add(wheel1);

        let wheel2 = createWheel();
        wheel2.rotateY(Math.PI / 2)
        wheel2.position.set(1, 0.5, -3);
        mesh.add(wheel2);

        let wheel3 = createWheel();
        wheel3.rotateY(Math.PI / 2)
        wheel3.position.set(-1, 0.5, -3);
        mesh.add(wheel3);

        let wheel4 = createWheel();
        wheel4.rotateY(Math.PI / 2)
        wheel4.position.set(-1, 0.5, -1.5);
        mesh.add(wheel4);

        function createWheel() {
            let wheelGeometry = new T.TorusGeometry(0.2, 0.25)
            let wheelMaterial = new T.MeshStandardMaterial({
                color: "gray",
                roughness: 1,
            })
            let wheel = new T.Mesh(wheelGeometry, wheelMaterial);
            return wheel
        }

        // wheel
        mesh.scale.set(3, 3, 3);
        super("Car", [mesh]);
    }
}