"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    let HorizontalDirection;
    (function (HorizontalDirection) {
        HorizontalDirection[HorizontalDirection["left"] = -1] = "left";
        HorizontalDirection[HorizontalDirection["right"] = 1] = "right";
        HorizontalDirection[HorizontalDirection["none"] = 0] = "none";
    })(HorizontalDirection = SpaceInvaders.HorizontalDirection || (SpaceInvaders.HorizontalDirection = {}));
    let VerticalDirection;
    (function (VerticalDirection) {
        VerticalDirection[VerticalDirection["up"] = 1] = "up";
        VerticalDirection[VerticalDirection["down"] = -1] = "down";
        VerticalDirection[VerticalDirection["none"] = 0] = "none";
    })(VerticalDirection = SpaceInvaders.VerticalDirection || (SpaceInvaders.VerticalDirection = {}));
    class Direction {
    }
    Direction.left = ƒ.Vector2.X(HorizontalDirection.left);
    Direction.right = ƒ.Vector2.X(HorizontalDirection.right);
    Direction.up = ƒ.Vector2.Y(VerticalDirection.up);
    Direction.down = ƒ.Vector2.Y(VerticalDirection.down);
    Direction.none = ƒ.Vector2.ZERO();
    SpaceInvaders.Direction = Direction;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Directions.js.map