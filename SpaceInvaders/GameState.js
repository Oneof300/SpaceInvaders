"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    let GameState;
    (function (GameState) {
        GameState[GameState["running"] = 0] = "running";
        GameState[GameState["over"] = 1] = "over";
    })(GameState = SpaceInvaders.GameState || (SpaceInvaders.GameState = {}));
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=GameState.js.map