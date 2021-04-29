"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Rectangle {
        constructor(_position = ƒ.Vector2.ZERO(), _size = ƒ.Vector2.ONE(), _offset = ƒ.Vector2.SCALE(_size, -0.5)) {
            this.position = _position;
            this.size = _size;
            this.offset = _offset;
        }
        get x() {
            return this.position.x;
        }
        set x(_value) {
            this.position.x = _value;
        }
        get y() {
            return this.position.y;
        }
        set y(_value) {
            this.position.y = _value;
        }
        get offsetX() {
            return this.offset.x;
        }
        get offsetY() {
            return this.offset.y;
        }
        get width() {
            return this.size.x;
        }
        set width(_value) {
            this.offset.x -= (_value - this.width) / 2;
            this.size.x = _value;
        }
        get height() {
            return this.size.y;
        }
        set height(_value) {
            this.offset.y -= (_value - this.height) / 2;
            this.size.y = _value;
        }
        get left() {
            return this.position.x + this.offset.x;
        }
        set left(_value) {
            if (_value < this.right) {
                let difference = _value - this.left;
                this.offset.x += difference;
                this.size.x -= difference;
            }
        }
        get right() {
            return this.left + this.width;
        }
        set right(_value) {
            if (_value > this.left)
                this.size.x += _value - this.right;
        }
        get bottom() {
            return this.position.y + this.offset.y;
        }
        set bottom(_value) {
            if (_value < this.top) {
                let difference = _value - this.bottom;
                this.offset.y += difference;
                this.size.y -= difference;
            }
        }
        get top() {
            return this.bottom + this.height;
        }
        set top(_value) {
            if (_value > this.bottom)
                this.size.y += _value - this.top;
        }
        isInside(_point) {
            throw new Error("Method not implemented.");
        }
        collides(_other) {
            return this.left < _other.right && this.right > _other.left && this.bottom < _other.top && this.top > _other.bottom;
        }
        getIntersection(_rect) {
            throw new Error("Method not implemented.");
        }
        covers(_rect) {
            throw new Error("Method not implemented.");
        }
    }
    SpaceInvaders.Rectangle = Rectangle;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Rectangle.js.map