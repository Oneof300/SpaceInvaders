namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class Ship extends ƒ.Node {
      static readonly color: ƒ.Color = new ƒ.Color(0, 0.5, 1, 1);
      private static _instance: Ship;      

      private ship: QuadNode;
      private projectiles: ProjectilePool;

      private readonly vel: number = 14 / 1000;
      private readonly moveRange: number = 7;
      private dir: number = 0;

      private readonly moveLeftKeys: string[] = [ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A];
      private readonly moveRightKeys: string[] = [ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D];
      private readonly moveKeys: string[] = this.moveLeftKeys.concat(this.moveRightKeys);
      private readonly fireKeys: string[] = [ƒ.KEYBOARD_CODE.SPACE];
      private readonly interestingKeys: string[] = this.moveKeys.concat(this.fireKeys);
      private pressedKeys: Array<string> = new Array();
  
      private constructor() {
        super("Ship");
  
        this.ship = new QuadNode("Ship", ƒ.Vector2.ZERO(), new ƒ.Vector2(1, 7 / 13));
        this.ship.getComponent(ƒ.ComponentMaterial).clrPrimary = Ship.color;
        this.addChild(this.ship);

        this.projectiles = new ProjectilePool(3);
        this.addChild(this.projectiles);

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, (_event) => this.update(_event));
        window.addEventListener("keydown", (_event) => this.handleKeyDown(_event));
        window.addEventListener("keyup", (_event) => this.handleKeyUp(_event));
      }

      static get instance(): Ship {
        if (this._instance == undefined) this._instance = new Ship();
        return this._instance;
      }

      private update(_event: Event): void {
        if (this.dir != 0) {
          let translationX: number = this.dir * this.vel * ƒ.Loop.timeFrameReal;
          let newPosX: number = this.ship.mtxLocal.translation.x + translationX;

          // if the new position would exceed the move range, set the translation to the remaining distance to the border
          if (newPosX < -this.moveRange) translationX = -this.moveRange - this.ship.mtxLocal.translation.x;
          else if (newPosX > this.moveRange) translationX = this.moveRange - this.ship.mtxLocal.translation.x;
          
          this.ship.mtxLocal.translateX(translationX);
        }
      }

      private handleKeyDown(_event: KeyboardEvent): void {
        // if we are interested in that key and it wasn't already pressed, add it to the pressed keys
        if (this.interestingKeys.includes(_event.code) && !this.pressedKeys.includes(_event.code)) {
          this.pressedKeys.push(_event.code);
          
          // execute the appropriate actiong
          if (this.moveLeftKeys.includes(_event.code)) this.move(-1);
          else if (this.moveRightKeys.includes(_event.code)) this.move(1);
          else if (this.fireKeys.includes(_event.code)) this.fire();
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
              if (this.moveLeftKeys.includes(lastMoveKey)) this.move(-1);
              else this.move(1);
            }
            // stop if no key to move is currently pressed
            else this.move(0);
          }
        }
      }

      private fire(): void {
        this.projectiles.fireProjectile(this.ship.mtxLocal.translation, 1);
      }

      private move(_dir: number): void {
        this.dir = _dir;
      }
    }
  }