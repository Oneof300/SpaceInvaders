namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class InvaderWave extends CollidableNode {
      private static _instance: InvaderWave;

      private projectiles: ProjectilePool;

      private readonly vel: number = 130 / 1000;
      private dir: number = 0;
  
      private constructor(_pos: ƒ.Vector2, _rows: number, _columns: number, _spacing: number) {
        super("InvaderWave", _pos, new ƒ.Vector2((_columns - 1) * _spacing + Invader.width, (_rows - 1) * _spacing + Invader.height));

        for (let row: number = 0; row < _rows; ++row) {
          for (let column: number = 0; column < _columns; ++column) {
            let pos: ƒ.Vector2 = new ƒ.Vector2();
            pos.x = (column - (_columns - 1) / 2) * _spacing;
            pos.y = (row - (_rows - 1) / 2) * _spacing;
    
            this.addChild(new Invader(pos));
          }
        }

        this.projectiles = new ProjectilePool(5);
        space.addChild(this.projectiles);

        //ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, (_event) => this.update(_event));
      }

      static get instance(): InvaderWave {
        return this._instance;
      }

      static createWave(_pos: ƒ.Vector2, _rows: number, _columns: number, _spacing: number): InvaderWave {
        if (this._instance != undefined) delete this._instance;
        return this._instance = new InvaderWave(_pos, _rows, _columns, _spacing);
      }

      protected onCollision(_other: CollidableNode): void {
        if (_other instanceof Projectile) {
          let collidedInvader: Invader = (this.getChildren() as Invader[]).find(invader => invader.collides(_other));
          if (collidedInvader != undefined) {
            this.removeChild(collidedInvader);
            this.recalculateCollisionBox();
          }
        }
      }

      private update(_event: Event): void {
        if (this.dir != 0) {
          this.mtxLocal.translateX(this.dir * this.vel * ƒ.Loop.timeFrameReal);
        }
      }

      private recalculateCollisionBox(): void {
        let xPositions: number[] = this.getChildren().map(invader => invader.mtxWorld.translation.x);
        this.left = Math.min(...xPositions) - Invader.width / 2;
        this.right = Math.max(...xPositions) + Invader.width / 2;

        let yPositions: number[] = this.getChildren().map(invader => invader.mtxWorld.translation.y);
        this.bottom = Math.min(...yPositions) - Invader.height / 2;
        this.top = Math.max(...yPositions) + Invader.height / 2;

        console.log("recalculatedCollisionBox:");
        console.log(this);
      }
    }
  }