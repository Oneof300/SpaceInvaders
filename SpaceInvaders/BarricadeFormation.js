"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class BarricadeFormation extends SpaceInvaders.CollidableNode {
        constructor(_pos, _barricadeCount, _spacing) {
            super("BarricadeFormation", _pos, new ƒ.Vector2((_barricadeCount - 1) * _spacing + SpaceInvaders.Barricade.width, SpaceInvaders.Barricade.height), new ƒ.Vector2(-((_barricadeCount - 1) * _spacing + SpaceInvaders.Barricade.width) / 2, 0));
            for (let barricadeIndex = 0; barricadeIndex < _barricadeCount; ++barricadeIndex) {
                this.addChild(new SpaceInvaders.Barricade(new ƒ.Vector2((barricadeIndex - (_barricadeCount - 1) / 2) * _spacing, 0)));
            }
        }
        static get instance() {
            if (this._instance == undefined) {
                this._instance = new BarricadeFormation(SpaceInvaders.Game.properties.barricadeFormation.position, SpaceInvaders.Game.properties.barricadeFormation.barricades, SpaceInvaders.Game.properties.barricadeFormation.spacing);
            }
            return this._instance;
        }
        reset() {
            this.getChildren().forEach(barricade => barricade.reset());
        }
        onCollision(_other) {
            if (_other instanceof SpaceInvaders.Projectile) {
                this.getChildren().find(barricade => barricade.collides(_other));
            }
        }
    }
    SpaceInvaders.BarricadeFormation = BarricadeFormation;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=BarricadeFormation.js.map