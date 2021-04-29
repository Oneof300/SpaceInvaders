namespace SpaceInvaders {
  import ƒ = FudgeCore;
  
  export class CollidableNode extends ƒ.Node {
    private readonly collisionBox: Rectangle;

    constructor(_name: string, _pos: ƒ.Vector2 = ƒ.Vector2.ZERO(), _size: ƒ.Vector2 = ƒ.Vector2.ONE(), _offset?: ƒ.Vector2) {
      super(_name);

      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translateX(_pos.x);
      this.mtxLocal.translateY(_pos.y);

      this.collisionBox = new Rectangle(_pos, _size, _offset);
    }

    get width(): number { return this.collisionBox.width; }
    set width(_value: number) {
      this.collisionBox.width = _value;
      this.onCollisionBoxChanged?.call(this, this.collisionBox);
    }
    get height(): number { return this.collisionBox.height; }
    set height(_value: number) {
      this.collisionBox.height = _value;
      this.onCollisionBoxChanged?.call(this, this.collisionBox);
    }
    get left(): number {
      this.updateCollisionBoxPosition();
      return this.collisionBox.left;
    }
    set left(_value: number) {
      this.updateCollisionBoxPosition();
      this.collisionBox.left = _value;
      this.onCollisionBoxChanged?.call(this, this.collisionBox);
    }
    get top(): number {
      this.updateCollisionBoxPosition();
      return this.collisionBox.top;
    }
    set top(_value: number) {
      this.updateCollisionBoxPosition();
      this.collisionBox.top = _value;
      this.onCollisionBoxChanged?.call(this, this.collisionBox);
    }
    get right(): number {
      this.updateCollisionBoxPosition();
      return this.collisionBox.right;
    }
    set right(_value: number) {
      this.updateCollisionBoxPosition();
      this.collisionBox.right = _value;
      this.onCollisionBoxChanged?.call(this, this.collisionBox);
    }
    get bottom(): number {
      this.updateCollisionBoxPosition();
      return this.collisionBox.bottom;
    }
    set bottom(_value: number) {
      this.updateCollisionBoxPosition();
      this.collisionBox.bottom = _value;
      this.onCollisionBoxChanged?.call(this, this.collisionBox);
    }

    collides(_other: CollidableNode): boolean {
      this.updateCollisionBoxPosition();
      _other.updateCollisionBoxPosition();
      if (this.collisionBox.collides(_other.collisionBox)) {
        //console.log(this.name + " collided with " + _other.name);
        this.onCollision?.call(this, _other);
        _other.onCollision?.call(_other, this);
        return true;
      }
      return false;
    }

    getChildren(): CollidableNode[] {
      return super.getChildren() as CollidableNode[];
    }

    getActiveChildren(): CollidableNode[] {
      return this.getChildren().filter(inv => inv.isActive);
    }

    getActiveChild(_index: number): CollidableNode {
      return this.getActiveChildren()[_index];
    }

    protected onCollision?(_other: CollidableNode): void;
    protected onCollisionBoxChanged?(_collisionBox: Rectangle): void;

    private updateCollisionBoxPosition(): void {
      this.collisionBox.x = this.mtxWorld.translation.x;
      this.collisionBox.y = this.mtxWorld.translation.y;
    }
  }
}