import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { GLTFLoader } from "../../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Pair of shoes by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/3MskwjG-x4L)
 * Star by Quaternius (https://poly.pizza/m/Tyau1aS2r0)
 * Lightning Bolt by Jarlan Perez [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/7I1IhiE7O8s)
 */

let powerups = []

new GLTFLoader().load("./models/Speed.glb", (obj) => {
    let speed_mesh = obj.scene.children[0].children[0];
    powerups.push({
        mesh: speed_mesh,
        name: "Speed"
    })});
new GLTFLoader().load("./models/Points.glb", (obj) => {
    let points_mesh = obj.scene.children[0]
    powerups.push({
        mesh: points_mesh,
        name: "Points"
    })
});
new GLTFLoader().load("./models/Lightning.glb", (obj) => {
    let lightning_mesh = obj.scene.children[0]
    powerups.push({
        mesh: lightning_mesh,
        name: "Lightning"
    })});

export class Powerup extends GrObject {
    constructor(params = {}) {
        let rand = Math.floor(Math.random() * powerups.length);
        let mesh = powerups[rand].mesh.clone();
        let name = powerups[rand].name;

        super("Powerup", mesh);

        this.mesh = mesh;
        this.name = name
        this.game = params.game;
        this.toDelete = false;
    }
    stepWorld(delta) {
        this.mesh.rotateY(delta / 1000)

        // Check if the player is nearby
        let playerPos = this.game.playerGroup.player.position;
        if (distance(playerPos, this.mesh.position) < 2) {
            this.usePowerup();
        }
    }
    usePowerup() {
        switch(this.name) {
            case "Lightning": {
                this.game.zombies.forEach(zombie => {
                    this.game.group.remove(zombie.objects[0])
                    this.game.points += 10;
                })
                this.game.zombies = [];
                break;
            }
            case "Points": {
                this.game.points += 100;
                break;
            }
            case "Speed": {
                this.game.playerSpeedBoost += 60000;
                break;
            }
        }

        this.toDelete = true;
    }
}

function distance(pos1, pos2) {
    let xDistance = pos2.x - pos1.x
    let yDistance = pos2.y - pos1.y;
    let zDistance = pos2.z - pos1.z;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(zDistance, 2) + Math.pow(yDistance / 2, 2));
}