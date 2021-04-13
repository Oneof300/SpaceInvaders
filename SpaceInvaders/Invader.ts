namespace SpaceInvaders {
  import ƒ = FudgeCore;

  export class Invader extends QuadNode {
    static readonly color: ƒ.Color = new ƒ.Color(0, 0.6, 0.4, 1);
    static readonly width: number = 12;
    static readonly height: number = 8;
    
    private static count: number = 0;

    constructor(_pos: ƒ.Vector2) {
      super("Invader" + (++Invader.count), _pos, new ƒ.Vector2(Invader.width, Invader.height));
      this.getComponent(ƒ.ComponentMaterial).clrPrimary = Invader.color;
    }
  }
}