namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class MotherShip extends QuadNode {
      static readonly color: ƒ.Color = new ƒ.Color(0.8, 0.1, 0.1, 1);
      static readonly texture: ƒ.TextureImage = new ƒ.TextureImage("./Textures/MotherShip.png");
      static readonly coat: ƒ.CoatTextured = new ƒ.CoatTextured(MotherShip.color, MotherShip.texture);
      static readonly mtr: ƒ.Material = new ƒ.Material("ShipMat", ƒ.ShaderTexture, MotherShip.coat);

      private static _instance: MotherShip;
  
      private constructor() {  
        super("MotherShip", new ƒ.Vector2(75, 140), new ƒ.Vector2(16, 7));
        this.getComponent(ƒ.ComponentMaterial).material = MotherShip.mtr;
      }

      static get instance(): MotherShip {
        if (this._instance == null) this._instance = new MotherShip();
        return this._instance;
      }
    }
  }