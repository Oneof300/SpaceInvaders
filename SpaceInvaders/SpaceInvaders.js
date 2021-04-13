"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    SpaceInvaders.space = new ƒ.Node("Space");
    SpaceInvaders.border = new SpaceInvaders.Rectangle(new ƒ.Vector2(0, 78), new ƒ.Vector2(182, 182));
    let viewport = new ƒ.Viewport();
    window.addEventListener("load", init);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        console.log(SpaceInvaders.border);
        SpaceInvaders.space.addChild(SpaceInvaders.Ship.instance);
        SpaceInvaders.space.addChild(SpaceInvaders.MotherShip.instance);
        SpaceInvaders.space.addChild(SpaceInvaders.InvaderWave.createWave(new ƒ.Vector2(0, 100), 5, 11, 16));
        SpaceInvaders.space.addChild(SpaceInvaders.BarricadeFormation.createFormation(new ƒ.Vector2(0, 24.5), 4, 48));
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(234);
        cmpCamera.mtxPivot.translateY(77);
        cmpCamera.mtxPivot.rotateY(180);
        cmpCamera.mtxPivot.scaleX(1);
        console.log(cmpCamera);
        viewport.initialize("Viewport", SpaceInvaders.space, cmpCamera, canvas);
        viewport.draw();
        console.log(SpaceInvaders.space);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        viewport.draw();
    }
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=SpaceInvaders.js.map