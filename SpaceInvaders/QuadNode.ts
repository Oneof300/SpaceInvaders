namespace SpaceInvaders {
  import ƒ = FudgeCore;

  let quadMesh: ƒ.Mesh = new ƒ.MeshQuad("Quad");
  quadMesh.vertices[0] = 0;
  quadMesh.vertices[1] = 1;
  quadMesh.vertices[3] = 0;
  quadMesh.vertices[4] = 0;
  quadMesh.vertices[6] = 1;
  quadMesh.vertices[7] = 0;
  quadMesh.vertices[9] = 1;
  quadMesh.vertices[10] = 1;
  console.log(quadMesh);
  
  export class QuadNode extends CollidableNode {
    static mesh: ƒ.Mesh = quadMesh;
    static material: ƒ.Material = new ƒ.Material("QuadMat", ƒ.ShaderUniColor, new ƒ.CoatColored());

    private cmpMesh: ƒ.ComponentMesh;

    constructor(_name: string, _pos: ƒ.Vector2, _size: ƒ.Vector2, _offset: ƒ.Vector2 = ƒ.Vector2.SCALE(_size, -0.5)) {
      super(_name, _pos, _size, _offset);

      this.cmpMesh = new ƒ.ComponentMesh(QuadNode.mesh);
      this.cmpMesh.mtxPivot.scaleX(_size.x);
      this.cmpMesh.mtxPivot.scaleY(_size.y);
      this.cmpMesh.mtxPivot.translateX(_offset.x, false);
      this.cmpMesh.mtxPivot.translateY(_offset.y, false);
      this.addComponent(this.cmpMesh);
      this.addComponent(new ƒ.ComponentMaterial(QuadNode.material));
    }

    protected onCollisionBoxChanged(_collisionBox: Rectangle): void {
      this.cmpMesh.mtxPivot.scaleX(_collisionBox.width / this.cmpMesh.mtxPivot.scaling.x);
      this.cmpMesh.mtxPivot.scaleY(_collisionBox.height / this.cmpMesh.mtxPivot.scaling.y);
      this.cmpMesh.mtxPivot.translateX(_collisionBox.offsetX - this.cmpMesh.mtxPivot.translation.x, false);
      this.cmpMesh.mtxPivot.translateY(_collisionBox.offsetY - this.cmpMesh.mtxPivot.translation.y, false);
    }
  }
}