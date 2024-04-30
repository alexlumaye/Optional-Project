import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

let bumpMap = null;
let map = null;

export class Snowball extends GrObject {
    constructor(params = {}) {
        const SCALE = params.scale || 1;
        let mapLoader = new T.TextureLoader();
        map = mapLoader.load("./textures/Snow.png");
        
        let bumpMapLoader = new T.TextureLoader();
        bumpMap = bumpMapLoader.load("./textures/Snow_Gray.png");

        let snowball = new T.Mesh(
            new T.SphereGeometry(SCALE),
            new T.MeshStandardMaterial({
                map: map,
                bumpMap: bumpMap,
                bumpScale: 100,
                color: "white",
            }),
        )
        snowball.position.y += 1;

        super("Snowball", snowball);
    }
    stepWorld(delta, timeOfDay) {

    }
}
