namespace SpaceInvaders {
  import ƒ = FudgeCore;

  export class Invader extends QuadNode {
    static readonly color: ƒ.Color = new ƒ.Color(0, 0.6, 0.4, 1);
    static readonly texture0: ƒ.TextureImage = new ƒ.TextureImage("./Textures/Invader0.png");
    static readonly texture1: ƒ.TextureImage = new ƒ.TextureImage("./Textures/Invader1.png");
    static readonly coat0: ƒ.CoatTextured = new ƒ.CoatTextured(Invader.color, Invader.texture0);
    static readonly coat1: ƒ.CoatTextured = new ƒ.CoatTextured(Invader.color, Invader.texture1);
    static readonly mtr: ƒ.Material = new ƒ.Material("InvaderMat", ƒ.ShaderTexture, Invader.coat0);

    static readonly width: number = 12;
    static readonly height: number = 8;
    
    private static count: number = 0;

    constructor(_pos: ƒ.Vector2) {
      super("Invader" + (++Invader.count), _pos, new ƒ.Vector2(Invader.width, Invader.height));
      this.getComponent(ƒ.ComponentMaterial).material = Invader.mtr;

      /*let cmpAudio: ƒ.ComponentAudio = new ƒ.ComponentAudio(new ƒ.Audio(""), false);
      this.addComponent(cmpAudio);
      cmpAudio.play(true);*/
    }

    protected onCollision(_other: CollidableNode): void {
      if (_other instanceof Projectile || _other instanceof Ship) {
        this.activate(false);
        if (_other instanceof Projectile) Game.increaseScore();
      }
    }
  }
}