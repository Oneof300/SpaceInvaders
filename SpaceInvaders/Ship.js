"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Ship extends SpaceInvaders.QuadNode {
        constructor() {
            super("Ship", ƒ.Vector2.ZERO(), new ƒ.Vector2(13, 7));
            this.vel = 130 / 1000;
            this.dir = SpaceInvaders.HorizontalDirection.none;
            this.moveLeftKeys = [ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A];
            this.moveRightKeys = [ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D];
            this.moveKeys = this.moveLeftKeys.concat(this.moveRightKeys);
            this.fireKeys = [ƒ.KEYBOARD_CODE.SPACE];
            this.interestingKeys = this.moveKeys.concat(this.fireKeys);
            this.pressedKeys = new Array();
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = Ship.color;
            this.projectiles = new SpaceInvaders.ProjectilePool(3);
            SpaceInvaders.space.addChild(this.projectiles);
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
            if (this.dir != SpaceInvaders.HorizontalDirection.none) {
                this.move();
            }
        }
        move() {
            this.mtxLocal.translateX(this.dir * this.vel * ƒ.Loop.timeFrameReal);
            if (this.mtxLocal.translation.x > SpaceInvaders.border.right) {
                this.mtxLocal.translateX(SpaceInvaders.border.right - this.mtxLocal.translation.x);
            }
            else if (this.mtxLocal.translation.x < SpaceInvaders.border.left) {
                this.mtxLocal.translateX(SpaceInvaders.border.left - this.mtxLocal.translation.x);
            }
        }
        fire() {
            this.projectiles.fireProjectile(this.mtxWorld.translation.toVector2(), SpaceInvaders.VerticalDirection.up);
        }
        handleKeyDown(_event) {
            // if we are interested in that key and it wasn't already pressed, add it to the pressed keys
            if (this.interestingKeys.includes(_event.code) && !this.pressedKeys.includes(_event.code)) {
                this.pressedKeys.push(_event.code);
                // execute the appropriate actiong
                if (this.moveLeftKeys.includes(_event.code))
                    this.dir = SpaceInvaders.HorizontalDirection.left;
                else if (this.moveRightKeys.includes(_event.code))
                    this.dir = SpaceInvaders.HorizontalDirection.right;
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
                            this.dir = SpaceInvaders.HorizontalDirection.left;
                        else
                            this.dir = SpaceInvaders.HorizontalDirection.right;
                    }
                    // stop if no key to move is currently pressed
                    else
                        this.dir = SpaceInvaders.HorizontalDirection.none;
                }
            }
        }
    }
    Ship.color = new ƒ.Color(0, 0.5, 1, 1);
    SpaceInvaders.Ship = Ship;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Ship.js.map