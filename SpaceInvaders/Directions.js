"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
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
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Directions.js.map