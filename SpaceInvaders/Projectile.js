"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Projectile extends SpaceInvaders.QuadNode {
        constructor() {
            super("Projectile" + (++Projectile.count), ƒ.Vector2.ZERO(), new ƒ.Vector2(1, 5));
            this.vel = 130 / 1000;
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = Projectile.color;
            this.activate(false);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, (_event) => this.update(_event));
        }
        get dir() {
            return this._dir;
        }
        fire(_pos, _dir) {
            this.mtxLocal.translateX(_pos.x - this.mtxLocal.translation.x);
            this.mtxLocal.translateY(_pos.y - this.mtxLocal.translation.y);
            this._dir = _dir;
            this.activate(true);
        }
        onCollision(_other) {
            if (_other instanceof SpaceInvaders.Invader || _other instanceof SpaceInvaders.BarricadeStripe) {
                this.activate(false);
            }
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = SpaceInvaders.MotherShip.color;
        }
        update(_event) {
            if (this.isActive) {
                this.getComponent(ƒ.ComponentMaterial).clrPrimary = Projectile.color;
                this.move();
                this.checkCollision();
            }
        }
        move() {
            this.mtxLocal.translateY(this.dir * this.vel * ƒ.Loop.timeFrameReal);
            this.mtxWorld.translation = this.mtxLocal.translation;
            if (this.mtxLocal.translation.y > SpaceInvaders.border.top || this.mtxLocal.translation.y < SpaceInvaders.border.bottom) {
                this.activate(false);
            }
        }
        checkCollision() {
            this.collides(SpaceInvaders.InvaderWave.instance);
            this.collides(SpaceInvaders.BarricadeFormation.instance);
        }
    }
    Projectile.color = new ƒ.Color(0.2, 0.8, 1, 1);
    Projectile.count = 0;
    SpaceInvaders.Projectile = Projectile;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Projectile.js.map