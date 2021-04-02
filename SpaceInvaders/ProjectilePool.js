"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class ProjectilePool extends ƒ.Node {
        constructor(_size) {
            super("ProjectilePool");
            this.inactiveProjectiles = new Array();
            for (let i = 0; i < _size; ++i) {
                let projectile = new SpaceInvaders.Projectile();
                projectile.onDeactivate = () => this.inactiveProjectiles.push(projectile);
                projectile.activate(false);
                this.addChild(projectile);
            }
        }
        fireProjectile(_pos, _dir) {
            this.inactiveProjectiles.pop()?.fire(_pos, _dir);
        }
    }
    SpaceInvaders.ProjectilePool = ProjectilePool;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=ProjectilePool.js.map