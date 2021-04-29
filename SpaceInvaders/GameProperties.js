"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class GameProperties {
        constructor(_init) {
            this.ships = 3;
            Object.assign(this, _init);
        }
    }
    SpaceInvaders.GameProperties = GameProperties;
    class ShipProperties {
        constructor(_init) {
            this.velocity = 0.15;
            this.projectiles = 2;
            this.projectileVelocity = 0.15;
            Object.assign(this, _init);
        }
    }
    SpaceInvaders.ShipProperties = ShipProperties;
    class InvaderWaveProperties {
        constructor(_init) {
            this.startPosition = new ƒ.Vector2(0, 112);
            this.columns = 11;
            this.rows = 5;
            this.spacing = 16;
            this.velocityMax = 0.4;
            this.projectiles = 3;
            this.projectileVelocity = 0.05;
            Object.assign(this, _init);
        }
    }
    SpaceInvaders.InvaderWaveProperties = InvaderWaveProperties;
    class BarricadeFormationProperties {
        constructor(_init) {
            this.position = new ƒ.Vector2(0, 16);
            this.barricades = 4;
            this.spacing = 48;
            Object.assign(this, _init);
        }
    }
    SpaceInvaders.BarricadeFormationProperties = BarricadeFormationProperties;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=GameProperties.js.map