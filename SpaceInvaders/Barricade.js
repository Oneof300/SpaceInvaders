"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Barricade extends ƒ.Node {
        constructor(_pos) {
            super("Barricade" + (++Barricade.count));
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            for (let stripeIndex = 0; stripeIndex < Barricade.stripeCount; ++stripeIndex) {
                let id = stripeIndex + Barricade.count * Barricade.stripeCount;
                let width = Barricade.width / Barricade.stripeCount;
                let pos = new ƒ.Vector2();
                pos.x = (stripeIndex - (Barricade.stripeCount - 1) / 2) * width;
                pos.y = Barricade.stripeYOffsets[stripeIndex] / 13;
                let scale = new ƒ.Vector2();
                scale.x = width;
                scale.y = Barricade.stripeHeights[stripeIndex] / 13;
                let stripe = new SpaceInvaders.QuadNode("BarricadeStripe" + id, pos, scale);
                stripe.getComponent(ƒ.ComponentMaterial).clrPrimary = Barricade.color;
                this.addChild(stripe);
            }
        }
    }
    Barricade.color = new ƒ.Color(0.5, 0.5, 0.5, 1);
    Barricade.width = 24 / 13;
    Barricade.stripeCount = 24;
    Barricade.stripeHeights = [13, 14, 15, 16, 17, 17, 15, 14, 13, 13, 13, 13, 13, 13, 13, 13, 14, 15, 17, 17, 16, 15, 14, 13];
    Barricade.stripeYOffsets = [-2, -1.5, -1, -0.5, 0, 0, 1, 1.5, 2, 2, 2, 2, 2, 2, 2, 2, 1.5, 1, 0, 0, -0.5, -1, -1.5, -2];
    Barricade.count = 0;
    SpaceInvaders.Barricade = Barricade;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Barricade.js.map