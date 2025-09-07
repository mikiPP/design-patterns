import { jest } from '@jest/globals';
import { ControlTower, Airplane } from './mediator';

// Import classes from mediator.ts
// If using ES modules, you may need to adjust the import path and syntax
// For this example, we'll assume the classes are exported (add export to classes if needed)

describe('Mediator Pattern - ControlTower & Airplane', () => {
  let controlTower: ControlTower;
  let airplane1: Airplane;
  let airplane2: Airplane;
  let airplane3: Airplane;

  beforeEach(() => {
    controlTower = new ControlTower();
    airplane1 = new Airplane('Flight 101', controlTower);
    airplane2 = new Airplane('Flight 202', controlTower);
    airplane3 = new Airplane('Flight 303', controlTower);
  });

  it('should register airplanes in the control tower', () => {
    // @ts-ignore: access private for test
    expect(controlTower['airplanes'].length).toBe(3);
    // @ts-ignore: access private for test
    expect(controlTower['airplanes'][0].getId()).toBe('Flight 101');
  });

  it('should notify other airplanes when one requests landing', () => {
    const spy1 = jest.spyOn(airplane2, 'receiveMessage');
    const spy2 = jest.spyOn(airplane3, 'receiveMessage');
    airplane1.requestLanding();
    expect(spy1).toHaveBeenCalledWith(airplane1, 'Flight 101 is landing');
    expect(spy2).toHaveBeenCalledWith(airplane1, 'Flight 101 is landing');
  });

  it('should notify other airplanes when one requests takeoff', () => {
    const spy1 = jest.spyOn(airplane1, 'receiveMessage');
    const spy2 = jest.spyOn(airplane3, 'receiveMessage');
    airplane2.requestTakeoff();
    expect(spy1).toHaveBeenCalledWith(airplane2, 'Flight 202 is taking off.');
    expect(spy2).toHaveBeenCalledWith(airplane2, 'Flight 202 is taking off.');
  });

  it('should not notify the sender airplane', () => {
    const spy = jest.spyOn(airplane1, 'receiveMessage');
    airplane1.requestLanding();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call receiveMessage with correct sender and message', () => {
    const spy = jest.spyOn(airplane2, 'receiveMessage');
    airplane3.requestLanding();
    expect(spy).toHaveBeenCalledWith(airplane3, 'Flight 303 is landing');
  });

  it('should output correct console logs for landing and takeoff', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    airplane1.requestLanding();
    expect(logSpy).toHaveBeenCalledWith('Flight 101 requests permission to land');
    expect(logSpy).toHaveBeenCalledWith(
      '\nControl Tower: landing permission granted to Flight 101',
    );
    airplane2.requestTakeoff();
    expect(logSpy).toHaveBeenCalledWith('Flight 202 request permission to take off');
    expect(logSpy).toHaveBeenCalledWith(
      '\nControl Tower: taking off permission granted to Flight 202',
    );
    logSpy.mockRestore();
  });
});
