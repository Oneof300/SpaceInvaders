namespace SpaceInvaders {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);
  let viewport: ƒ.Viewport = new ƒ.Viewport();

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    let space: ƒ.Node = new ƒ.Node("Space");

    let quadMesh: ƒ.Mesh = new ƒ.MeshQuad("Quad");
    let material: ƒ.Material = new ƒ.Material("Florian", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));

    let playerCharacter: ƒ.Node = new ƒ.Node("PlayerCharacter");

    playerCharacter.addComponent(new ƒ.ComponentTransform());
    playerCharacter.addComponent(new ƒ.ComponentMesh(quadMesh));
    playerCharacter.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(7 / 13);
    playerCharacter.addComponent(new ƒ.ComponentMaterial(material));

    space.addChild(playerCharacter);

    let motherShip: ƒ.Node = new ƒ.Node("PlayerCharacter");

    motherShip.addComponent(new ƒ.ComponentTransform());
    motherShip.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(75 / 13);
    motherShip.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(140 / 13);

    motherShip.addComponent(new ƒ.ComponentMesh(quadMesh));
    motherShip.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(14 / 13);
    motherShip.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(7 / 13);

    motherShip.addComponent(new ƒ.ComponentMaterial(material));

    space.addChild(motherShip);

    for (let column: number = 0; column < 5; ++column) {
      for (let row: number = 0; row < 11; ++row) {
        let invader: ƒ.Node = new ƒ.Node("Invader" + (row + column * 11));

        invader.addComponent(new ƒ.ComponentTransform());
        invader.getComponent(ƒ.ComponentTransform).mtxLocal.translateX((row - 5) * 15 / 13);
        invader.getComponent(ƒ.ComponentTransform).mtxLocal.translateY((column * 15 + 65) / 13);

        invader.addComponent(new ƒ.ComponentMesh(quadMesh));
        invader.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(12 / 13);
        invader.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(8 / 13);

        invader.addComponent(new ƒ.ComponentMaterial(material));

        space.addChild(invader);
      }
    }

    let barricadeStripeCount: number = 21;
    let barricadeStripeHeights: number[] = [14, 15, 16, 17, 17, 12, 11, 10, 9, 8, 8, 8, 9, 10, 11, 12, 17, 17, 16, 15, 14];
    let barricadeStripeYOffsets: number[] = [-1.5, -1, -0.5, 0, 0, 2.5, 3, 3.5, 4, 4.5, 4.5, 4.5, 4, 3.5, 3, 2.5, 0, 0, -0.5, -1, -1.5];

    for (let barricadeIndex: number = 0; barricadeIndex < 4; ++barricadeIndex) {
      let barricade: ƒ.Node = new ƒ.Node("Barricade" + barricadeIndex);
      
      barricade.addComponent(new ƒ.ComponentTransform());
      barricade.getComponent(ƒ.ComponentTransform).mtxLocal.translateX((barricadeIndex - 1.5) * 53 / 13);
      barricade.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(24 / 13);

      for (let barricadeStripeIndex: number = 0; barricadeStripeIndex < barricadeStripeCount; ++barricadeStripeIndex) {
        let barricadeStripe: ƒ.Node = new ƒ.Node("BarricadeStripe" + (barricadeStripeIndex + barricadeIndex * barricadeStripeCount));
        
        let posX: number = barricadeStripeIndex - (barricadeStripeCount - 1) / 2;
        let scaleX: number = 21 / (barricadeStripeCount * 13);

        barricadeStripe.addComponent(new ƒ.ComponentTransform());
        barricadeStripe.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(posX * scaleX);
        barricadeStripe.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(barricadeStripeYOffsets[barricadeStripeIndex] / 13);

        barricadeStripe.addComponent(new ƒ.ComponentMesh(quadMesh));
        barricadeStripe.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(scaleX);
        barricadeStripe.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(barricadeStripeHeights[barricadeStripeIndex] / 13);

        barricadeStripe.addComponent(new ƒ.ComponentMaterial(material));

        barricade.addChild(barricadeStripe);
      }

      space.addChild(barricade);
    }
    
    let projectile0: ƒ.Node = new ƒ.Node("Projektile0");

    projectile0.addComponent(new ƒ.ComponentTransform());
    projectile0.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(1);

    projectile0.addComponent(new ƒ.ComponentMesh(quadMesh));
    projectile0.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(1 / 13);
    projectile0.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(5 / 13);

    projectile0.addComponent(new ƒ.ComponentMaterial(material));

    space.addChild(projectile0);
    
    let projectile1: ƒ.Node = new ƒ.Node("Projektile1");

    projectile1.addComponent(new ƒ.ComponentTransform());
    projectile1.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(-45 / 13);
    projectile1.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(4);

    projectile1.addComponent(new ƒ.ComponentMesh(quadMesh));
    projectile1.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(1 / 13);
    projectile1.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(5 / 13);

    projectile1.addComponent(new ƒ.ComponentMaterial(material));

    space.addChild(projectile1);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(18);
    cmpCamera.mtxPivot.translateY(77 / 13);
    cmpCamera.mtxPivot.rotateY(180);
    console.log(cmpCamera);

    viewport.initialize("Viewport", space, cmpCamera, canvas);
    viewport.draw();
  }
}