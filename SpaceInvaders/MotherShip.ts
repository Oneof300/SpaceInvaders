namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class MotherShip extends QuadNode {
      static instance: MotherShip;
      static material: ƒ.Material = new ƒ.Material("MotherShipMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0.2, 0.2, 1)));
  
      private constructor() {
        let pos: ƒ.Vector2 = new ƒ.Vector2();
        pos.x = 75 / 13;
        pos.y = 140 / 13;

        let scale: ƒ.Vector2 = new ƒ.Vector2();
        scale.x = 14 / 13;
        scale.y = 7 / 13;
  
        super("MotherShip", pos, scale);
  
        this.addComponent(new ƒ.ComponentMaterial(MotherShip.material));
      }

      static getInstance(): Invader {
        if (this.instance == null) this.instance = new MotherShip();
        return this.instance;
      }
    }
  }