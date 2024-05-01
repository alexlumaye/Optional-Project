import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { GLTFLoader } from "../../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Gravestone by Kay Lousberg (https://poly.pizza/m/lrEHKjTy29)
 */
export class Grave extends GrObject {
    constructor(params = {}) {
        let group = new T.Group();
        super("Grave", group);

        new GLTFLoader().load("./models/Grave.glb", (obj) => {
            let mesh = obj.scene.children[0];
            group.add(mesh);
        });
    }
}
