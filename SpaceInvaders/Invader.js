"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Invader extends SpaceInvaders.QuadNode {
        constructor(_pos) {
            super("Invader" + (++Invader.count), _pos, new ƒ.Vector2(Invader.width, Invader.height));
            this.getComponent(ƒ.ComponentMaterial).material = Invader.mtr;
            /*let cmpAudio: ƒ.ComponentAudio = new ƒ.ComponentAudio(new ƒ.Audio(""), false);
            this.addComponent(cmpAudio);
            cmpAudio.play(true);*/
        }
        onCollision(_other) {
            if (_other instanceof SpaceInvaders.Projectile || _other instanceof SpaceInvaders.Ship) {
                this.activate(false);
                if (_other instanceof SpaceInvaders.Projectile)
                    SpaceInvaders.Game.increaseScore();
            }
        }
    }
    Invader.color = new ƒ.Color(0, 0.6, 0.4, 1);
    Invader.texture0 = new ƒ.TextureImage("./Textures/Invader0.png");
    Invader.texture1 = new ƒ.TextureImage("./Textures/Invader1.png");
    Invader.coat0 = new ƒ.CoatTextured(Invader.color, Invader.texture0);
    Invader.coat1 = new ƒ.CoatTextured(Invader.color, Invader.texture1);
    Invader.mtr = new ƒ.Material("InvaderMat", ƒ.ShaderTexture, Invader.coat0);
    Invader.width = 12;
    Invader.height = 8;
    Invader.count = 0;
    SpaceInvaders.Invader = Invader;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Invader.js.map