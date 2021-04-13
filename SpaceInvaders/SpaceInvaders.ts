namespace SpaceInvaders {
  import ƒ = FudgeCore;

  export const space: ƒ.Node = new ƒ.Node("Space");
  export const border: Rectangle = new Rectangle(new ƒ.Vector2(0, 78), new ƒ.Vector2(194, 182));
  export let gameState: GameState = GameState.running;

  let viewport: ƒ.Viewport = new ƒ.Viewport();
  window.addEventListener("load", init);

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    console.log(border);

    space.addChild(Ship.instance);
    space.addChild(MotherShip.instance);
    space.addChild(InvaderWave.createWave(new ƒ.Vector2(0, 96), 5, 11, 16));
    space.addChild(BarricadeFormation.createFormation(new ƒ.Vector2(0, 16), 4, 48));
    
    Ship.instance.vel = 0.2;
    Ship.instance.projectiles.size = 2;
    Ship.instance.projectileVel = 0.15;
    InvaderWave.instance.velMax = 0.4;
    InvaderWave.instance.projectiles.size = 2;
    InvaderWave.instance.projectileVel = 0.1;

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