"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Barricade extends SpaceInvaders.CollidableNode {
        constructor(_pos) {
            super("Barricade" + (++Barricade.count), _pos, new ƒ.Vector2(Barricade.width, Barricade.height));
            for (let stripeIndex = 0; stripeIndex < Barricade.width; ++stripeIndex) {
                let id = stripeIndex + Barricade.count * Barricade.width;
                let size = new ƒ.Vector2();
                size.x = Barricade.stripeWidth;
                size.y = Barricade.stripeHeights[stripeIndex > 11 ? Barricade.width - 2 - stripeIndex : stripeIndex];
                let pos = new ƒ.Vector2();
                pos.x = (stripeIndex - (Barricade.width - 1) / 2) * Barricade.stripeWidth;
                pos.y = stripeIndex > 5 && stripeIndex < 18 ? Barricade.height - size.y : 0;
                this.addChild(new SpaceInvaders.BarricadeStripe(id, pos, size));
            }
        }
        onCollision(_other) {
            if (_other instanceof SpaceInvaders.Projectile) {
                let collidedStripe = this.getChildren().find(stripe => stripe.collides(_other));
                if (collidedStripe != undefined) {
                    let collidedStripeIndex = this.getChildren().indexOf(collidedStripe);
                    let stripeLeft = this.getChild(collidedStripeIndex - 1);
                    let stripeRight0 = this.getChild(collidedStripeIndex + 1);
                    let stripeRight1 = this.getChild(collidedStripeIndex + 2);
                    let collidedFromAbove = _other.dir < 0;
                    if (collidedStripe.shrink(collidedFromAbove, 4))
                        this.removeChild(collidedStripe);
                    if (stripeLeft != undefined && stripeLeft.shrink(collidedFromAbove, 2))
                        this.removeChild(stripeLeft);
                    if (stripeRight0 != undefined && stripeRight0.shrink(collidedFromAbove, 4))
                        this.removeChild(stripeRight0);
                    if (stripeRight1 != undefined && stripeRight1.shrink(collidedFromAbove, 2))
                        this.removeChild(stripeRight1);
                }
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