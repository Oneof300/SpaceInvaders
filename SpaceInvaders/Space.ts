namespace SpaceInvaders {
  import ƒ = FudgeCore;

  export class Space {
    static readonly border: Rectangle = new Rectangle(new ƒ.Vector2(0, 78), new ƒ.Vector2(194, 182));
    static readonly node: ƒ.Node = new ƒ.Node("Space");

    static addChild(_child: ƒ.Node): void {
      this.node.addChild(_child);
    }
  }

}