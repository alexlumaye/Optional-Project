import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { GLTFLoader } from "../../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

let pillow_mesh = null;

new GLTFLoader().load("./models/Pillow.glb", (obj) => {
    pillow_mesh = obj.scene.children[0]
    pillow_mesh.scale.set(10, 10, 10);
});

export class Pillow extends GrObject {
    constructor(params = {}) {
        super("Pillow", pillow_mesh.clone());
    }
}
