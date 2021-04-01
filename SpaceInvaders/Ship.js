"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Ship extends SpaceInvaders.QuadNode {
        constructor() {
            let scale = new ƒ.Vector2();
            scale.x = 1;
            scale.y = 7 / 13;
            super("Ship", new ƒ.Vector2(), scale);
            this.addComponent(new ƒ.ComponentMaterial(Ship.material));
        }
        static getInstance() {
            if (this.instance == null)
                this.instance = new Ship();
            return this.instance;
        }
    }
    Ship.material = new ƒ.Material("ShipMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.3, 0.7, 1, 1)));
    SpaceInvaders.Ship = Ship;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Ship.js.map