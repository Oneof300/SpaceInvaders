namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class Projectile extends QuadNode {
      static readonly color: ƒ.Color = new ƒ.Color(0.2, 0.8, 1, 1);
      private static count: number = 0;

      onDeactivate?: () => void;

      private readonly vel: number = 10 / 1000;
      private readonly borderTop: number = 13;
      private readonly borderBot: number = -1;
      private dir: number;
  
      constructor() {  
        super("Projectile" + (++Projectile.count), ƒ.Vector2.ZERO(), new ƒ.Vector2(1 / 13, 5 / 13));
        this.getComponent(ƒ.ComponentMaterial).clrPrimary = Projectile.color;

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, (_event) => this.update(_event));
      }

      fire(_pos: ƒ.Vector3, _dir: number): void {
        this.mtxLocal.translation = _pos;
        this.dir = _dir < 0 ? -1 : 1;
        this.activate(true);
      }

      activate(_on: boolean): void {
        super.activate(_on);
        if (!_on) this.onDeactivate?.call(null);
      }

      private update(_event: Event): void {
        if (this.isActive) {
          this.mtxLocal.translateY(this.dir * this.vel * ƒ.Loop.timeFrameReal);

          // deactivate projectile if it passes the borders
          if (this.mtxLocal.translation.y > this.borderTop || this.mtxLocal.translation.y < this.borderBot)
            this.activate(false);
        }
      }
    }
  }