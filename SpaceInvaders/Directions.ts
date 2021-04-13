namespace SpaceInvaders {
  import ƒ = FudgeCore;

  export enum HorizontalDirection {
    left = -1,
    right = 1,
    none = 0
  }

  export enum VerticalDirection {
    up = 1,
    down = -1,
    none = 0
  }

  export class Direction {
    static readonly left: ƒ.Vector2 = ƒ.Vector2.X(HorizontalDirection.left);
    static readonly right: ƒ.Vector2 = ƒ.Vector2.X(HorizontalDirection.right);
    static readonly up: ƒ.Vector2 = ƒ.Vector2.Y(VerticalDirection.up);
    static readonly down: ƒ.Vector2 = ƒ.Vector2.Y(VerticalDirection.down);
    static readonly none: ƒ.Vector2 = ƒ.Vector2.ZERO();
  }
  
}