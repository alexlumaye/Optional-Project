import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { GLTFLoader } from "../../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

export class Trees extends GrObject {
    constructor() {
        let group = new T.Group();

        super("Trees", group);

        const loader = new GLTFLoader();
        loader.load("./models/pine_trees.glb", function (obj) {
            let child = obj.scene.children[0]
            group.add(child);
        });
    }
}