import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { GLTFLoader } from "../../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Dead Tree Trunk by Zsky [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/HdJ7JoEvKR)
 */
export class Tree extends GrObject {
    constructor(params = {}) {
        let group = new T.Group();
        super("Tree", group);

        new GLTFLoader().load("./models/Tree.glb", (obj) => {
            let mesh = obj.scene.children[0];
            group.add(mesh);
        });
    }
}
