import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

let bumpMap = null;
let map = null;

export class Snowfort extends GrObject {
    constructor(params = {}) {
        const SCALE = params.scale || 1;
        let mapLoader = new T.TextureLoader();
        map = mapLoader.load("./textures/Snow.png");
        
        let bumpMapLoader = new T.TextureLoader();
        bumpMap = bumpMapLoader.load("./textures/Snow_Gray.png");

        let snowfort = new T.Mesh(
            new T.BoxGeometry(4, 2, 1),
            new T.MeshStandardMaterial({
                map: map,
                bumpMap: bumpMap,
                bumpScale: 100,
                color: "white",
            }),
        )

        snowfort.position.y += 1;
        super("Snowfort", snowfort);
    }
    stepWorld(delta, timeOfDay) {
    }
}
