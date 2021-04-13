"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class InvaderWave extends SpaceInvaders.CollidableNode {
        constructor(_pos, _rows, _columns, _spacing) {
            super("InvaderWave", _pos, new ƒ.Vector2((_columns - 1) * _spacing + SpaceInvaders.Invader.width, (_rows - 1) * _spacing + SpaceInvaders.Invader.height));
            this.vel = 130 / 1000;
            this.dir = 0;
            for (let row = 0; row < _rows; ++row) {
                for (let column = 0; column < _columns; ++column) {
                    let pos = new ƒ.Vector2();
                    pos.x = (column - (_columns - 1) / 2) * _spacing;
                    pos.y = (row - (_rows - 1) / 2) * _spacing;
                    this.addChild(new SpaceInvaders.Invader(pos));
                }
            }
            this.projectiles = new SpaceInvaders.ProjectilePool(5);
            SpaceInvaders.space.addChild(this.projectiles);
            //ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, (_event) => this.update(_event));
        }
        static get instance() {
            return this._instance;
        }
        static createWave(_pos, _rows, _columns, _spacing) {
            if (this._instance != undefined)
                delete this._instance;
            return this._instance = new InvaderWave(_pos, _rows, _columns, _spacing);
        }
        onCollision(_other) {
            if (_other instanceof SpaceInvaders.Projectile) {
                let collidedInvader = this.getChildren().find(invader => invader.collides(_other));
                if (collidedInvader != undefined) {
                    this.removeChild(collidedInvader);
                    this.recalculateCollisionBox();
                }
            }
        }
        update(_event) {
            if (this.dir != 0) {
                this.mtxLocal.translateX(this.dir * this.vel * ƒ.Loop.timeFrameReal);
            }
        }
        recalculateCollisionBox() {
            let xPositions = this.getChildren().map(invader => invader.mtxWorld.translation.x);
            this.left = Math.min(...xPositions) - SpaceInvaders.Invader.width / 2;
            this.right = Math.max(...xPositions) + SpaceInvaders.Invader.width / 2;
            let yPositions = this.getChildren().map(invader => invader.mtxWorld.translation.y);
            this.bottom = Math.min(...yPositions) - SpaceInvaders.Invader.height / 2;
            this.top = Math.max(...yPositions) + SpaceInvaders.Invader.height / 2;
            console.log("recalculatedCollisionBox:");
            console.log(this);
        }
    }
    SpaceInvaders.InvaderWave = InvaderWave;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=InvaderWave.js.map