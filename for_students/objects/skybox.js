import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class SkyBox extends GrObject{
    constructor() {
        let mesh = new T.Mesh(
            new T.SphereGeometry(100, 100, 100),
            new T.MeshBasicMaterial({ 
                side: T.BackSide,
                color: "#5E5E5E",
            })
        );

        super("SkyBox", mesh)
    }
}