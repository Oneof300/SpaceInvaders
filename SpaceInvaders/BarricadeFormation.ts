namespace SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class BarricadeFormation extends CollidableNode {
      private static _instance: BarricadeFormation;
  
      private constructor(_pos: ƒ.Vector2, _barricadeCount: number, _spacing: number) {
        super("BarricadeFormation", _pos,
              new ƒ.Vector2((_barricadeCount - 1) * _spacing + Barricade.width, Barricade.height),
              new ƒ.Vector2(-((_barricadeCount - 1) * _spacing + Barricade.width) / 2, 0));

        for (let barricadeIndex: number = 0; barricadeIndex < _barricadeCount; ++barricadeIndex) {
          this.addChild(new Barricade(new ƒ.Vector2((barricadeIndex - (_barricadeCount - 1) / 2) * _spacing, 0)));
        }
      }

      static get instance(): BarricadeFormation {
        if (this._instance == undefined) {
          this._instance = new BarricadeFormation(
            Game.properties.barricadeFormation.position,
            Game.properties.barricadeFormation.barricades,
            Game.properties.barricadeFormation.spacing
          );
        }
        return this._instance;
      }

      reset(): void {
        (this.getChildren() as Barricade[]).forEach(barricade => barricade.reset());
      }

      protected onCollision(_other: CollidableNode): void {
        if (_other instanceof Projectile) {
          this.getChildren().find(barricade => barricade.collides(_other));
        }
      }
    }
  }