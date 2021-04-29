namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class BarricadeStripe extends QuadNode {
      private static count: number = 0;

      private startTop: number;
      private startBottom: number;

      constructor(_pos: ƒ.Vector2, _size: ƒ.Vector2) {
        super("BarricadeStripe" + (BarricadeStripe.count++), _pos, _size, new ƒ.Vector2(-_size.x / 2, -Barricade.height / 2));
        this.getComponent(ƒ.ComponentMaterial).clrPrimary = Barricade.color;
        this.mtxWorld.translation = this.mtxLocal.translation;
        this.startTop = this.top;
        this.startBottom = this.bottom;
      }
      
      shrink(_collidedFromAbove: boolean, _amount: number): void {
        if (_collidedFromAbove) {
          if (this.top - _amount > this.bottom) this.top -= _amount;
          else this.activate(false);
        }
        else {
          if (this.bottom + _amount < this.top) this.bottom += _amount;
          else this.activate(false);
        }
      }

      reset(): void {
        this.mtxWorld.translation = this.mtxLocal.translation;
        this.top = this.startTop;
        this.bottom = this.startBottom;
        //console.log("top:", this.startTop, "bottom:", this.startBottom);
        this.activate(true);
      }
    }
  }