"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Barricade extends SpaceInvaders.CollidableNode {
        constructor(_pos) {
            super("Barricade" + (Barricade.count++), _pos, new ƒ.Vector2(Barricade.width, Barricade.height));
            for (let stripeIndex = 0; stripeIndex < Barricade.width; ++stripeIndex) {
                let size = new ƒ.Vector2();
                size.x = Barricade.stripeWidth;
                size.y = Barricade.stripeHeights[stripeIndex > 11 ? Barricade.width - 2 - stripeIndex : stripeIndex];
                let pos = new ƒ.Vector2();
                pos.x = (stripeIndex - (Barricade.width - 1) / 2) * Barricade.stripeWidth;
                pos.y = stripeIndex > 5 && stripeIndex < 18 ? Barricade.height - size.y : 0;
                this.addChild(new SpaceInvaders.BarricadeStripe(pos, size));
            }
        }
        reset() {
            this.getChildren().forEach(stripe => stripe.reset());
        }
        onCollision(_projectile) {
            let collidedStripe = this.getActiveChildren().find(stripe => stripe.collides(_projectile));
            if (collidedStripe != undefined) {
                let collidedFromAbove = _projectile.dir < 0;
                let collidedStripeIndex = this.getChildren().indexOf(collidedStripe);
                collidedStripe.shrink(collidedFromAbove, 4);
                this.getChild(collidedStripeIndex - 1)?.shrink(collidedFromAbove, 2);
                this.getChild(collidedStripeIndex + 1)?.shrink(collidedFromAbove, 4);
                this.getChild(collidedStripeIndex + 2)?.shrink(collidedFromAbove, 2);
            }
        }
    }
    Barricade.color = new ƒ.Color(0.5, 0.5, 0.5, 1);
    Barricade.width = 24;
    Barricade.height = 17;
    Barricade.stripeWidth = 1;
    Barricade.stripeHeights = [13, 14, 15, 16, 17, 17, 15, 14, 13, 13, 13, 13];
    Barricade.count = 0;
    SpaceInvaders.Barricade = Barricade;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Barricade.js.map