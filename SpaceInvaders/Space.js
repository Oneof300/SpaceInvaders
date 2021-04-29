"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Space {
        static addChild(_child) {
            this.node.addChild(_child);
        }
    }
    Space.border = new SpaceInvaders.Rectangle(new ƒ.Vector2(0, 78), new ƒ.Vector2(194, 182));
    Space.node = new ƒ.Node("Space");
    SpaceInvaders.Space = Space;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Space.js.map