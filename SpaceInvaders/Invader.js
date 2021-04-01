"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Invader extends SpaceInvaders.QuadNode {
        constructor(_pos) {
            let scale = new ƒ.Vector2();
            scale.x = 12 / 13;
            scale.y = 8 / 13;
            super("Invader" + (++Invader.count), _pos, scale);
            this.addComponent(new ƒ.ComponentMaterial(Invader.material));
        }
    }
    Invader.material = new ƒ.Material("InvaderMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.5, 1, 0.1, 1)));
    Invader.count = 0;
    SpaceInvaders.Invader = Invader;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Invader.js.map