"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class MotherShip extends SpaceInvaders.QuadNode {
        constructor() {
            let pos = new ƒ.Vector2();
            pos.x = 75 / 13;
            pos.y = 140 / 13;
            let scale = new ƒ.Vector2();
            scale.x = 14 / 13;
            scale.y = 7 / 13;
            super("MotherShip", pos, scale);
            this.addComponent(new ƒ.ComponentMaterial(MotherShip.material));
        }
        static getInstance() {
            if (this.instance == null)
                this.instance = new MotherShip();
            return this.instance;
        }
    }
    MotherShip.material = new ƒ.Material("MotherShipMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0.2, 0.2, 1)));
    SpaceInvaders.MotherShip = MotherShip;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=MotherShip.js.map