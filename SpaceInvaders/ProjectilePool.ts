namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class ProjectilePool extends ƒ.Node {
    
      constructor(_size: number) {  
        super("ProjectilePool");

        for (let i: number = 0; i < _size; ++i) {
          this.addChild(new Projectile());
        }
      }

      fireProjectile(_pos: ƒ.Vector2, _dir: VerticalDirection): void {
        (this.getChildren().find(p => !p.isActive) as Projectile)?.fire(_pos, _dir);
      }
    }
  }