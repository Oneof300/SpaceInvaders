"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Projectile extends SpaceInvaders.QuadNode {
        constructor() {
            super("Projectile" + (++Projectile.count), ƒ.Vector2.ZERO(), new ƒ.Vector2(1 / 13, 5 / 13));
            this.vel = 7 / 1000;
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = Projectile.color;
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, (_event) => this.update(_event));
        }
        fire(_pos, _dir) {
            this.mtxLocal.translation = _pos;
            this.dir = _dir < 0 ? -1 : 1;
            this.activate(true);
        }
        activate(_on) {
            super.activate(_on);
            if (!_on)
                this.onDeactivate?.call(null);
        }
        update(_event) {
            if (this.isActive) {
                this.mtxLocal.translateY(this.dir * this.vel * ƒ.Loop.timeFrameReal);
                if (this.mtxLocal.translation.y > 13 || this.mtxLocal.translation.y < -1)
                    this.activate(false);
            }
        }
    }
    Projectile.color = new ƒ.Color(0.2, 0.8, 1, 1);
    Projectile.count = 0;
    SpaceInvaders.Projectile = Projectile;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Projectile.js.map