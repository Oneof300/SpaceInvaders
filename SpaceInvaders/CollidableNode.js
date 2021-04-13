"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class CollidableNode extends ƒ.Node {
        constructor(_name, _pos = ƒ.Vector2.ZERO(), _size = ƒ.Vector2.ONE(), _offset) {
            super(_name);
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            this.collisionBox = new SpaceInvaders.Rectangle(_pos, _size, _offset);
        }
        get width() { return this.collisionBox.width; }
        set width(_value) {
            this.collisionBox.width = _value;
            this.onCollisionBoxChanged?.call(this, this.collisionBox);
        }
        get height() { return this.collisionBox.height; }
        set height(_value) {
            this.collisionBox.height = _value;
            this.onCollisionBoxChanged?.call(this, this.collisionBox);
        }
        get left() {
            this.updateCollisionBoxPosition();
            return this.collisionBox.left;
        }
        set left(_value) {
            this.updateCollisionBoxPosition();
            this.collisionBox.left = _value;
            this.onCollisionBoxChanged?.call(this, this.collisionBox);
        }
        get top() {
            this.updateCollisionBoxPosition();
            return this.collisionBox.top;
        }
        set top(_value) {
            this.updateCollisionBoxPosition();
            this.collisionBox.top = _value;
            this.onCollisionBoxChanged?.call(this, this.collisionBox);
        }
        get right() {
            this.updateCollisionBoxPosition();
            return this.collisionBox.right;
        }
        set right(_value) {
            this.updateCollisionBoxPosition();
            this.collisionBox.right = _value;
            this.onCollisionBoxChanged?.call(this, this.collisionBox);
        }
        get bottom() {
            this.updateCollisionBoxPosition();
            return this.collisionBox.bottom;
        }
        set bottom(_value) {
            this.updateCollisionBoxPosition();
            this.collisionBox.bottom = _value;
            this.onCollisionBoxChanged?.call(this, this.collisionBox);
        }
        collides(_other) {
            this.updateCollisionBoxPosition();
            _other.updateCollisionBoxPosition();
            if (this.collisionBox.collides(_other.collisionBox)) {
                console.log(this.name + " collided with " + _other.name);
                console.log(this);
                console.log(_other);
                this.onCollision?.call(this, _other);
                _other.onCollision?.call(_other, this);
                return true;
            }
            return false;
        }
        updateCollisionBoxPosition() {
            this.collisionBox.x = this.mtxWorld.translation.x;
            this.collisionBox.y = this.mtxWorld.translation.y;
        }
    }
    SpaceInvaders.CollidableNode = CollidableNode;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=CollidableNode.js.map