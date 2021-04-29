"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class InvaderWave extends SpaceInvaders.CollidableNode {
        constructor(_pos, _rows, _columns, _spacing) {
            super("InvaderWave", _pos, new ƒ.Vector2((_columns - 1) * _spacing + SpaceInvaders.Invader.width, (_rows - 1) * _spacing + SpaceInvaders.Invader.height));
            this.velMax = SpaceInvaders.Game.properties.invaderWave.velocityMax;
            this.projectiles = new SpaceInvaders.ProjectilePool(SpaceInvaders.Game.properties.invaderWave.projectiles);
            this.projectileVel = SpaceInvaders.Game.properties.invaderWave.projectileVelocity;
            this.dir = SpaceInvaders.Direction.right;
            for (let row = 0; row < _rows; ++row) {
                for (let column = 0; column < _columns; ++column) {
                    let pos = new ƒ.Vector2();
                    pos.x = (column - (_columns - 1) / 2) * _spacing;
                    pos.y = (row - (_rows - 1) / 2) * _spacing;
                    this.addChild(new SpaceInvaders.Invader(pos));
                }
            }
            SpaceInvaders.Space.addChild(this.projectiles);
            this.drop = _spacing;
            this.targetedYPos = _pos.y;
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, (_event) => this.update(_event));
        }
        static get instance() {
            if (this._instance == undefined) {
                this._instance = new InvaderWave(SpaceInvaders.Game.properties.invaderWave.startPosition.copy, SpaceInvaders.Game.properties.invaderWave.rows, SpaceInvaders.Game.properties.invaderWave.columns, SpaceInvaders.Game.properties.invaderWave.spacing);
            }
            return this._instance;
        }
        reset(_clearProjectiles = false) {
            this.mtxLocal.translateX(SpaceInvaders.Game.properties.invaderWave.startPosition.copy.x - this.mtxLocal.translation.x);
            this.mtxLocal.translateY(SpaceInvaders.Game.properties.invaderWave.startPosition.copy.y - this.mtxLocal.translation.y);
            this.targetedYPos = SpaceInvaders.Game.properties.invaderWave.startPosition.copy.y;
            this.dir = SpaceInvaders.Direction.right;
            this.getChildren().forEach(invader => invader.activate(true));
            if (_clearProjectiles)
                this.projectiles.reset();
        }
        onCollision(_other) {
            if (this.getActiveChildren().some(invader => invader.collides(_other))) {
                if (InvaderWave.instance.getActiveChildren().length == 0) {
                    InvaderWave.instance.reset();
                    SpaceInvaders.Game.pause(1000);
                }
            }
        }
        update(_event) {
            if (SpaceInvaders.Game.isRunning) {
                SpaceInvaders.Invader.mtr.setCoat(Math.floor((this.mtxWorld.translation.x + this.mtxWorld.translation.y) / 5) % 2 == 0 ? SpaceInvaders.Invader.coat0 : SpaceInvaders.Invader.coat1);
                this.recalculateCollisionBox();
                this.move();
                this.fire();
                this.updateDirection();
                this.checkCollision();
            }
        }
        move() {
            let vel = this.velMax / this.getActiveChildren().length;
            this.mtxLocal.translateX(this.dir.x * vel * ƒ.Loop.timeFrameReal);
            this.mtxLocal.translateY(this.dir.y * vel * ƒ.Loop.timeFrameReal);
            this.mtxWorld.translation = this.mtxLocal.translation;
        }
        fire() {
            let randomIndex = Math.floor(Math.random() * this.getActiveChildren().length);
            let pos = this.getActiveChild(randomIndex)?.mtxWorld.translation.toVector2();
            if (pos != undefined)
                this.projectiles.fireProjectile(pos, SpaceInvaders.VerticalDirection.down, this.projectileVel);
        }
        updateDirection() {
            if (this.dir == SpaceInvaders.Direction.left && this.left <= SpaceInvaders.Space.border.left) {
                this.mtxLocal.translateX(SpaceInvaders.Space.border.left - this.left);
                this.dir = SpaceInvaders.Direction.down;
                this.targetedYPos -= this.drop;
            }
            else if (this.dir == SpaceInvaders.Direction.right && this.right >= SpaceInvaders.Space.border.right) {
                this.mtxLocal.translateX(SpaceInvaders.Space.border.right - this.right);
                this.dir = SpaceInvaders.Direction.down;
                this.targetedYPos -= this.drop;
            }
            else if (this.dir == SpaceInvaders.Direction.down && this.mtxLocal.translation.y <= this.targetedYPos) {
                this.mtxLocal.translateY(this.targetedYPos - this.mtxLocal.translation.y);
                this.dir = this.mtxLocal.translation.x > 0 ? SpaceInvaders.Direction.left : SpaceInvaders.Direction.right;
            }
        }
        checkCollision() {
            this.collides(SpaceInvaders.Ship.instance);
            if (this.bottom + SpaceInvaders.Invader.height < SpaceInvaders.Ship.instance.bottom)
                SpaceInvaders.Game.end();
        }
        recalculateCollisionBox() {
            let xPositions = this.getActiveChildren().map(invader => invader.mtxWorld.translation.x);
            this.left = Math.min(...xPositions) - SpaceInvaders.Invader.width / 2;
            this.right = Math.max(...xPositions) + SpaceInvaders.Invader.width / 2;
            let yPositions = this.getActiveChildren().map(invader => invader.mtxWorld.translation.y);
            this.bottom = Math.min(...yPositions) - SpaceInvaders.Invader.height / 2;
            this.top = Math.max(...yPositions) + SpaceInvaders.Invader.height / 2;
        }
    }
    SpaceInvaders.InvaderWave = InvaderWave;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=InvaderWave.js.map