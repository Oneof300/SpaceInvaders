"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class BarricadeStripe extends SpaceInvaders.QuadNode {
        constructor(_id, _pos, _size) {
            super("BarricadeStripe" + _id, _pos, _size, new ƒ.Vector2(-_size.x / 2, -SpaceInvaders.Barricade.height / 2));
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = SpaceInvaders.Barricade.color;
        }
        shrink(_collidedFromAbove, _amount) {
            if (_collidedFromAbove) {
                if (this.top - _amount <= this.bottom)
                    return true;
                console.log(this.bottom);
                console.log(this.top);
                this.top -= _amount;
            }
            else {
                if (this.bottom >= this.top)
                    return true;
                console.log(this.top);
                console.log(this.bottom);
                this.bottom += _amount;
            }
            return false;
        }
    }
    SpaceInvaders.BarricadeStripe = BarricadeStripe;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=BarricadeStripe.js.map