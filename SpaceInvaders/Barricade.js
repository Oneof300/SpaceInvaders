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
                let width = 21 / (Barricade.stripeCount * 13);
                let pos = new ƒ.Vector2();
                pos.x = (stripeIndex - (Barricade.stripeCount - 1) / 2) * width;
                pos.y = Barricade.stripeYOffsets[stripeIndex] / 13;
                let scale = new ƒ.Vector2();
                scale.x = width;
                scale.y = Barricade.stripeHeights[stripeIndex] / 13;
                let stripe = new SpaceInvaders.QuadNode("BarricadeStripe" + id, pos, scale);
                stripe.addComponent(new ƒ.ComponentMaterial(Barricade.material));
                this.addChild(stripe);
            }
        }
    }
    Barricade.material = new ƒ.Material("BarricadeMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.6, 0.4, 0.4, 1)));
    Barricade.count = 0;
    Barricade.stripeCount = 21;
    Barricade.stripeHeights = [14, 15, 16, 17, 17, 12, 11, 10, 9, 8, 8, 8, 9, 10, 11, 12, 17, 17, 16, 15, 14];
    Barricade.stripeYOffsets = [-1.5, -1, -0.5, 0, 0, 2.5, 3, 3.5, 4, 4.5, 4.5, 4.5, 4, 3.5, 3, 2.5, 0, 0, -0.5, -1, -1.5];
    SpaceInvaders.Barricade = Barricade;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Barricade.js.map