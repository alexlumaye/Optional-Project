import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { GLTFLoader } from "../../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Graveyard Fence by Zsky [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/NwWy3Ba1N9)
 */
export class Fence extends GrObject {
    constructor(params = {}) {
        let group = new T.Group();
        super("Fence", group);

        new GLTFLoader().load("./models/Fence.glb", (obj) => {
            let mesh = obj.scene.children[0];

            let fence1 = mesh.clone();
            let fence2 = mesh.clone();
            group.add(fence1);
            group.add(fence2);
            fence2.scale.set(-1, 1, 1);
            fence2.position.x += 9.25;
        });
    }
}
