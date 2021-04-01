"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Projectile extends SpaceInvaders.QuadNode {
        constructor(_pos) {
            let scale = new ƒ.Vector2();
            scale.x = 1 / 13;
            scale.y = 5 / 13;
            super("Projectile" + (++Projectile.count), _pos, scale);
            this.addComponent(new ƒ.ComponentMaterial(Projectile.material));
        }
    }
    Projectile.material = new ƒ.Material("ProjectileMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    Projectile.count = 0;
    SpaceInvaders.Projectile = Projectile;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Projectile.js.map