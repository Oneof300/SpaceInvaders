namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class Ship extends QuadNode {
      static instance: Ship;
      static material: ƒ.Material = new ƒ.Material("ShipMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.3, 0.7, 1, 1)));
  
      private constructor() {
        let scale: ƒ.Vector2 = new ƒ.Vector2();
        scale.x = 1;
        scale.y = 7 / 13;
  
        super("Ship", new ƒ.Vector2(), scale);
  
        this.addComponent(new ƒ.ComponentMaterial(Ship.material));
      }

      static getInstance(): Invader {
          if (this.instance == null) this.instance = new Ship();
          return this.instance;
      }
    }
  }