import { ComputerFacade } from './facade';

describe('ComputerFacade', () => {
  let computer: ComputerFacade;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    computer = new ComputerFacade();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should start the computer', () => {
    computer.startComputer();

    expect(consoleSpy).toHaveBeenCalledWith('\nTurning on the computer...');
    expect(consoleSpy).toHaveBeenCalledWith('HardDrive: Reading 1024 bytes from position 0.');
    expect(consoleSpy).toHaveBeenCalledWith('Memory: loading data in position: 0 001010001010100.');
    expect(consoleSpy).toHaveBeenCalledWith('CPU: Jumping to the memory position: 0.');
    expect(consoleSpy).toHaveBeenCalledWith('CPU: Executing instructions.');
    expect(consoleSpy).toHaveBeenCalledWith('Computer ready\n');

    consoleSpy.mockRestore();
  });

  test('should shut down the computer', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    computer.shutDownComputer();

    expect(consoleSpy).toHaveBeenCalledWith('\nTurning off the computer...');
    expect(consoleSpy).toHaveBeenCalledWith('Closing taks and programs');
    expect(consoleSpy).toHaveBeenCalledWith('CPU: Turning off.');
    expect(consoleSpy).toHaveBeenCalledWith('Memory: Flushing memory.');
    expect(consoleSpy).toHaveBeenCalledWith('HardDrive: Stopping');
    expect(consoleSpy).toHaveBeenCalledWith('Computer off.\n');

    consoleSpy.mockRestore();
  });
});
