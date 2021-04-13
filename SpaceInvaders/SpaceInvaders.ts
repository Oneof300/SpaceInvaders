namespace SpaceInvaders {
  import ƒ = FudgeCore;

  export const space: ƒ.Node = new ƒ.Node("Space");
  export let border: Rectangle = new Rectangle(new ƒ.Vector2(0, 78), new ƒ.Vector2(182, 182));

  let viewport: ƒ.Viewport = new ƒ.Viewport();
  window.addEventListener("load", init);

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    console.log(border);
    
    space.addChild(Ship.instance);
    space.addChild(MotherShip.instance);
    space.addChild(InvaderWave.createWave(new ƒ.Vector2(0, 100), 5, 11, 16));
    space.addChild(BarricadeFormation.createFormation(new ƒ.Vector2(0, 24.5), 4, 48));

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(234);
    cmpCamera.mtxPivot.translateY(77);
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
    viewport.draw();
  }
}