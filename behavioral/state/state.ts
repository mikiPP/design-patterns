import { sleep } from '../../utils/sleep';
import readLine from 'readline-sync';

interface State {
  name: string;

  open(): void;
  close(): void;
}

// Context class - AutomaticDoor
export class AutomaticDoor {
  private state: State;

  constructor() {
    this.state = new Closed(this);
  }

  setState(state: State): void {
    this.state = state;
    console.log(`State changed to : ${state.name}`);
  }

  open(): void {
    this.state.open();
  }

  close(): void {
    this.state.close();
  }

  getStateName(): string {
    return this.state.name;
  }
}

export class Closed implements State {
  private door: AutomaticDoor;
  public name: string;

  constructor(door: AutomaticDoor) {
    this.door = door;
    this.name = 'Closed';
  }

  open(): void {
    console.log('Opening the door...');
    this.door.setState(new Opening(this.door));
  }

  close(): void {
    console.log('The door is already closed');
  }
}

export class Opening implements State {
  public name: string;
  private door: AutomaticDoor;

  constructor(door: AutomaticDoor) {
    this.name = 'Opening';
    this.door = door;
    this.afterOpen();
  }

  private async afterOpen() {
    await sleep(3000);

    console.log('The door has opened');
    this.door.setState(new Open(this.door));
  }

  open(): void {
    console.log('The door is already opening');
  }

  close(): void {
    console.log('The door can not be closed now');
  }
}

export class Open implements State {
  private door: AutomaticDoor;
  public name: string;

  constructor(door: AutomaticDoor) {
    this.name = 'Open';
    this.door = door;
  }

  open(): void {
    console.log('The door is already open');
  }

  close(): void {
    console.log('Closing the door');
    this.door.setState(new Closing(this.door));
  }
}

export class Closing implements State {
  private door: AutomaticDoor;
  public name: string;

  constructor(door: AutomaticDoor) {
    this.name = 'Closing';
    this.door = door;

    this.afterClosed();
  }

  open(): void {
    console.log('Movement detected. Opening the door again');
    this.door.setState(new Opening(this.door));
  }

  close(): void {
    console.log('The door is closed');
    this.door.setState(new Closed(this.door));
  }

  private async afterClosed() {
    await sleep(3000);

    console.log('The door is closing');
    this.door.setState(new Closed(this.door));
  }
}

enum Options {
  OPEN = '1',
  CLOSE = '2',
  EXIT = '3',
}

async function main() {
  const door = new AutomaticDoor();

  let selectedOption: Options | null = Options.EXIT;

  do {
    console.clear();
    console.log(`Current status: ${door.getStateName()}`);
    selectedOption = readLine.question(
      `
      1. Open the door
      2. Close the door
      3. Exit

      Pick an option: 
    `,
    ) as Options;

    switch (selectedOption) {
      case Options.OPEN:
        door.open();
        break;
      case Options.CLOSE:
        door.close();
        break;
      case Options.EXIT:
        console.log('Exiting the simulation ...');
        break;
      default:
        console.log('No valid option');
        break;
    }

    await sleep(2000);
  } while (selectedOption !== Options.EXIT);
}

// main();
