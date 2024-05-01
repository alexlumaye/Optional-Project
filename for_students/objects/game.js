import * as T from "../../libs/CS559-Three/build/three.module.js"
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { Zombie } from "./zombie.js";
import { Powerup } from "./powerup.js";

export class Game extends GrObject {
    constructor(params = {}) {
        let group = new T.Group();
        super("Game", group);

        this.world = params.world;
        this.group = group;
        this.zombies = [];
        this.powerups = [];
        this.time = 0;
        this.lastSpawn = 0;
        this.playerGroup = params.playerGroup;
        this.points = 0;
        this.playerSpeedBoost = 0;
    }

    stepWorld(delta, timeOfDay) {
        this.world.orbit_controls.target = this.playerGroup?.player?.position || new T.Vector3(0, 0, 0);
        this.time += delta;

        // Check if the player is dead and end the game
        if (this.playerGroup?.dead) {
            this.zombies.forEach(zombie => this.group.remove(zombie.objects[0]))
            this.powerups.forEach(powerup => this.group.remove(powerup.objects[0]))
            if (this.zombies.length > 0) {
                this.world.camera.position.copy(this.playerGroup?.player?.position);
                this.world.camera.position.y += 30;
            }

            this.zombies = [];
            this.powerups = [];

            this.world.orbit_controls.target = new T.Vector3(0, -100000, 0);
            this.world.camera.position.y -= delta / 1000;
            return;
        }

        // Spawn new zombies
        if (this.time - this.lastSpawn > (10000 - Math.min(this.points*2, 7000))) {
            this.lastSpawn = this.time;
            let zombie = new Zombie({ player: this.playerGroup });
            zombie.objects[0].position.set(Math.random() * 100 - 50, 0, Math.random() * 100 - 50)
            this.group.add(zombie.objects[0]);
            this.zombies.push(zombie);
        }

        // Update and remove zombies
        this.zombies = this.zombies.filter(zombie => {
            zombie.stepWorld(delta + delta * this.points / 1000);

            if (zombie.toDelete) {
                this.group.remove(zombie.objects[0])
                this.points += 10;
                document.getElementById("Points").textContent = "Points: " + this.points;
                
                // 1 in 15 chance to spawn a powerup
                if (Math.floor(Math.random() * 15) == 1) {
                    let powerup = new Powerup({ game: this });
                    powerup.objects[0].position.copy(zombie.objects[0].position);
                    powerup.objects[0].position.y += 3;
                    this.group.add(powerup.objects[0]);
                    this.powerups.push(powerup);
                }

                return false;
            }

            return true;
        })

        // Update and remove powerups
        this.powerups = this.powerups.filter((powerup, index) => {
            powerup.stepWorld(delta);

            if (powerup.toDelete) {
                document.getElementById("Points").textContent = "Points: " + this.points;
                this.group.remove(powerup.objects[0])
                return false;
            }
            return true;
        })

        // Call player again so they go x2 as fast if speedboost is active
        if (this.playerSpeedBoost > 0) {
            this.playerSpeedBoost -= delta;
            this.playerGroup.stepWorld(delta);
        }
    }
}
