namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class MotherShip extends QuadNode {
      static readonly color: ƒ.Color = new ƒ.Color(0.8, 0.1, 0.1, 1);
      private static _instance: MotherShip;
  
      private constructor() {  
        super("MotherShip", new ƒ.Vector2(75, 140), new ƒ.Vector2(14, 7));
        this.getComponent(ƒ.ComponentMaterial).clrPrimary = MotherShip.color;
      }

      static get instance(): MotherShip {
        if (this._instance == null) this._instance = new MotherShip();
        return this._instance;
      }
    }
  }