namespace SpaceInvaders {
  import ƒ = FudgeCore;
  
  export class Invader extends QuadNode {
    static readonly color: ƒ.Color = new ƒ.Color(0, 0.6, 0.4, 1);
    private static count: number = 0;

    constructor(_pos: ƒ.Vector2) {
      super("Invader" + (++Invader.count), _pos, new ƒ.Vector2(12 / 13, 8 / 13));
      this.getComponent(ƒ.ComponentMaterial).clrPrimary = Invader.color;
    }
  }
}