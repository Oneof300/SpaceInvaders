namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class ProjectilePool extends ƒ.Node {
    
      constructor(_size?: number) {  
        super("ProjectilePool");
        if (_size != undefined) {
          for (let i: number = 0; i < _size; ++i) {
            this.addChild(new Projectile());
          }
        }
      }

      get size(): number {
        return this.nChildren;
      }
      set size(_value: number) {
        if (this.nChildren > _value) this.removeAllChildren();
        while (this.nChildren < _value) {
          this.addChild(new Projectile());
        }
      }

      fireProjectile(_pos: ƒ.Vector2, _dir: number, _vel: number): void {
        (this.getChildren().find(p => !p.isActive) as Projectile)?.fire(_pos, _dir, _vel);
      }

      reset(): void {
        this.getChildren().forEach(projectile => projectile.activate(false));
      }
    }
  }