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

    for (var y: number = 0; y < 5; ++y) {
      for (var x: number = 0; x < 11; ++x) {
        var invader: ƒ.Node = new ƒ.Node("Invader" + (x + y * 11));

        invader.addComponent(new ƒ.ComponentTransform());
        invader.getComponent(ƒ.ComponentTransform).mtxLocal.translateX((x - 5) * 15 / 13);
        invader.getComponent(ƒ.ComponentTransform).mtxLocal.translateY((y * 15 + 65) / 13);

        invader.addComponent(new ƒ.ComponentMesh(quadMesh));
        invader.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(12 / 13);
        invader.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(8 / 13);

        invader.addComponent(new ƒ.ComponentMaterial(material));

        space.addChild(invader);
      }
    }

    var barricadeStripeCount: number = 21;
    var barricadeStripeHeights: number[] = [14, 15, 16, 17, 17, 12, 11, 10, 9, 8, 8, 8, 9, 10, 11, 12, 17, 17, 16, 15, 14];
    var barricadeStripeYOffsets: number[] = [-1.5, -1, -0.5, 0, 0, 2.5, 3, 3.5, 4, 4.5, 4.5, 4.5, 4, 3.5, 3, 2.5, 0, 0, -0.5, -1, -1.5];

    // tslint:disable-next-line: no-duplicate-variable
    for (var x: number = 0; x < 4; ++x) {
      var barricade: ƒ.Node = new ƒ.Node("Barricade" + x);
      
      barricade.addComponent(new ƒ.ComponentTransform());
      barricade.getComponent(ƒ.ComponentTransform).mtxLocal.translateX((x - 1.5) * 53 / 13);
      barricade.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(24 / 13);

      for (var x2: number; x < barricadeStripeCount; ++x) {
        var barricadeStripe: ƒ.Node = new ƒ.Node("BarricadeStripe" + (x2 + x * barricadeStripeCount));
        
        var posX: number = x - (barricadeStripeCount - 1) / 2;
        var scaleX: number = 21 / (barricadeStripeCount * 13);

        barricadeStripe.addComponent(new ƒ.ComponentTransform());
        barricadeStripe.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(posX * scaleX);
        barricadeStripe.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(barricadeStripeYOffsets[x] / 13);

        barricadeStripe.addComponent(new ƒ.ComponentMesh(quadMesh));
        barricadeStripe.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(scaleX);
        barricadeStripe.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(barricadeStripeHeights[x] / 13);

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