import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { GLTFLoader } from "../../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";
import { Snowball } from "./snowball.js";

export class Child extends GrObject {
    constructor() {
        let group = new T.Group();
        let rideableObj = new T.Object3D();

        super("Child", group);

        const loader = new GLTFLoader();
        loader.load("./models/child.glb", function (obj) {
            let child = obj.scene.children[0]
            group.add(child);
        });

        group.add(rideableObj);
        rideableObj.position.set(1, 3, 1);
        this.child_dy = 0;
        this.lastSnowball = 0;
        this.time = 0;
        this.group = group;
        this.snowballs = [];
        this.rideable = rideableObj;
    }

    stepWorld(delta, timeOfDay) {
        let child = this.group.children[1];
        // Throw a snowball every 3 seconds
        this.time += delta + Math.random();
        let currentTime = Math.floor(this.time / 5000)

        if (this.lastSnowball != currentTime) {
            this.child_dy = 200;
            this.lastSnowball = currentTime

            let snowball = new Snowball({ scale: 0.5 }).objects[0];
            snowball.position.y += 0.5;
            this.snowballs.push({
                obj: snowball,
                dy: Math.random() * 230 + 300,
            })
            
            this.group.add(snowball)
        }

        this.child_dy -= delta
        if (child) child.position.y = Math.max(child.position.y + this.child_dy * delta / 10000, 0);

        this.snowballs = this.snowballs.filter(snowball => {
            snowball.obj.translateZ(delta / 60);
            snowball.dy -= delta
            snowball.obj.translateY(snowball.dy * delta / 10000)

            if (snowball.obj.position.y < 0) {
                this.group.remove(snowball.obj);

                return false;
            }
            return true;
        })
    }
}