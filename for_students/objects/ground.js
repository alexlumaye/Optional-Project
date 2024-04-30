import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class Ground extends GrObject {
    constructor(params = {}) {
        let ground = new T.Group();
        super("Ground", ground);

        let map = new T.TextureLoader().load("./textures/black_gravel.jpg");
        map.repeat.set(500, 500);
        map.wrapS = T.RepeatWrapping;
        map.wrapT = T.RepeatWrapping;

        let mesh = new T.Mesh(
            new T.PlaneGeometry(100, 100),
            new T.MeshStandardMaterial({
                map: map,
                bumpMap: map,
                bumpScale: 1000,
                color: "gray",
                side: T.DoubleSide
            })
        )

        mesh.rotateX(Math.PI / 2)
        ground.add(mesh);
    }
    stepWorld(delta, timeOfDay) {

    }
}
