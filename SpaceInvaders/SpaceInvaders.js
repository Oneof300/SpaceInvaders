"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    let viewport = new ƒ.Viewport();
    window.addEventListener("load", init);
    let rect = new ƒ.Rectangle(0, 0, 10, 10);
    rect.right = rect.left + 10;
    console.log("bottom:", rect.bottom, "top:", rect.top, "left:", rect.left, "right:", rect.right);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        SpaceInvaders.Game.properties = new SpaceInvaders.GameProperties({
            ships: 3,
            ship: new SpaceInvaders.ShipProperties({
                velocity: 0.15,
                projectiles: 2,
                projectileVelocity: 0.15
            }),
            invaderWave: new SpaceInvaders.InvaderWaveProperties({
                startPosition: new ƒ.Vector2(0, 96),
                columns: 11,
                rows: 5,
                spacing: 16,
                velocityMax: 0.3,
                projectiles: 3,
                projectileVelocity: 0.05
            }),
            barricadeFormation: new SpaceInvaders.BarricadeFormationProperties({
                position: new ƒ.Vector2(0, 16),
                barricades: 4,
                spacing: 48
            })
        });
        SpaceInvaders.Space.addChild(SpaceInvaders.Ship.instance);
        SpaceInvaders.Space.addChild(SpaceInvaders.MotherShip.instance);
        SpaceInvaders.Space.addChild(SpaceInvaders.InvaderWave.instance);
        SpaceInvaders.Space.addChild(SpaceInvaders.BarricadeFormation.instance);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(234);
        cmpCamera.mtxPivot.translateY(77);
        cmpCamera.mtxPivot.rotateY(180);
        cmpCamera.mtxPivot.scaleX(1);
        console.log(cmpCamera);
        viewport.initialize("Viewport", SpaceInvaders.Space.node, cmpCamera, canvas);
        viewport.draw();
        console.log(SpaceInvaders.Space.node);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        viewport.draw();
    }
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=SpaceInvaders.js.map