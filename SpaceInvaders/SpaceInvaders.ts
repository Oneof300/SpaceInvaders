namespace SpaceInvaders {
  import ƒ = FudgeCore;

  let viewport: ƒ.Viewport = new ƒ.Viewport();
  window.addEventListener("load", init);

  let rect: ƒ.Rectangle = new ƒ.Rectangle(0, 0, 10, 10);
  rect.right = rect.left + 10;
  console.log("bottom:", rect.bottom, "top:", rect.top, "left:", rect.left, "right:", rect.right);

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    Game.properties = new GameProperties({
      ships: 3,
      ship: new ShipProperties({
        velocity: 0.15,
        projectiles: 2,
        projectileVelocity: 0.15
      }),
      invaderWave: new InvaderWaveProperties({
        startPosition: new ƒ.Vector2(0, 96),
        columns: 11,
        rows: 5,
        spacing: 16,
        velocityMax: 0.3,
        projectiles: 3,
        projectileVelocity: 0.05
      }),
      barricadeFormation: new BarricadeFormationProperties({
        position: new ƒ.Vector2(0, 16),
        barricades: 4,
        spacing: 48
      })
    });

    Space.addChild(Ship.instance);
    Space.addChild(MotherShip.instance);
    Space.addChild(InvaderWave.instance);
    Space.addChild(BarricadeFormation.instance);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(234);
    cmpCamera.mtxPivot.translateY(77);
    cmpCamera.mtxPivot.rotateY(180);
    cmpCamera.mtxPivot.scaleX(1);
    console.log(cmpCamera);

    viewport.initialize("Viewport", Space.node, cmpCamera, canvas);
    viewport.draw();

    console.log(Space.node);

    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
  }

  function update(_event: Event): void {
    viewport.draw();
  }
}