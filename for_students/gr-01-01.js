import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import * as T from "../libs/CS559-Three/build/three.module.js"
import { Fence } from "./objects/fence.js";
import { Game } from "./objects/game.js";
import { Grass } from "./objects/grass.js";
import { Grave } from "./objects/grave.js";
import { Ground } from "./objects/ground.js";
import { Particles } from "./objects/particles.js";
import { Player } from "./objects/player.js";
import { Tree } from "./objects/tree.js";
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

let game = new Game({ playerGroup: player, world: world });
world.add(game);

for (let i = 0; i < 10; i++) {
    let fence = new Fence();
    world.add(fence);
    fence.objects[0].position.set(50, 0, 50 - i * 10)
    fence.objects[0].rotateY(Math.PI / 2)
    fence.objects[0].scale.set(1.1, 1.1, 1.1);
}

for (let i = 0; i < 10; i++) {
    let fence = new Fence();
    world.add(fence);
    fence.objects[0].position.set(-50, 0, 50 - i * 10)
    fence.objects[0].rotateY(Math.PI / 2)
    fence.objects[0].scale.set(1.1, 1.1, 1.1);
}

for (let i = 0; i < 10; i++) {
    let fence = new Fence();
    world.add(fence);
    fence.objects[0].position.set(40 - i * 10, 0, 50)
    fence.objects[0].scale.set(1.1, 1.1, 1.1);
}

for (let i = 0; i < 10; i++) {
    let fence = new Fence();
    world.add(fence);
    fence.objects[0].position.set(40 - i * 10, 0, -50)
    fence.objects[0].scale.set(1.1, 1.1, 1.1);
}

for (let i = 0; i < 15; i++) {
    let grave = new Grave();
    world.add(grave);
    grave.objects[0].position.set(Math.random() * 96 - 48, 0, Math.random() * 96 - 48)
    grave.objects[0].rotateY(Math.random() * Math.PI * 2)
}

for (let i = 0; i < 15; i++) {
    let tree = new Tree();
    world.add(tree);
    tree.objects[0].position.set(Math.random() * 96 - 48, 0, Math.random() * 96 - 48)
    tree.objects[0].rotateY(Math.random() * Math.PI * 2)
    tree.objects[0].scale.set(2, 2, 2);
}

for (let i = 0; i < 100; i++) {
    let grass = new Grass();
    world.add(grass);
    grass.objects[0].position.set(Math.random() * 96 - 48, 0, Math.random() * 96 - 48)
    grass.objects[0].rotateY(Math.random() * Math.PI * 2)
    grass.objects[0].scale.set(1, 1, 1);
}

let particles = new Particles();
world.add(particles);

world.setActiveObject("Player")
world.ui = new WorldUI(world);
world.speedcontrol.value = 5;
world.go();

function translateObject(grObj, pos) {
    grObj.objects[0].translateX(pos.x || 0)
    grObj.objects[0].translateY(pos.y || 0)
    grObj.objects[0].translateZ(pos.z || 0)
}
