import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import { Snowman } from "./objects/snowman.js";
import { Snow } from "./objects/snow.js";
import { Snowfort } from "./objects/snowfort.js";
import { SkyBox } from "./objects/skybox.js";
import { Child } from "./objects/child.js";
import { CandyCane } from "./objects/candycane.js";
import { CarBG } from "./objects/car.js";
import { Trees } from "./objects/trees.js";
import { House } from "./objects/house.js";

/**
 * Credits to https://www.textures.com/search?q= and https://polyhaven.com/ for my images and used things.
 * Credits to Quaternias https://poly.pizza/m/DgOCW9ZCRJ for the Child model.
 * Credits to Quaternias https://poly.pizza/m/oYtDty0fR6 for the tree model.
 */

let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 100,
    groundplanecolor: "white",
    ambient: 2,
});

function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}

let snowman = new Snowman();
translateObject(snowman, {x: 95, z: 0})
snowman.highlighted = true;
world.add(snowman);

let snow = new Snow();
world.add(snow);

let child = new Child();
translateObject(child, {x: 4, z: 3})
world.add(child);

let snowfort = new Snowfort();
translateObject(snowfort, {x: 4, z: 4})
world.add(snowfort);

let child2 = new Child();
translateObject(child2, {x: 4, z: 15 })
child2.objects[0].rotateY(Math.PI);
child2.highlighted = true;
world.add(child2);

let snowfort2 = new Snowfort();
translateObject(snowfort2, {x: 4, z: 14 })
world.add(snowfort2);

let skybox = new SkyBox();
world.add(skybox);

let candyCane = new CandyCane();
candyCane.setPos(45, 0, 10);
candyCane.objects[0].rotateY(Math.random() * Math.PI * 2)
candyCane.highlighted = true;
world.add(candyCane);

let candyCane2 = new CandyCane();
candyCane2.setPos(0, 0, 30);
candyCane2.objects[0].rotateY(Math.random() * Math.PI * 2)
world.add(candyCane2);

let candyCane3 = new CandyCane();
candyCane3.setPos(10, 0, 60);
candyCane3.objects[0].rotateY(Math.random() * Math.PI * 2)
world.add(candyCane3);

let candyCane4 = new CandyCane();
candyCane4.setPos(-10, 0, -60);
candyCane4.objects[0].rotateY(Math.random() * Math.PI * 2)
world.add(candyCane4);

let candyCane5 = new CandyCane();
candyCane5.setPos(-45, 0, -10);
candyCane5.objects[0].rotateY(Math.random() * Math.PI * 2)
world.add(candyCane5);

let car = new CarBG();
translateObject(car, { x: -6, z: 3})
car.highlighted = true;
world.add(car);

let trees = new Trees();
trees.setScale(30, 30, 30);
trees.setPos(-45, 0, -45);
world.add(trees);

let trees2 = new Trees();
trees2.setScale(30, 30, 30);
trees2.setPos(45, 0, 45);
world.add(trees2);

let house = new House();
translateObject(house, {x: -45, z: 10})
house.highlighted = true;
world.add(house);

let house2 = new House();
translateObject(house2, {x: -65, z: 3})
world.add(house2);

let house3 = new House();
translateObject(house3, {x: -60, z: 30})
world.add(house3)

let house4 = new House();
translateObject(house4, {x: -40, z: 40})
world.add(house4);

let house5 = new House();
translateObject(house5, {x: 45, z: -10})
world.add(house5);

let house6 = new House();
translateObject(house6, {x: 65, z: -3})
world.add(house6);

let house7 = new House();
translateObject(house7, {x: 60, z: -30})
world.add(house7)

let house8 = new House();
translateObject(house8, {x: 40, z: -40})
world.add(house8);

world.ui = new WorldUI(world);
world.go();

function translateObject(grObj, pos) {
    grObj.objects[0].translateX(pos.x || 0)
    grObj.objects[0].translateY(pos.y || 0)
    grObj.objects[0].translateZ(pos.z || 0)
}
