"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class MotherShip extends SpaceInvaders.QuadNode {
        constructor() {
            super("MotherShip", new ƒ.Vector2(75, 140), new ƒ.Vector2(14, 7));
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = MotherShip.color;
        }
        static get instance() {
            if (this._instance == null)
                this._instance = new MotherShip();
            return this._instance;
        }
    }
    MotherShip.color = new ƒ.Color(0.8, 0.1, 0.1, 1);
    SpaceInvaders.MotherShip = MotherShip;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=MotherShip.js.map