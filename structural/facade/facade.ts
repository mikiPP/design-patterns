class CPU {
  stopOperations(): void {
    console.log('CPU: Turning off.');
  }

  jump(position: number): void {
    console.log(`CPU: Jumping to the memory position: ${position}.`);
  }

  execute(): void {
    console.log('CPU: Executing instructions.');
  }
}

class HardDrive {
  read(position: number, size: number): string {
    console.log(`HardDrive: Reading ${size} bytes from position ${position}.`);
    return '001010001010100';
  }

  close() {
    console.log('HardDrive: Stopping');
  }
}

class Memory {
  load(position: number, data: string): void {
    console.log(`Memory: loading data in position: ${position} ${data}.`);
  }

  free(): void {
    console.log('Memory: Flushing memory.');
  }
}

export class ComputerFacade {
  private cpu: CPU = new CPU();
  private hardDrive: HardDrive = new HardDrive();
  private memory: Memory = new Memory();

  constructor() {}

  startComputer(): void {
    console.log('\nTurning on the computer...');

    this.memory.load(0, this.hardDrive.read(0, 1024));
    this.cpu.jump(0);
    this.cpu.execute();

    console.log('Computer ready\n');
  }

  shutDownComputer(): void {
    console.log('\nTurning off the computer...');
    console.log('Closing taks and programs');

    this.cpu.stopOperations();
    this.memory.free();
    this.hardDrive.close();

    console.log('Computer off.\n');
  }
}

function main() {
  const computer = new ComputerFacade();

  computer.startComputer();

  computer.shutDownComputer();
}

main();
