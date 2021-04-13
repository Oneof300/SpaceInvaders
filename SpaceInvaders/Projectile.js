"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Projectile extends SpaceInvaders.QuadNode {
        constructor() {
            super("Projectile" + (Projectile.count++), ƒ.Vector2.ZERO(), new ƒ.Vector2(1, 5));
            this.cmpMaterial = this.getComponent(ƒ.ComponentMaterial);
            this.activate(false);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, (_event) => this.update(_event));
        }
        get dir() {
            return this._dir;
        }
        fire(_pos, _dir, _vel) {
            this.mtxLocal.translateX(_pos.x - this.mtxWorld.translation.x);
            this.mtxLocal.translateY(_pos.y - this.mtxWorld.translation.y);
            this.cmpMaterial.clrPrimary = _dir > 0 ? Projectile.colorShip : Projectile.colorInvader;
            this.vel = _vel;
            this._dir = _dir;
            this.activate(true);
        }
        onCollision(_other) {
            if (_other instanceof SpaceInvaders.BarricadeStripe || _other instanceof SpaceInvaders.Invader || _other instanceof SpaceInvaders.Ship) {
                this.activate(false);
            }
            //this.cmpMaterial.clrPrimary = Projectile.colorCollision;
        }
        update(_event) {
            if (this.isActive) {
                //this.cmpMaterial.clrPrimary = this.dir > 0 ? Projectile.colorShip : Projectile.colorInvader;
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
            this.collides(SpaceInvaders.BarricadeFormation.instance);
            if (this.dir > 0)
                this.collides(SpaceInvaders.InvaderWave.instance);
            else
                this.collides(SpaceInvaders.Ship.instance);
        }
    }
    Projectile.colorShip = new ƒ.Color(0.2, 0.8, 1, 1);
    Projectile.colorInvader = new ƒ.Color(0, 1, 0.6, 1);
    Projectile.colorCollision = SpaceInvaders.MotherShip.color;
    Projectile.count = 0;
    SpaceInvaders.Projectile = Projectile;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Projectile.js.map