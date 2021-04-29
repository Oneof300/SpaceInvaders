"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class MotherShip extends SpaceInvaders.QuadNode {
        constructor() {
            super("MotherShip", new ƒ.Vector2(75, 140), new ƒ.Vector2(16, 7));
            this.getComponent(ƒ.ComponentMaterial).material = MotherShip.mtr;
        }
        static get instance() {
            if (this._instance == null)
                this._instance = new MotherShip();
            return this._instance;
        }
    }
    MotherShip.color = new ƒ.Color(0.8, 0.1, 0.1, 1);
    MotherShip.texture = new ƒ.TextureImage("./Textures/MotherShip.png");
    MotherShip.coat = new ƒ.CoatTextured(MotherShip.color, MotherShip.texture);
    MotherShip.mtr = new ƒ.Material("ShipMat", ƒ.ShaderTexture, MotherShip.coat);
    SpaceInvaders.MotherShip = MotherShip;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=MotherShip.js.map