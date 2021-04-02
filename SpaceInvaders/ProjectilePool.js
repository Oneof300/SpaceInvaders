"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class ProjectilePool extends ƒ.Node {
        constructor(_size) {
            super("ProjectilePool");
            for (let i = 0; i < _size; ++i) {
                let projectile = new SpaceInvaders.Projectile();
                projectile.activate(false);
                this.addChild(projectile);
            }
        }
        fireProjectile(_pos, _dir) {
            let inactiveProjectile;
            // try to find an inactive projectile
            for (let projectile of this.getChildren()) {
                if (!projectile.isActive) {
                    inactiveProjectile = projectile;
                    break;
                }
            }
            if (inactiveProjectile != undefined)
                inactiveProjectile.fire(_pos, _dir);
        }
    }
    SpaceInvaders.ProjectilePool = ProjectilePool;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=ProjectilePool.js.map