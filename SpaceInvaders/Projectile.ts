namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class Projectile extends QuadNode {
      static readonly color: ƒ.Color = new ƒ.Color(0.2, 0.8, 1, 1);
      private static count: number = 0;

      private readonly vel: number = 130 / 1000;
      private _dir: VerticalDirection;
  
      constructor() {  
        super("Projectile" + (++Projectile.count), ƒ.Vector2.ZERO(), new ƒ.Vector2(1, 5));
        this.getComponent(ƒ.ComponentMaterial).clrPrimary = Projectile.color;
        this.activate(false);

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, (_event) => this.update(_event));
      }

      get dir(): VerticalDirection {
        return this._dir;
      }

      fire(_pos: ƒ.Vector2, _dir: VerticalDirection): void {
        this.mtxLocal.translateX(_pos.x - this.mtxLocal.translation.x);
        this.mtxLocal.translateY(_pos.y - this.mtxLocal.translation.y);
        this._dir = _dir;
        this.activate(true);
      }

      protected onCollision(_other: CollidableNode): void {
        if (_other instanceof Invader || _other instanceof BarricadeStripe) {
          this.activate(false);
        }
        this.getComponent(ƒ.ComponentMaterial).clrPrimary = MotherShip.color;
      }

      private update(_event: Event): void {
        if (this.isActive) {
          this.getComponent(ƒ.ComponentMaterial).clrPrimary = Projectile.color;
          this.move();
          this.checkCollision();
        }
      }

      private move(): void {
        this.mtxLocal.translateY(this.dir * this.vel * ƒ.Loop.timeFrameReal);
        this.mtxWorld.translation = this.mtxLocal.translation;
        
        if (this.mtxLocal.translation.y > border.top || this.mtxLocal.translation.y < border.bottom) {
          this.activate(false);
        }
      }

      private checkCollision(): void {
        this.collides(InvaderWave.instance);
        this.collides(BarricadeFormation.instance);
      }
    }
  }