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
        this.toDelete = false;
        this.opacity = 0;
        this.animationIndex = -1;

        const loader = new GLTFLoader();
        loader.load("./models/Zombie.glb", (obj) => {
            let zombie_mesh = obj.scene.children[0]
            zombie_mesh.children[1].material.transparent = true;
            zombie_mesh.children[1].material.opacity = 0;
            this.material = zombie_mesh.children[1].material
            this.material.transparent = true;
            this.material.opacity = 0;
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

        this.animationIndex = index;

        if (index == 11) this.zombie.translateZ(3)

        this.action?.play();

    }

    stopAnimation(index) {
        this.action?.stop();

    }
    stepWorld(delta, timeOfDay) {
        if (!this.mixer || !this.player?.player) return;

        this.material.opacity += 0.01

        // Rotate towards the player once the game starts
        this.zombie.lookAt(this.player.player.position);

        this.mixer.update(delta / 1000); // Update animation mixer

        // Check if the zombie gets hit by a bag
        this.player?.pillows.forEach(pillow => {
            if (this.isDead) return;
            if (distance(pillow.obj.position, this.zombie.position) < 2) {
                this.stopAnimation(11);
                this.playAnimation(3)
                this.isDead = true;
            }
        });

        if (!this.action?.isRunning()) {
            if (this.isDead) this.toDelete = true;

            // If the zombie touches the player then player is dead
            if (distance(this.player.player.position, this.zombie.position) < 2) {
                // Make sure the zombie isn't transparent as well so they dont get spawnkilled
                if (this.material.opacity > 1) {
                    this.player.dead = true;
                }
            }

            this.playAnimation(11);
        }
    }
}

function distance(pos1, pos2) {
    let xDistance = pos2.x - pos1.x
    let yDistance = pos2.y - pos1.y;
    let zDistance = pos2.z - pos1.z;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(zDistance, 2) + Math.pow(yDistance / 2, 2));
}