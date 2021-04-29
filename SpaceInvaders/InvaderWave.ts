namespace SpaceInvaders {
  import ƒ = FudgeCore;
  
  export class InvaderWave extends CollidableNode {
    private static _instance: InvaderWave;

    velMax: number = Game.properties.invaderWave.velocityMax;
    projectiles: ProjectilePool = new ProjectilePool(Game.properties.invaderWave.projectiles);
    projectileVel: number = Game.properties.invaderWave.projectileVelocity;

    private readonly drop: number;
    private dir: ƒ.Vector2 = Direction.right;
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
      Space.addChild(this.projectiles);

      this.drop = _spacing;
      this.targetedYPos = _pos.y;

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, (_event) => this.update(_event));
    }

    static get instance(): InvaderWave {
      if (this._instance == undefined) {
        this._instance = new InvaderWave(
          Game.properties.invaderWave.startPosition.copy,
          Game.properties.invaderWave.rows,
          Game.properties.invaderWave.columns,
          Game.properties.invaderWave.spacing
        );
      }
      return this._instance;
    }

    reset(_clearProjectiles: boolean = false): void {
      this.mtxLocal.translateX(Game.properties.invaderWave.startPosition.copy.x - this.mtxLocal.translation.x);
      this.mtxLocal.translateY(Game.properties.invaderWave.startPosition.copy.y - this.mtxLocal.translation.y);
      this.targetedYPos = Game.properties.invaderWave.startPosition.copy.y;
      this.dir = Direction.right;
      this.getChildren().forEach(invader => invader.activate(true));
      if (_clearProjectiles) this.projectiles.reset();
    }

    protected onCollision(_other: CollidableNode): void {
      if (this.getActiveChildren().some(invader => invader.collides(_other))) {
        if (InvaderWave.instance.getActiveChildren().length == 0) {
          InvaderWave.instance.reset();
          Game.pause(1000);
        }
      }
    }

    private update(_event: Event): void {
      if (Game.isRunning) {
        Invader.mtr.setCoat(Math.floor((this.mtxWorld.translation.x + this.mtxWorld.translation.y) / 5) % 2 == 0 ? Invader.coat0 : Invader.coat1);
        this.recalculateCollisionBox();
        this.move();
        this.fire();
        this.updateDirection();
        this.checkCollision();
      }
    }

    private move(): void {
      let vel: number = this.velMax / this.getActiveChildren().length;
      this.mtxLocal.translateX(this.dir.x * vel * ƒ.Loop.timeFrameReal);
      this.mtxLocal.translateY(this.dir.y * vel * ƒ.Loop.timeFrameReal);
      this.mtxWorld.translation = this.mtxLocal.translation;
    }

    private fire(): void {
      let randomIndex: number = Math.floor(Math.random() * this.getActiveChildren().length);
      let pos: ƒ.Vector2 = this.getActiveChild(randomIndex)?.mtxWorld.translation.toVector2();
      if (pos != undefined) this.projectiles.fireProjectile(pos, VerticalDirection.down, this.projectileVel);
    }

    private updateDirection(): void {
      if (this.dir == Direction.left && this.left <= Space.border.left) {
        this.mtxLocal.translateX(Space.border.left - this.left);
        this.dir = Direction.down;
        this.targetedYPos -= this.drop;
      }
      else if (this.dir == Direction.right && this.right >= Space.border.right) {
        this.mtxLocal.translateX(Space.border.right - this.right);
        this.dir = Direction.down;
        this.targetedYPos -= this.drop;
      }
      else if (this.dir == Direction.down && this.mtxLocal.translation.y <= this.targetedYPos) {
        this.mtxLocal.translateY(this.targetedYPos - this.mtxLocal.translation.y);
        this.dir = this.mtxLocal.translation.x > 0 ? Direction.left : Direction.right;
      }
    }

    private checkCollision(): void {
      this.collides(Ship.instance);
      if (this.bottom + Invader.height < Ship.instance.bottom) Game.end();
    }

    private recalculateCollisionBox(): void {
      let xPositions: number[] = this.getActiveChildren().map(invader => invader.mtxWorld.translation.x);
      this.left = Math.min(...xPositions) - Invader.width / 2;
      this.right = Math.max(...xPositions) + Invader.width / 2;

      let yPositions: number[] = this.getActiveChildren().map(invader => invader.mtxWorld.translation.y);
      this.bottom = Math.min(...yPositions) - Invader.height / 2;
      this.top = Math.max(...yPositions) + Invader.height / 2;
    }
  }
}