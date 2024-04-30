import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../../libs/CS559-Framework/shaderHelper.js";


export class CandyCane extends GrObject {
    constructor() {
        let candycane = new T.Group();
        super("CandyCane", candycane);

        let lines = false;
        // Shader
        let shaderMatPoll = shaderMaterial("./shaders/candycane.vs", "./shaders/candycane.fs", {
            side: T.DoubleSide,
            uniforms: {
                stripe_width: { value: 0.1 },
                stripe_color1: { value: new T.Vector3(1, 0, 0) },
                stripe_color2: { value: new T.Vector3(1, 1, 1) },
                use_yc: { value: !lines },
                time: { value: 0 }
            },
        });
        this.s1 = shaderMatPoll;

        let shaderMatTop = shaderMaterial("./shaders/candycane.vs", "./shaders/candycane.fs", {
            side: T.DoubleSide,
            uniforms: {
                stripe_width: { value: 0.1 },
                stripe_color1: { value: new T.Vector3(1, 0, 0) },
                stripe_color2: { value: new T.Vector3(1, 1, 1) },
                use_yc: { value: lines },
                time: { value: 5 }
            },
        });
        this.s2 = shaderMatTop;

        let poll = new T.Mesh(
            new T.CylinderGeometry(1, 1, 10),
            shaderMatPoll,
        )
        poll.position.y += 5;

        candycane.add(poll);

        let top = new T.Mesh(
            new T.TorusGeometry(3, 1, 50, 50, Math.PI),
            shaderMatTop,
        )

        poll.add(top);
        top.position.y += 5;
        top.position.x -= 3;
    }
    stepWorld(delta) {
        this.s1.uniforms.time.value += delta / 390;
        this.s2.uniforms.time.value += delta / 390;
    }
}