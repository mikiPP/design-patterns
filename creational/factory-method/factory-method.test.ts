import { main } from './factory-method';
import * as readLine from 'readline-sync';

jest.mock('readline-sync', () => ({
  question: jest.fn(),
}));

describe('Factory-Method', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should create a sales report', () => {
    (readLine.question as jest.Mock).mockReturnValue('sales');
    main();
    expect(readLine.question).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Creating a sales report...');
  });

  it('should create an inventory report', () => {
    (readLine.question as jest.Mock).mockReturnValue('inventory');
    main();
    expect(readLine.question).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Creating inventory report...');
  });

  it('should create a benefits report', () => {
    (readLine.question as jest.Mock).mockReturnValue('benefits');
    main();
    expect(readLine.question).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Creating benefits report...');
  });

  it('should throw an error for an invalid report type', () => {
    (readLine.question as jest.Mock).mockReturnValue('invalid');
    expect(() => main()).toThrow('This is not a valid option.');
    expect(readLine.question).toHaveBeenCalledTimes(1);
  });

  it('should return sales even the case is diferent', () => {
    (readLine.question as jest.Mock).mockReturnValue('saLeS');
    main();
    expect(readLine.question).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Creating a sales report...');
  });
});
