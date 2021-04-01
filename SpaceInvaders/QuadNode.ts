namespace SpaceInvaders {
  import ƒ = FudgeCore;
  
  export class QuadNode extends ƒ.Node {
    static mesh: ƒ.Mesh = new ƒ.MeshQuad("Quad");

    constructor(_name: string, _pos: ƒ.Vector2, _scale: ƒ.Vector2) {
      super(_name);

      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translateX(_pos.x);
      this.mtxLocal.translateY(_pos.y);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(QuadNode.mesh);
      cmpMesh.mtxPivot.scaleX(_scale.x);
      cmpMesh.mtxPivot.scaleY(_scale.y);
      this.addComponent(cmpMesh);
    }
  }
}