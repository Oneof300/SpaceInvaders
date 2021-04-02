namespace SpaceInvaders {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);
  let viewport: ƒ.Viewport = new ƒ.Viewport();

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    let space: ƒ.Node = new ƒ.Node("Space");
    
    space.addChild(Ship.instance);
    space.addChild(MotherShip.instance);

    let invaders: ƒ.Node = new ƒ.Node("Invaders");
    let columnCount: number = 11;
    let rowCount: number = 5;

    for (let row: number = 0; row < rowCount; ++row) {
      for (let column: number = 0; column < columnCount; ++column) {
        let pos: ƒ.Vector2 = new ƒ.Vector2();
        pos.x = (column - (columnCount - 1) / 2) * 16 / 13;
        pos.y = (row * 16 + 65) / 13;

        invaders.addChild(new Invader(pos));
      }
    }

    space.addChild(invaders);

    let barricades: ƒ.Node = new ƒ.Node("Barricades");
    let barricadeCount: number = 4;

    for (let barricadeIndex: number = 0; barricadeIndex < barricadeCount; ++barricadeIndex) {
      let pos: ƒ.Vector2 = new ƒ.Vector2();
      pos.x = (barricadeIndex - (barricadeCount - 1) / 2) * 48 / 13;
      pos.y = 24 / 13;
      
      barricades.addChild(new Barricade(pos));
    }

    space.addChild(barricades);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(18);
    cmpCamera.mtxPivot.translateY(77 / 13);
    cmpCamera.mtxPivot.rotateY(180);
    cmpCamera.mtxPivot.scaleX(1);
    console.log(cmpCamera);

    viewport.initialize("Viewport", space, cmpCamera, canvas);
    viewport.draw();

    console.log(space);

    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
  }

  function update(_event: Event): void {
    // console.log(_event);
    viewport.draw();
  }
}