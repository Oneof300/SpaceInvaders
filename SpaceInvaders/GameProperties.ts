namespace SpaceInvaders {
  import ƒ = FudgeCore;

  export class GameProperties {
    ships: number = 3;
    ship: ShipProperties;
    invaderWave: InvaderWaveProperties;
    barricadeFormation: BarricadeFormationProperties;

    constructor(_init?: Partial<GameProperties>) {
      Object.assign(this, _init);
    }
  }

  export class ShipProperties {
    velocity: number = 0.15;
    projectiles: number = 2;
    projectileVelocity: number = 0.15;

    constructor(_init?: Partial<ShipProperties>) {
      Object.assign(this, _init);
    }
  }

  export class InvaderWaveProperties {
    startPosition: ƒ.Vector2 = new ƒ.Vector2(0, 112);
    columns: number = 11;
    rows: number = 5;
    spacing: number = 16;
    velocityMax: number = 0.4;
    projectiles: number = 3;
    projectileVelocity: number = 0.05;

    constructor(_init?: Partial<InvaderWaveProperties>) {
      Object.assign(this, _init);
    }
  }

  export class BarricadeFormationProperties {
    position: ƒ.Vector2 = new ƒ.Vector2(0, 16);
    barricades: number = 4;
    spacing: number = 48;

    constructor(_init?: Partial<BarricadeFormationProperties>) {
      Object.assign(this, _init);
    }
  }

}