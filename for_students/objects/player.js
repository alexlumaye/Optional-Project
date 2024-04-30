import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { GLTFLoader } from "../../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";
import { Pillow } from "./pillow.js";

/**
 * Adventurer by Quaternius (https://poly.pizza/m/5EGWBMpuXq)
 */

/**
 * Animations
 * 0 - Death
 * 1 - Throw
 * 2 - Get Hit
 * 3 - Get Hit 2
 * 4 - Not moving
 * 16 - Run
 * 22 - Walk
 */

export class Player extends GrObject {
    constructor(params = {}) {
        let group = new T.Group();
        super("Player", group);

        this.dy = 0;
        this.group = group;
        this.action = null;
        this.actions = [];
        this.pillows = [];
        this.camera = params.camera;
        this.rotation = 0;

        const loader = new GLTFLoader();
        loader.load("./models/Adventurer.glb", (obj) => {
            let player_mesh = obj.scene.children[0]
            player_mesh.scale.set(2, 2, 2);
            this.player = player_mesh;
            group.add(player_mesh);

            this.mixer = new T.AnimationMixer(player_mesh);
            obj.animations.forEach((clip, index) => {
                const action = this.mixer.clipAction(clip);
                action.repetitions = 1;
                this.actions[index] = action;
            });
        });

        // Keypresses
        window.pressedKeys = {};
        window.addEventListener('keydown', (event) => {
            pressedKeys[event.code] = true;
        })
        window.addEventListener('keyup', (event) => {
            pressedKeys[event.code] = false;
        })
    }
    playAnimation(index) {
        this.action = this.actions[index]
        this.action?.reset();

        // Code here

        this.action?.play();

    }

    stopAnimation(index) {
        this.action?.stop();
    }

    stepWorld(delta, timeOfDay) {
        if (!this.player || !this.mixer) return;

        // Update player
        this.player.lookAt(new T.Vector3(this.camera.position.x, 0, this.camera.position.z));
        this.player.rotateY(Math.PI);
        this.dy -= delta / 1000
        this.player.position.y = Math.max(this.player.position.y + this.dy, 0);

        if (pressedKeys["KeyW"]) this.rotation = Math.PI * 2
        else if (pressedKeys["KeyS"]) this.rotation = -Math.PI
        else if (pressedKeys["KeyA"]) this.rotation = Math.PI / 2
        else if (pressedKeys["KeyD"]) this.rotation = -Math.PI / 2;
        this.player.rotateY(this.rotation);

        // Movement
        if (pressedKeys["KeyW"] || pressedKeys["KeyS"] || pressedKeys["KeyA"] || pressedKeys["KeyD"]) {
            this.player.translateZ(delta / 200);
            if (!this.action?.isRunning()) this.playAnimation(16);
        } else this.stopAnimation(16);

        if (pressedKeys["ShiftLeft"] && this.pillows.length != 1) {
            let pillow = new Pillow().objects[0];
            pillow.position.copy(this.player.position);
            pillow.position.y += 2;
            pillow.rotation.copy(this.player.rotation);
            this.pillows.push({
                obj: pillow,
                dx: 0,
                dy: 0.2,
                dz: 0,
            })
            this.group.add(pillow);
        }
        if (pressedKeys["Space"] && this.player.position.y == 0) {
            this.dy = 0.8;
        }

        // Update pillows
        this.pillows = this.pillows.filter(pillow => {
            pillow.dy -= delta / 2000
            pillow.obj.translateZ(delta / 50)
            pillow.obj.translateY(pillow.dy);

            if (pillow.obj.position.y < 0) {
                this.group.remove(pillow.obj);
                return false;
            }
            return true;
        })

        this.mixer.update(delta / 1000);
    }
}