namespace SpaceInvaders {
  import ƒ = FudgeCore;
  
  export class Invader extends QuadNode {
    static material: ƒ.Material = new ƒ.Material("InvaderMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.5, 1, 0.1, 1)));
    private static count: number = 0;

    constructor(_pos: ƒ.Vector2) {
      let scale: ƒ.Vector2 = new ƒ.Vector2();
      scale.x = 12 / 13;
      scale.y = 8 / 13;

      super("Invader" + (++Invader.count), _pos, scale);

      this.addComponent(new ƒ.ComponentMaterial(Invader.material));
    }
  }
}