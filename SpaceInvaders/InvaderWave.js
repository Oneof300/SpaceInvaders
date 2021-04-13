"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class InvaderWave extends SpaceInvaders.CollidableNode {
        constructor(_pos, _rows, _columns, _spacing) {
            super("InvaderWave", _pos, new ƒ.Vector2((_columns - 1) * _spacing + SpaceInvaders.Invader.width, (_rows - 1) * _spacing + SpaceInvaders.Invader.height));
            this.velMax = 0.2;
            this.projectiles = new SpaceInvaders.ProjectilePool(1);
            this.projectileVel = 0.1;
            this.dir = SpaceInvaders.Direction.right;
            for (let row = 0; row < _rows; ++row) {
                for (let column = 0; column < _columns; ++column) {
                    let pos = new ƒ.Vector2();
                    pos.x = (column - (_columns - 1) / 2) * _spacing;
                    pos.y = (row - (_rows - 1) / 2) * _spacing;
                    this.addChild(new SpaceInvaders.Invader(pos));
                }
            }
            SpaceInvaders.space.addChild(this.projectiles);
            this.drop = _spacing;
            this.targetedYPos = _pos.y;
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, (_event) => this.update(_event));
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
            if (SpaceInvaders.gameState == SpaceInvaders.GameState.running) {
                this.move();
                this.fire();
                this.updateDirection();
                this.checkCollision();
            }
        }
        move() {
            let vel = this.velMax / this.nChildren;
            this.mtxLocal.translateX(this.dir.x * vel * ƒ.Loop.timeFrameReal);
            this.mtxLocal.translateY(this.dir.y * vel * ƒ.Loop.timeFrameReal);
            this.mtxWorld.translation = this.mtxLocal.translation;
        }
        updateDirection() {
            if (this.dir == SpaceInvaders.Direction.left && this.left <= SpaceInvaders.border.left) {
                this.mtxLocal.translateX(SpaceInvaders.border.left - this.left);
                this.dir = SpaceInvaders.Direction.down;
                this.targetedYPos -= this.drop;
            }
            else if (this.dir == SpaceInvaders.Direction.right && this.right >= SpaceInvaders.border.right) {
                this.mtxLocal.translateX(SpaceInvaders.border.right - this.right);
                this.dir = SpaceInvaders.Direction.down;
                this.targetedYPos -= this.drop;
            }
            else if (this.dir == SpaceInvaders.Direction.down && this.mtxLocal.translation.y <= this.targetedYPos) {
                this.mtxLocal.translateY(this.targetedYPos - this.mtxLocal.translation.y);
                this.dir = this.mtxLocal.translation.x > 0 ? SpaceInvaders.Direction.left : SpaceInvaders.Direction.right;
            }
        }
        fire() {
            let pos = this.getChild(Math.floor(Math.random() * this.nChildren))?.mtxWorld.translation.toVector2();
            if (pos != undefined)
                this.projectiles.fireProjectile(pos, SpaceInvaders.VerticalDirection.down, this.projectileVel);
        }
        checkCollision() {
            this.getChildren()
                .filter(invader => invader.collides(SpaceInvaders.Ship.instance))
                .reverse()
                .forEach(invader => this.removeChild(invader));
            if (this.bottom + SpaceInvaders.Invader.height < SpaceInvaders.Ship.instance.bottom)
                SpaceInvaders.gameState = SpaceInvaders.GameState.over;
        }
        recalculateCollisionBox() {
            let xPositions = this.getChildren().map(invader => invader.mtxWorld.translation.x);
            this.left = Math.min(...xPositions) - SpaceInvaders.Invader.width / 2;
            this.right = Math.max(...xPositions) + SpaceInvaders.Invader.width / 2;
            let yPositions = this.getChildren().map(invader => invader.mtxWorld.translation.y);
            this.bottom = Math.min(...yPositions) - SpaceInvaders.Invader.height / 2;
            this.top = Math.max(...yPositions) + SpaceInvaders.Invader.height / 2;
        }
    }
    SpaceInvaders.InvaderWave = InvaderWave;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=InvaderWave.js.map