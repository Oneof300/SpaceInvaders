namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class BarricadeStripe extends QuadNode {
      private static count: number = 0;

      constructor(_pos: ƒ.Vector2, _size: ƒ.Vector2) {
        super("BarricadeStripe" + (BarricadeStripe.count++), _pos, _size, new ƒ.Vector2(-_size.x / 2, -Barricade.height / 2));
        this.getComponent(ƒ.ComponentMaterial).clrPrimary = Barricade.color;
      }
      
      shrink(_collidedFromAbove: boolean, _amount: number): boolean {
        if (_collidedFromAbove) {
          if (this.top - _amount <= this.bottom) return true;
          this.top -= _amount;
        }
        else {
          if (this.bottom >= this.top) return true;
          this.bottom += _amount;
        }
        return false;
      }
    }
  }