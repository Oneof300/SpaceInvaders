"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class ProjectilePool extends ƒ.Node {
        constructor(_size) {
            super("ProjectilePool");
            for (let i = 0; i < _size; ++i) {
                this.addChild(new SpaceInvaders.Projectile());
            }
        }
        fireProjectile(_pos, _dir) {
            this.getChildren().find(p => !p.isActive)?.fire(_pos, _dir);
        }
    }
    SpaceInvaders.ProjectilePool = ProjectilePool;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=ProjectilePool.js.map