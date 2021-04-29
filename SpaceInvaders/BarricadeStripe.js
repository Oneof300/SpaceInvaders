"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class BarricadeStripe extends SpaceInvaders.QuadNode {
        constructor(_pos, _size) {
            super("BarricadeStripe" + (BarricadeStripe.count++), _pos, _size, new ƒ.Vector2(-_size.x / 2, -SpaceInvaders.Barricade.height / 2));
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = SpaceInvaders.Barricade.color;
            this.mtxWorld.translation = this.mtxLocal.translation;
            this.startTop = this.top;
            this.startBottom = this.bottom;
        }
        shrink(_collidedFromAbove, _amount) {
            if (_collidedFromAbove) {
                if (this.top - _amount > this.bottom)
                    this.top -= _amount;
                else
                    this.activate(false);
            }
            else {
                if (this.bottom + _amount < this.top)
                    this.bottom += _amount;
                else
                    this.activate(false);
            }
        }
        reset() {
            this.mtxWorld.translation = this.mtxLocal.translation;
            this.top = this.startTop;
            this.bottom = this.startBottom;
            //console.log("top:", this.startTop, "bottom:", this.startBottom);
            this.activate(true);
        }
    }
    BarricadeStripe.count = 0;
    SpaceInvaders.BarricadeStripe = BarricadeStripe;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=BarricadeStripe.js.map