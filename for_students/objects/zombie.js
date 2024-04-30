import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { GLTFLoader } from "../../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Zombie by bachosoftdesign [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/xqEzosAVYX)
 */

/**
 * Animation List
 * 0 - Attack
 * 1 - Bite Ground
 * 2 - Crawl
 * 3 - Die Backwrads
 * 4 - Die Forward
 * 5 - Headbutt
 * 6 - Hit Reaction
 * 7 - Idle
 * 8 - Running Crawl
 * 9 - Scream
 * 10 - T-Pose
 * 11 - Walk
 * 12 - Walk2
 */
export class Zombie extends GrObject {
    constructor(params = {}) {
        let zombie = new T.Group();
        super("Zombie", zombie);

        this.zombie = zombie;
        this.player = params.player;
        this.action = null;
        this.isDead = false;

        const loader = new GLTFLoader();
        loader.load("./models/Zombie.glb", (obj) => {
            let zombie_mesh = obj.scene.children[0]
            zombie.add(zombie_mesh);

            // This code creates a mixer for the zombie and pulls the animations from the object and basically pastes it onto the zombie so that it can be animated.
            // Source: ChatGPT - our god and savior. I just slightly tweaked stuff to make it work
            this.actions = [];
            this.mixer = new T.AnimationMixer(zombie_mesh);
            obj.animations.forEach((clip, index) => {
                const action = this.mixer.clipAction(clip);
                action.repetitions = 1;
                this.actions[index] = action;
            });
            this.playAnimation(11)
        });
    }
    playAnimation(index) {
        this.action = this.actions[index]
        this.action?.reset();

        if (index == 11) this.zombie.translateZ(3)

        this.action?.play();

    }

    stopAnimation(index) {
        this.action?.stop();

    }
    stepWorld(delta, timeOfDay) {
        if (!this.mixer || !this.player?.player) return;

        // Rotate towards the player once the game starts
        this.zombie.lookAt(this.player.player.position);

        this.mixer.update(delta / 1000); // Update animation mixer

        // Check if the zombie gets hit by a bag
        this.player?.pillows.forEach(pillow => {
            if (distance(pillow.obj.position.x, pillow.obj.position.z, this.zombie.position.x, this.zombie.position.z) < 2) {
                this.stopAnimation(11);
                this.playAnimation(3)
            }
        });

        if (!this.action?.isRunning()) {
            this.playAnimation(11);
        }
    }
}

function distance(x1, z1, x2, z2) {
    let xDistance = x2 - x1;
    let zDistance = z2 - z1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(zDistance, 2));
}