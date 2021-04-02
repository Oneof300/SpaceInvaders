namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class Barricade extends ƒ.Node {
      static readonly color: ƒ.Color = new ƒ.Color(0.5, 0.5, 0.5, 1);
      
      private static readonly width: number = 24 / 13;
      private static readonly stripeCount: number = 24;
      private static readonly stripeHeights: number[] = [13, 14, 15, 16, 17, 17, 15, 14, 13, 13, 13, 13, 13, 13, 13, 13, 14, 15, 17, 17, 16, 15, 14, 13];
      private static readonly stripeYOffsets: number[] = [-2, -1.5, -1, -0.5, 0, 0, 1, 1.5, 2, 2, 2, 2, 2, 2, 2, 2, 1.5, 1, 0, 0, -0.5, -1, -1.5, -2];
      
      private static count: number = 0;

      constructor(_pos: ƒ.Vector2) {  
        super("Barricade" + (++Barricade.count));

        this.addComponent(new ƒ.ComponentTransform());
        this.mtxLocal.translateX(_pos.x);
        this.mtxLocal.translateY(_pos.y);

        for (let stripeIndex: number = 0; stripeIndex < Barricade.stripeCount; ++stripeIndex) {
          let id: number = stripeIndex + Barricade.count * Barricade.stripeCount;
          let width: number = Barricade.width / Barricade.stripeCount;

          let pos: ƒ.Vector2 = new ƒ.Vector2();
          pos.x = (stripeIndex - (Barricade.stripeCount - 1) / 2) * width;
          pos.y = Barricade.stripeYOffsets[stripeIndex] / 13;

          let scale: ƒ.Vector2 = new ƒ.Vector2();
          scale.x = width;
          scale.y = Barricade.stripeHeights[stripeIndex] / 13;

          let stripe: QuadNode = new QuadNode("BarricadeStripe" + id, pos, scale);
          stripe.getComponent(ƒ.ComponentMaterial).clrPrimary = Barricade.color;

          this.addChild(stripe);
        }
      }
    }
  }