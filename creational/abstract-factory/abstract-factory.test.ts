import { ElectricVehicleFactory, GasVehicleFactory, main } from './abstract-factory';

describe('Abstract Factory Pattern', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('ElectricVehicleFactory should create an ElectricCar and an ElectricEngine', () => {
    const factory = new ElectricVehicleFactory();
    main(factory);

    expect(consoleSpy).toHaveBeenCalledWith('Creating an electric car');
    expect(consoleSpy).toHaveBeenCalledWith('Starting electric engine');
  });

  test('GasVehicleFactory should create a GasCar and a GasEngine', () => {
    const factory = new GasVehicleFactory();
    main(factory);

    expect(consoleSpy).toHaveBeenCalledWith('Creating a fuel car');
    expect(consoleSpy).toHaveBeenCalledWith('Starting fuel engine');
  });
});
