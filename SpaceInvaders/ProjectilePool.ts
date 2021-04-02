namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class ProjectilePool extends ƒ.Node {
    
      constructor(_size: number) {  
        super("ProjectilePool");

        for (let i: number = 0; i < _size; ++i) {
          let projectile: Projectile = new Projectile();
          projectile.activate(false);
          this.addChild(projectile);
        }
      }

      fireProjectile(_pos: ƒ.Vector3, _dir: number): void {
        let inactiveProjectile: Projectile;

        // try to find an inactive projectile
        for (let projectile of this.getChildren()) {
          if (!projectile.isActive) {
            inactiveProjectile = <Projectile>projectile;
            break;
          }
        }

        if (inactiveProjectile != undefined) inactiveProjectile.fire(_pos, _dir);
      }
    }
  }