namespace SpaceInvaders {
  import ƒ = FudgeCore;
  
  export class Rectangle {
    private position: ƒ.Vector2;
    private size: ƒ.Vector2;
    private offset: ƒ.Vector2;

    constructor(_position: ƒ.Vector2 = ƒ.Vector2.ZERO(),
                _size: ƒ.Vector2 = ƒ.Vector2.ONE(),
                _offset: ƒ.Vector2 = ƒ.Vector2.SCALE(_size, -0.5)) {
      this.position = _position;
      this.size = _size;
      this.offset = _offset;
    }

    get x(): number {
      return this.position.x;
    }
    set x(_value: number) {
      this.position.x = _value;
    }
    get y(): number {
      return this.position.y;
    }
    set y(_value: number) {
      this.position.y = _value;
    }
    get offsetX(): number {
      return this.offset.x;
    }
    get offsetY(): number {
      return this.offset.y;
    }
    get width(): number {
      return this.size.x;
    }
    set width(_value: number) {
      this.offset.x -= (_value - this.width) / 2;
      this.size.x = _value;
    }
    get height(): number {
      return this.size.y;
    }
    set height(_value: number) {
        this.offset.y -= (_value - this.height) / 2;
        this.size.y = _value;
    }
    get left(): number {
      return this.position.x + this.offset.x;
    }
    set left(_value: number) {
      let difference: number = _value - this.left;
      this.offset.x += difference;
      this.size.x -= difference;
    }
    get right(): number {
      return this.left + this.width;
    }
    set right(_value: number) {
      this.size.x += _value - this.right;
    }
    get bottom(): number {
      return this.position.y + this.offset.y;
    }
    set bottom(_value: number) {
      let difference: number = _value - this.bottom;
      this.offset.y += difference;
      this.size.y -= difference;
    }
    get top(): number {
      return this.bottom + this.height;
    }
    set top(_value: number) {
      this.size.y += _value - this.top;
    }
    isInside(_point: ƒ.Vector2): boolean {
      throw new Error("Method not implemented.");
    }
    collides(_other: Rectangle): boolean {
      return this.left < _other.right && this.right > _other.left && this.bottom < _other.top && this.top > _other.bottom;
    }
    getIntersection(_rect: Rectangle): ƒ.Rectangle {
      throw new Error("Method not implemented.");
    }
    covers(_rect: Rectangle): boolean {
      throw new Error("Method not implemented.");
    }
  }
}