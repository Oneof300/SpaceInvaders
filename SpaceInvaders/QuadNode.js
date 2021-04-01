"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class QuadNode extends ƒ.Node {
        constructor(_name, _pos, _scale) {
            super(_name);
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            let cmpMesh = new ƒ.ComponentMesh(QuadNode.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            this.addComponent(cmpMesh);
        }
    }
    QuadNode.mesh = new ƒ.MeshQuad("Quad");
    SpaceInvaders.QuadNode = QuadNode;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=QuadNode.js.map