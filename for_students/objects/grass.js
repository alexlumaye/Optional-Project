import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { GLTFLoader } from "../../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Grass by Quaternius (https://poly.pizza/m/iw6l7gqcdQ)
 */
export class Grass extends GrObject {
    constructor(params = {}) {
        let group = new T.Group();
        super("Grass", group);

        new GLTFLoader().load("./models/Grass.glb", (obj) => {
            let mesh = obj.scene.children[0];
            group.add(mesh);
        });
    }
}
