namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class MotherShip extends QuadNode {
      static readonly color: ƒ.Color = new ƒ.Color(0.8, 0.1, 0.1, 1);
      private static _instance: MotherShip;
  
      private constructor() {
        let pos: ƒ.Vector2 = new ƒ.Vector2();
        pos.x = 75 / 13;
        pos.y = 140 / 13;

        let scale: ƒ.Vector2 = new ƒ.Vector2();
        scale.x = 14 / 13;
        scale.y = 7 / 13;
  
        super("MotherShip", pos, scale);
  
        this.getComponent(ƒ.ComponentMaterial).clrPrimary = MotherShip.color;
      }

      static get instance(): MotherShip {
        if (this._instance == null) this._instance = new MotherShip();
        return this._instance;
      }
    }
  }