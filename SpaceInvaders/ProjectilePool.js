"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class ProjectilePool extends ƒ.Node {
        constructor(_size) {
            super("ProjectilePool");
            if (_size != undefined) {
                for (let i = 0; i < _size; ++i) {
                    this.addChild(new SpaceInvaders.Projectile());
                }
            }
        }
        get size() {
            return this.nChildren;
        }
        set size(_value) {
            if (this.nChildren > _value)
                this.removeAllChildren();
            while (this.nChildren < _value) {
                this.addChild(new SpaceInvaders.Projectile());
            }
        }
        fireProjectile(_pos, _dir, _vel) {
            this.getChildren().find(p => !p.isActive)?.fire(_pos, _dir, _vel);
        }
        reset() {
            this.getChildren().forEach(projectile => projectile.activate(false));
        }
    }
    SpaceInvaders.ProjectilePool = ProjectilePool;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=ProjectilePool.js.map