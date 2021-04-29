namespace SpaceInvaders {
  import ƒ = FudgeCore;
  
  export enum GameState {
    running,
    paused,
    over
  }

  export class Game {
    static properties: GameProperties;

    private static _score: number = 0;
    private static _shipsLeft: number = 3;
    private static state: GameState = GameState.running;

    private static readonly pauseKeys: string[] = [ƒ.KEYBOARD_CODE.ESC, ƒ.KEYBOARD_CODE.P];
    private static readonly restartKeys: string[] = [ƒ.KEYBOARD_CODE.ENTER, ƒ.KEYBOARD_CODE.R];
    private static readonly interestingKeys: string[] = Game.pauseKeys.concat(Game.restartKeys);
    private static pressedKeys: Array<string> = new Array();

    static get shipsLeft(): number {
      return Game._shipsLeft;
    }

    static get score(): number {
      return Game._score;
    }

    static get isRunning(): boolean {
      return Game.state == GameState.running;
    }

    static get isPaused(): boolean {
      return Game.state == GameState.paused;
    }

    static get isOver(): boolean {
      return Game.state == GameState.over;
    }

    static reduceShips(): void {
      if (--Game._shipsLeft <= 0) {
        Game._shipsLeft = 0;
        Game.end();
      }
      console.log("Ships left: " + Game.shipsLeft);
    }

    static increaseScore(): void {
      ++Game._score;
      console.log("Score: " + Game.score);
    }

    static pause(_millis?: number): void {
      if (Game.isRunning) {
        Game.state = GameState.paused;
        console.log("Paused");
        if (_millis != undefined) setTimeout(Game.resume, _millis);
      }
    }

    static resume(): void {
      console.log("Resumed");
      if (Game.isPaused) Game.state = GameState.running;
    }
    
    static end(): void {
      console.log("GAME OVER!");
      Game.state = GameState.over;
    }

    static restart(): void {
      Game._shipsLeft = Game.properties.ships;
      Game._score = 0;
      Ship.instance.reset(true);
      InvaderWave.instance.reset(true);
      BarricadeFormation.instance.reset();
      if (Game.isOver) Game.state = GameState.running;
      Game.pause(1000);
    }

    static handleKeyDown(_event: KeyboardEvent): void {
      if (Game.interestingKeys.includes(_event.code) && !Game.pressedKeys.includes(_event.code)) {
        Game.pressedKeys.push(_event.code);

        if (Game.pauseKeys.includes(_event.code)) Game.isRunning ? Game.pause() : Game.resume();
        else if (Game.restartKeys.includes(_event.code)) Game.restart();
      }
    }

    static handleKeyUp(_event: KeyboardEvent): void {
      let index: number = Game.pressedKeys.indexOf(_event.code);
      if (index > -1) Game.pressedKeys.splice(index, 1);
    }
  }

  window.addEventListener("keydown", Game.handleKeyDown);
  window.addEventListener("keyup", Game.handleKeyUp);

}