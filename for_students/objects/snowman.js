import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { Snowball } from "./snowball.js";

export class Snowman extends GrObject {
    constructor(params = {}) {
        let snowman = new T.Group();
        // Snowman
        let snowmanBase = new Snowball({scale: 1}).objects[0]
        snowman.add(snowmanBase);

        let snowmanMiddle = new Snowball({scale: 0.75}).objects[0]
        snowmanMiddle.position.y += 0.5;
        snowmanBase.add(snowmanMiddle);

        let snowmanHead = new Snowball({scale: 0.5}).objects[0]
        snowmanHead.position.y += 0.2;
        snowmanMiddle.add(snowmanHead);

        // Nose
        let snowmanNose = new T.Mesh(
            new T.ConeGeometry(0.1, 0.8, 20, 20),
            new T.MeshStandardMaterial({ color: "orange" })
        )
        snowmanNose.position.z += 0.8;
        snowmanNose.rotateX(Math.PI / 2);
        snowmanHead.add(snowmanNose);

        // Eyes
        let snowmanEyeLeft = newCoalBall();
        snowmanEyeLeft.position.set(0.2, 0.2, 0.4)

        let snowmanEyeRight = newCoalBall();
        snowmanEyeRight.position.set(-0.2, 0.2, 0.4)

        snowmanHead.add(snowmanEyeLeft, snowmanEyeRight);

        // Mouth
        let snowmanMouth1 = newCoalBall();
        snowmanMouth1.position.set(-0.2, -0.1, 0.38)

        let snowmanMouth2 = newCoalBall();
        snowmanMouth2.position.set(-0.1, -0.18, 0.39)

        let snowmanMouth3 = newCoalBall();
        snowmanMouth3.position.set(0, -0.2, 0.39)

        let snowmanMouth4 = newCoalBall();
        snowmanMouth4.position.set(0.1, -0.18, 0.39)

        let snowmanMouth5 = newCoalBall();
        snowmanMouth5.position.set(0.2, -0.1, 0.38)

        snowmanHead.add(snowmanMouth1, snowmanMouth2, snowmanMouth3, snowmanMouth4, snowmanMouth5)

        // Hands
        let snowmanHandLeft = new T.Mesh(
            new T.CylinderGeometry(0.05, 0.05, 2, 20, 20),
            new T.MeshStandardMaterial({ color: "brown" })
        )

        snowmanHandLeft.rotateZ(-Math.PI / 2)
        snowmanHandLeft.position.x -= 0.8;
        snowmanMiddle.add(snowmanHandLeft);

        let snowmanHandRight = new T.Mesh(
            new T.CylinderGeometry(0.05, 0.05, 2, 20, 20),
            new T.MeshStandardMaterial({ color: "brown" })
        )
        snowmanHandRight.rotateZ(Math.PI / 2)
        snowmanHandRight.position.x += 0.8;
        snowmanMiddle.add(snowmanHandRight);

        function newCoalBall() {
            return new T.Mesh(
                new T.SphereGeometry(0.07, 20, 20),
                new T.MeshStandardMaterial({ color: "black" })
            );
        }

        super("Snowman", snowman);

        this.rideable = snowmanHead;
        this.snowman = snowman;
        this.head = snowmanHead;
        this.middle = snowmanMiddle
        this.base = snowmanBase
        this.arm_left = snowmanHandLeft
        this.arm_right = snowmanHandRight
        this.arm_direction = 1;
    }

    stepWorld(delta, timeOfDay) {
        // Rotate the snowman
        this.middle.rotateY(-delta / 500)

        // Move it around the map
        this.snowman.translateX(-95);
        this.snowman.rotateY(delta / 10000);
        this.snowman.translateX(95);

        // Move the arms
        if (this.arm_left.rotation.z > 2) this.arm_direction = -1;
        if (this.arm_left.rotation.z < 1) this.arm_direction = 1 
        this.arm_left.rotateZ(delta * this.arm_direction / 1000)
        this.arm_right.rotateZ(delta * this.arm_direction / 1000)
    }
}
