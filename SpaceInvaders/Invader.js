"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Invader extends SpaceInvaders.QuadNode {
        constructor(_pos) {
            super("Invader" + (++Invader.count), _pos, new ƒ.Vector2(Invader.width, Invader.height));
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = Invader.color;
        }
    }
    Invader.color = new ƒ.Color(0, 0.6, 0.4, 1);
    Invader.width = 12;
    Invader.height = 8;
    Invader.count = 0;
    SpaceInvaders.Invader = Invader;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Invader.js.map