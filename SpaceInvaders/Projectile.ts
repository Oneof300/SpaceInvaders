namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class Projectile extends QuadNode {
      static readonly colorShip: ƒ.Color = new ƒ.Color(0.2, 0.8, 1, 1);
      static readonly colorInvader: ƒ.Color = new ƒ.Color(0, 1, 0.6, 1);
      static readonly colorCollision: ƒ.Color = MotherShip.color;
      private static count: number = 0;

      private vel: number;
      private _dir: number;
      private cmpMaterial: ƒ.ComponentMaterial = this.getComponent(ƒ.ComponentMaterial);
  
      constructor() {  
        super("Projectile" + (Projectile.count++), ƒ.Vector2.ZERO(), new ƒ.Vector2(1, 5));
        this.activate(false);

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, (_event) => this.update(_event));
      }

      get dir(): VerticalDirection {
        return this._dir;
      }

      fire(_pos: ƒ.Vector2, _dir: VerticalDirection, _vel: number): void {
        this.mtxLocal.translateX(_pos.x - this.mtxWorld.translation.x);
        this.mtxLocal.translateY(_pos.y - this.mtxWorld.translation.y);
        this.cmpMaterial.clrPrimary = _dir > 0 ? Projectile.colorShip : Projectile.colorInvader;
        this.vel = _vel;
        this._dir = _dir;
        this.activate(true);
      }

      protected onCollision(_other: CollidableNode): void {
        if (_other instanceof BarricadeStripe || _other instanceof Invader || _other instanceof Ship) {
          this.activate(false);
        }
        //this.cmpMaterial.clrPrimary = Projectile.colorCollision;
      }

      private update(_event: Event): void {
        if (this.isActive) {
          //this.cmpMaterial.clrPrimary = this.dir > 0 ? Projectile.colorShip : Projectile.colorInvader;
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
        this.collides(BarricadeFormation.instance);
        if (this.dir > 0) this.collides(InvaderWave.instance);
        else this.collides(Ship.instance);
      }
    }
  }