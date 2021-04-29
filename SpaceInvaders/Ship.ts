namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class Ship extends QuadNode {
      static readonly color: ƒ.Color = new ƒ.Color(0, 0.5, 1, 1);
      static readonly texture: ƒ.TextureImage = new ƒ.TextureImage("./Textures/Ship.png");
      static readonly coat: ƒ.CoatTextured = new ƒ.CoatTextured(Ship.color, Ship.texture);
      static readonly mtr: ƒ.Material = new ƒ.Material("ShipMat", ƒ.ShaderTexture, Ship.coat);

      private static _instance: Ship;

      vel: number = Game.properties.ship.velocity;
      projectiles: ProjectilePool = new ProjectilePool(Game.properties.ship.projectiles);
      projectileVel: number = Game.properties.ship.projectileVelocity;

      private dir: HorizontalDirection = HorizontalDirection.none;

      private readonly moveLeftKeys: string[] = [ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A];
      private readonly moveRightKeys: string[] = [ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D];
      private readonly moveKeys: string[] = this.moveLeftKeys.concat(this.moveRightKeys);
      private readonly fireKeys: string[] = [ƒ.KEYBOARD_CODE.SPACE];
      private readonly interestingKeys: string[] = this.moveKeys.concat(this.fireKeys);
      private pressedKeys: Array<string> = new Array();
  
      private constructor() {
        super("Ship", ƒ.Vector2.ZERO(), new ƒ.Vector2(13, 7));

        this.getComponent(ƒ.ComponentMaterial).material = Ship.mtr;
        Space.addChild(this.projectiles);

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, (_event) => this.update(_event));
        window.addEventListener("keydown", (_event) => this.handleKeyDown(_event));
        window.addEventListener("keyup", (_event) => this.handleKeyUp(_event));
      }

      static get instance(): Ship {
        if (this._instance == undefined) this._instance = new Ship();
        return this._instance;
      }

      reset(_clearProjectiles: boolean = false): void {
        this.mtxLocal.translateX(-this.mtxLocal.translation.x);
        this.activate(true);
        if (_clearProjectiles) this.projectiles.reset();
      }

      protected onCollision(_other: CollidableNode): void {
        if (_other instanceof Projectile || _other instanceof Invader) {
          Game.reduceShips();
          if (Game.isRunning) {
            Game.pause(1000);
            this.reset();
          }
          else this.activate(false);
        }
      }

      private update(_event: Event): void {
        if (Game.isRunning && this.dir != HorizontalDirection.none) {
          this.move();
        }
      }

      private move(): void {
        this.mtxLocal.translateX(this.dir * this.vel * ƒ.Loop.timeFrameReal);
        this.mtxWorld.translation = this.mtxLocal.translation;

        if (this.right > Space.border.right) {
          this.mtxLocal.translateX(Space.border.right - this.right);
        }
        else if (this.left < Space.border.left) {
          this.mtxLocal.translateX(Space.border.left - this.left);
        }
      }

      private fire(): void {
        this.projectiles.fireProjectile(this.mtxWorld.translation.toVector2(), VerticalDirection.up, this.projectileVel);
      }

      private handleKeyDown(_event: KeyboardEvent): void {
        // if we are interested in that key and it wasn't already pressed, add it to the pressed keys
        if (this.interestingKeys.includes(_event.code) && !this.pressedKeys.includes(_event.code)) {
          this.pressedKeys.push(_event.code);
          
          // execute the appropriate actiong
          if (this.moveLeftKeys.includes(_event.code)) this.dir = HorizontalDirection.left;
          else if (this.moveRightKeys.includes(_event.code)) this.dir = HorizontalDirection.right;
          else if (this.fireKeys.includes(_event.code) && Game.isRunning) this.fire();
        }
      }

      private handleKeyUp(_event: KeyboardEvent): void {
        // remove key from pressed keys if included
        let index: number = this.pressedKeys.indexOf(_event.code);
        if (index > -1) {
          this.pressedKeys.splice(index, 1);

          // if the released key was a move key update movement
          if (this.moveKeys.includes(_event.code)) {
            // search for the last key pressed to move from the currently pressed keys
            let lastMoveKey: string;
            for (let i: number = this.pressedKeys.length - 1; i > -1; --i) {
              if (this.moveKeys.includes(this.pressedKeys[i])) lastMoveKey = this.pressedKeys[i];
            }

            // move in the direction of the last key pressed
            if (lastMoveKey != undefined) {
              if (this.moveLeftKeys.includes(lastMoveKey)) this.dir = HorizontalDirection.left;
              else this.dir = HorizontalDirection.right;
            }
            // stop if no key to move is currently pressed
            else this.dir = HorizontalDirection.none;
          }
        }
      }
    }
  }