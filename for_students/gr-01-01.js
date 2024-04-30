import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import * as T from "../libs/CS559-Three/build/three.module.js"
import { Ground } from "./objects/ground.js";
import { Player } from "./objects/player.js";
import { Zombie } from "./objects/zombie.js";

let world = new GrWorld({
    width: 800,
    height: 600,
    groundplane: false,
    ambient: 2,
    lookfrom: new T.Vector3(0, 10, -20),
});

let ground = new Ground();
world.add(ground);

let player = new Player({ camera: world.camera });
world.add(player);

let zombie = new Zombie({ player: player });
world.add(zombie);

world.ui = new WorldUI(world);
world.speedcontrol.value = 5;
world.go();

function translateObject(grObj, pos) {
    grObj.objects[0].translateX(pos.x || 0)
    grObj.objects[0].translateY(pos.y || 0)
    grObj.objects[0].translateZ(pos.z || 0)
}
