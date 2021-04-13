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
            return this._instance;
        }
        static createFormation(_pos, _barricadeCount, _spacing) {
            if (this._instance != undefined)
                delete this._instance;
            return this._instance = new BarricadeFormation(_pos, _barricadeCount, _spacing);
        }
        onCollision(_other) {
            if (_other instanceof SpaceInvaders.Projectile) {
                this.getChildren().some(barricade => barricade.collides(_other));
            }
        }
    }
    SpaceInvaders.BarricadeFormation = BarricadeFormation;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=BarricadeFormation.js.map