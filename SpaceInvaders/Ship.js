"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Ship extends ƒ.Node {
        constructor() {
            super("Ship");
            this.vel = 14 / 1000;
            this.moveRange = 7;
            this.dir = 0;
            this.moveLeftKeys = [ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A];
            this.moveRightKeys = [ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D];
            this.moveKeys = this.moveLeftKeys.concat(this.moveRightKeys);
            this.fireKeys = [ƒ.KEYBOARD_CODE.SPACE];
            this.interestingKeys = this.moveKeys.concat(this.fireKeys);
            this.pressedKeys = new Array();
            this.ship = new SpaceInvaders.QuadNode("Ship", ƒ.Vector2.ZERO(), new ƒ.Vector2(1, 7 / 13));
            this.ship.getComponent(ƒ.ComponentMaterial).clrPrimary = Ship.color;
            this.addChild(this.ship);
            this.projectiles = new SpaceInvaders.ProjectilePool(3);
            this.addChild(this.projectiles);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, (_event) => this.update(_event));
            window.addEventListener("keydown", (_event) => this.handleKeyDown(_event));
            window.addEventListener("keyup", (_event) => this.handleKeyUp(_event));
        }
        static get instance() {
            if (this._instance == undefined)
                this._instance = new Ship();
            return this._instance;
        }
        update(_event) {
            if (this.dir != 0) {
                let translationX = this.dir * this.vel * ƒ.Loop.timeFrameReal;
                let newPosX = this.ship.mtxLocal.translation.x + translationX;
                // if the new position would exceed the move range, set the translation to the remaining distance to the border
                if (newPosX < -this.moveRange)
                    translationX = -this.moveRange - this.ship.mtxLocal.translation.x;
                else if (newPosX > this.moveRange)
                    translationX = this.moveRange - this.ship.mtxLocal.translation.x;
                this.ship.mtxLocal.translateX(translationX);
            }
        }
        handleKeyDown(_event) {
            // if we are interested in that key and it wasn't already pressed, add it to the pressed keys
            if (this.interestingKeys.includes(_event.code) && !this.pressedKeys.includes(_event.code)) {
                this.pressedKeys.push(_event.code);
                // execute the appropriate actiong
                if (this.moveLeftKeys.includes(_event.code))
                    this.move(-1);
                else if (this.moveRightKeys.includes(_event.code))
                    this.move(1);
                else if (this.fireKeys.includes(_event.code))
                    this.fire();
            }
        }
        handleKeyUp(_event) {
            // remove key from pressed keys if included
            let index = this.pressedKeys.indexOf(_event.code);
            if (index > -1) {
                this.pressedKeys.splice(index, 1);
                // if the released key was a move key update movement
                if (this.moveKeys.includes(_event.code)) {
                    // search for the last key pressed to move from the currently pressed keys
                    let lastMoveKey;
                    for (let i = this.pressedKeys.length - 1; i > -1; --i) {
                        if (this.moveKeys.includes(this.pressedKeys[i]))
                            lastMoveKey = this.pressedKeys[i];
                    }
                    // move in the direction of the last key pressed
                    if (lastMoveKey != undefined) {
                        if (this.moveLeftKeys.includes(lastMoveKey))
                            this.move(-1);
                        else
                            this.move(1);
                    }
                    // stop if no key to move is currently pressed
                    else
                        this.move(0);
                }
            }
        }
        fire() {
            this.projectiles.fireProjectile(this.ship.mtxLocal.translation, 1);
        }
        move(_dir) {
            this.dir = _dir;
        }
    }
    Ship.color = new ƒ.Color(0, 0.5, 1, 1);
    SpaceInvaders.Ship = Ship;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Ship.js.map