namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class Projectile extends QuadNode {
      static material: ƒ.Material = new ƒ.Material("ProjectileMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
      private static count: number = 0;
  
      constructor(_pos: ƒ.Vector2) {
        let scale: ƒ.Vector2 = new ƒ.Vector2();
        scale.x = 1 / 13;
        scale.y = 5 / 13;
  
        super("Projectile" + (++Projectile.count), _pos, scale);
  
        this.addComponent(new ƒ.ComponentMaterial(Projectile.material));
      }
    }
  }