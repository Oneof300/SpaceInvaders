namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class InvaderWave extends CollidableNode {
      private static _instance: InvaderWave;

      velMax: number = 0.2;
      projectiles: ProjectilePool = new ProjectilePool(1);
      projectileVel: number = 0.1;

      private dir: ƒ.Vector2 = Direction.right;
      private readonly drop: number;
      private targetedYPos: number;
  
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
        space.addChild(this.projectiles);

        this.drop = _spacing;
        this.targetedYPos = _pos.y;

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, (_event) => this.update(_event));
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
        if (gameState == GameState.running) {
          this.move();
          this.fire();
          this.updateDirection();
          this.checkCollision();
        }
      }

      private move(): void {
        let vel: number = this.velMax / this.nChildren;
        this.mtxLocal.translateX(this.dir.x * vel * ƒ.Loop.timeFrameReal);
        this.mtxLocal.translateY(this.dir.y * vel * ƒ.Loop.timeFrameReal);
        this.mtxWorld.translation = this.mtxLocal.translation;
      }

      private updateDirection(): void {
        if (this.dir == Direction.left && this.left <= border.left) {
          this.mtxLocal.translateX(border.left - this.left);
          this.dir = Direction.down;
          this.targetedYPos -= this.drop;
        }
        else if (this.dir == Direction.right && this.right >= border.right) {
          this.mtxLocal.translateX(border.right - this.right);
          this.dir = Direction.down;
          this.targetedYPos -= this.drop;
        }
        else if (this.dir == Direction.down && this.mtxLocal.translation.y <= this.targetedYPos) {
          this.mtxLocal.translateY(this.targetedYPos - this.mtxLocal.translation.y);
          this.dir = this.mtxLocal.translation.x > 0 ? Direction.left : Direction.right;
        }
      }

      private fire(): void {
        let pos: ƒ.Vector2 = this.getChild(Math.floor(Math.random() * this.nChildren))?.mtxWorld.translation.toVector2();
        if (pos != undefined) this.projectiles.fireProjectile(pos, VerticalDirection.down, this.projectileVel);
      }

      private checkCollision(): void {
        (this.getChildren() as Invader[])
        .filter(invader => invader.collides(Ship.instance))
        .reverse()
        .forEach(invader => this.removeChild(invader));
        if (this.bottom + Invader.height < Ship.instance.bottom) gameState = GameState.over;
      }

      private recalculateCollisionBox(): void {
        let xPositions: number[] = this.getChildren().map(invader => invader.mtxWorld.translation.x);
        this.left = Math.min(...xPositions) - Invader.width / 2;
        this.right = Math.max(...xPositions) + Invader.width / 2;

        let yPositions: number[] = this.getChildren().map(invader => invader.mtxWorld.translation.y);
        this.bottom = Math.min(...yPositions) - Invader.height / 2;
        this.top = Math.max(...yPositions) + Invader.height / 2;
      }
    }
  }