"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    let quadMesh = new ƒ.MeshQuad("Quad");
    quadMesh.vertices[0] = 0;
    quadMesh.vertices[1] = 1;
    quadMesh.vertices[3] = 0;
    quadMesh.vertices[4] = 0;
    quadMesh.vertices[6] = 1;
    quadMesh.vertices[7] = 0;
    quadMesh.vertices[9] = 1;
    quadMesh.vertices[10] = 1;
    console.log(quadMesh);
    class QuadNode extends SpaceInvaders.CollidableNode {
        constructor(_name, _pos, _size, _offset = ƒ.Vector2.SCALE(_size, -0.5)) {
            super(_name, _pos, _size, _offset);
            this.cmpMesh = new ƒ.ComponentMesh(QuadNode.mesh);
            this.cmpMesh.mtxPivot.scaleX(_size.x);
            this.cmpMesh.mtxPivot.scaleY(_size.y);
            this.cmpMesh.mtxPivot.translateX(_offset.x, false);
            this.cmpMesh.mtxPivot.translateY(_offset.y, false);
            this.addComponent(this.cmpMesh);
            this.addComponent(new ƒ.ComponentMaterial(QuadNode.material));
        }
        onCollisionBoxChanged(_collisionBox) {
            this.cmpMesh.mtxPivot.scaleX(_collisionBox.width / this.cmpMesh.mtxPivot.scaling.x);
            this.cmpMesh.mtxPivot.scaleY(_collisionBox.height / this.cmpMesh.mtxPivot.scaling.y);
            this.cmpMesh.mtxPivot.translateX(_collisionBox.offsetX - this.cmpMesh.mtxPivot.translation.x, false);
            this.cmpMesh.mtxPivot.translateY(_collisionBox.offsetY - this.cmpMesh.mtxPivot.translation.y, false);
        }
    }
    QuadNode.mesh = quadMesh;
    QuadNode.material = new ƒ.Material("UniColor", ƒ.ShaderUniColor, new ƒ.CoatColored());
    SpaceInvaders.QuadNode = QuadNode;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=QuadNode.js.map