namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class ProjectilePool extends ƒ.Node {
      private inactiveProjectiles: Array<Projectile>;
  
      constructor(_size: number) {  
        super("ProjectilePool");

        this.inactiveProjectiles = new Array();

        for (let i: number = 0; i < _size; ++i) {
          let projectile: Projectile = new Projectile();
          projectile.onDeactivate = () => this.inactiveProjectiles.push(projectile);
          projectile.activate(false);
          this.addChild(projectile);
        }
      }

      fireProjectile(_pos: ƒ.Vector3, _dir: number): void {
        this.inactiveProjectiles.pop()?.fire(_pos, _dir);
      }
    }
  }