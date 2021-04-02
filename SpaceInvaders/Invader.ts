namespace SpaceInvaders {
  import ƒ = FudgeCore;
  
  export class Invader extends QuadNode {
    static readonly color: ƒ.Color = new ƒ.Color(0, 0.6, 0.4, 1);
    private static count: number = 0;

    constructor(_pos: ƒ.Vector2) {
      let scale: ƒ.Vector2 = new ƒ.Vector2();
      scale.x = 12 / 13;
      scale.y = 8 / 13;

      super("Invader" + (++Invader.count), _pos, scale);

      this.getComponent(ƒ.ComponentMaterial).clrPrimary = Invader.color;
    }
  }
}