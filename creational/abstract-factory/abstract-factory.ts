interface Vehicle {
  assemble(): void;
}

interface Engine {
  start(): void;
}

class ElectricCar implements Vehicle {
  assemble(): void {
    console.log('Creating an electric car');
  }
}

class GasCar implements Vehicle {
  assemble(): void {
    console.log('Creating a fuel car');
  }
}

class ElectricEngine implements Engine {
  start(): void {
    console.log('Starting electric engine');
  }
}

class GasEngine implements Engine {
  start(): void {
    console.log('Starting fuel engine');
  }
}

interface VehicleFactory {
  createVehicle(): Vehicle;
  createEngine(): Engine;
}

export class ElectricVehicleFactory implements VehicleFactory {
  createVehicle(): Vehicle {
    return new ElectricCar();
  }

  createEngine(): Engine {
    return new ElectricEngine();
  }
}

export class GasVehicleFactory implements VehicleFactory {
  createVehicle(): Vehicle {
    return new GasCar();
  }

  createEngine(): Engine {
    return new GasEngine();
  }
}

export function main(factory: VehicleFactory) {
  const vehicle = factory.createVehicle();
  const engine = factory.createEngine();

  vehicle.assemble();
  engine.start();
}

console.log('Creating an electric car:');
main(new ElectricVehicleFactory());

console.log('\nCreating a fuel car:');
main(new GasVehicleFactory());
