namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class Barricade extends CollidableNode {
      static readonly color: ƒ.Color = new ƒ.Color(0.5, 0.5, 0.5, 1);
      static readonly width: number = 24;
      static readonly height: number = 17;

      private static readonly stripeWidth: number = 1;
      private static readonly stripeHeights: number[] = [13, 14, 15, 16, 17, 17, 15, 14, 13, 13, 13, 13];

      private static count: number = 0;

      constructor(_pos: ƒ.Vector2) {  
        super("Barricade" + (Barricade.count++), _pos, new ƒ.Vector2(Barricade.width, Barricade.height));

        for (let stripeIndex: number = 0; stripeIndex < Barricade.width; ++stripeIndex) {
          let size: ƒ.Vector2 = new ƒ.Vector2();
          size.x = Barricade.stripeWidth;
          size.y = Barricade.stripeHeights[stripeIndex > 11 ? Barricade.width - 2 - stripeIndex : stripeIndex];

          let pos: ƒ.Vector2 = new ƒ.Vector2();
          pos.x = (stripeIndex - (Barricade.width - 1) / 2) * Barricade.stripeWidth;
          pos.y = stripeIndex > 5 && stripeIndex < 18 ? Barricade.height - size.y : 0;

          this.addChild(new BarricadeStripe(pos, size));
        }
      }

      protected onCollision(_other: CollidableNode): void {
        if (_other instanceof Projectile) {
          let collidedStripe: BarricadeStripe = (this.getChildren() as BarricadeStripe[]).find(stripe => stripe.collides(_other));
          
          if (collidedStripe != undefined) {
            let collidedStripeIndex: number = this.getChildren().indexOf(collidedStripe);
            let stripeLeft: BarricadeStripe = (this.getChild(collidedStripeIndex - 1) as BarricadeStripe);
            let stripeRight0: BarricadeStripe = (this.getChild(collidedStripeIndex + 1) as BarricadeStripe);
            let stripeRight1: BarricadeStripe = (this.getChild(collidedStripeIndex + 2) as BarricadeStripe);
            let collidedFromAbove: boolean = _other.dir < 0;
            
            if (collidedStripe.shrink(collidedFromAbove, 4)) this.removeChild(collidedStripe);
            if (stripeLeft != undefined && stripeLeft.shrink(collidedFromAbove, 2)) this.removeChild(stripeLeft);
            if (stripeRight0 != undefined && stripeRight0.shrink(collidedFromAbove, 4)) this.removeChild(stripeRight0);
            if (stripeRight1 != undefined && stripeRight1.shrink(collidedFromAbove, 2)) this.removeChild(stripeRight1);
          }
        }
      }
    }
  }