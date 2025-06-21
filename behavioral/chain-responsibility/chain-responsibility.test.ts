import { Supervisor, Manager, Director } from './chain-responsibility';

describe('Chain of Responsibility', () => {
  let supervisor: Supervisor;
  let manager: Manager;
  let director: Director;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    supervisor = new Supervisor();
    manager = new Manager();
    director = new Director();
    supervisor.setNext(manager).setNext(director);
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should be approved by Supervisor if amount <= 1000', () => {
    supervisor.approveRequest(800);
    expect(consoleLogSpy).toHaveBeenCalledWith('Supervisor approved the request.');
  });

  it('should be approved by Manager if amount > 1000 and <= 5000', () => {
    supervisor.approveRequest(3000);
    expect(consoleLogSpy).toHaveBeenCalledWith('Manager approved the request.');
  });

  it('should be approved by Director if amount > 5000 and <= 10000', () => {
    supervisor.approveRequest(7000);
    expect(consoleLogSpy).toHaveBeenCalledWith('Director approved the request.');
  });

  it('should not be approved if amount > 10000', () => {
    supervisor.approveRequest(15000);
    expect(consoleLogSpy).toHaveBeenCalledWith('Request could not be approved.');
  });

  it('should pass through the whole chain if no one can approve', () => {
    supervisor.approveRequest(20000);
    expect(consoleLogSpy).toHaveBeenCalledWith('Request could not be approved.');
  });

  it('should only call Supervisor for small amounts', () => {
    supervisor.approveRequest(500);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Supervisor approved the request.');
  });

  it('should call Supervisor and Manager for medium amounts', () => {
    supervisor.approveRequest(2000);
    expect(consoleLogSpy).toHaveBeenCalledWith('Manager approved the request.');
  });

  it('should call Supervisor, Manager, and Director for large amounts', () => {
    supervisor.approveRequest(9000);
    expect(consoleLogSpy).toHaveBeenCalledWith('Director approved the request.');
  });
});
