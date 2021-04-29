"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    let GameState;
    (function (GameState) {
        GameState[GameState["running"] = 0] = "running";
        GameState[GameState["paused"] = 1] = "paused";
        GameState[GameState["over"] = 2] = "over";
    })(GameState = SpaceInvaders.GameState || (SpaceInvaders.GameState = {}));
    class Game {
        static get shipsLeft() {
            return Game._shipsLeft;
        }
        static get score() {
            return Game._score;
        }
        static get isRunning() {
            return Game.state == GameState.running;
        }
        static get isPaused() {
            return Game.state == GameState.paused;
        }
        static get isOver() {
            return Game.state == GameState.over;
        }
        static reduceShips() {
            if (--Game._shipsLeft <= 0) {
                Game._shipsLeft = 0;
                Game.end();
            }
            console.log("Ships left: " + Game.shipsLeft);
        }
        static increaseScore() {
            ++Game._score;
            console.log("Score: " + Game.score);
        }
        static pause(_millis) {
            if (Game.isRunning) {
                Game.state = GameState.paused;
                console.log("Paused");
                if (_millis != undefined)
                    setTimeout(Game.resume, _millis);
            }
        }
        static resume() {
            console.log("Resumed");
            if (Game.isPaused)
                Game.state = GameState.running;
        }
        static end() {
            console.log("GAME OVER!");
            Game.state = GameState.over;
        }
        static restart() {
            Game._shipsLeft = Game.properties.ships;
            Game._score = 0;
            SpaceInvaders.Ship.instance.reset(true);
            SpaceInvaders.InvaderWave.instance.reset(true);
            SpaceInvaders.BarricadeFormation.instance.reset();
            if (Game.isOver)
                Game.state = GameState.running;
            Game.pause(1000);
        }
        static handleKeyDown(_event) {
            if (Game.interestingKeys.includes(_event.code) && !Game.pressedKeys.includes(_event.code)) {
                Game.pressedKeys.push(_event.code);
                if (Game.pauseKeys.includes(_event.code))
                    Game.isRunning ? Game.pause() : Game.resume();
                else if (Game.restartKeys.includes(_event.code))
                    Game.restart();
            }
        }
        static handleKeyUp(_event) {
            let index = Game.pressedKeys.indexOf(_event.code);
            if (index > -1)
                Game.pressedKeys.splice(index, 1);
        }
    }
    Game._score = 0;
    Game._shipsLeft = 3;
    Game.state = GameState.running;
    Game.pauseKeys = [ƒ.KEYBOARD_CODE.ESC, ƒ.KEYBOARD_CODE.P];
    Game.restartKeys = [ƒ.KEYBOARD_CODE.ENTER, ƒ.KEYBOARD_CODE.R];
    Game.interestingKeys = Game.pauseKeys.concat(Game.restartKeys);
    Game.pressedKeys = new Array();
    SpaceInvaders.Game = Game;
    window.addEventListener("keydown", Game.handleKeyDown);
    window.addEventListener("keyup", Game.handleKeyUp);
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Game.js.map