/**
 * 1. ControlTower Class:
	• Acts as the Mediator between airplanes.
	The control tower coordinates communications between airplanes
	to avoid collisions and handle their takeoff or landing requests.

 * 2. Airplane Class:
	• Represents an airplane that can send and receive messages
	through the control tower.
	Airplanes do not communicate directly with each other,
	but through the control tower, which manages the information.

 * 3. Interactions:
	• Airplanes can request permission to land or take off,
	and the control tower will send messages to other airplanes
	notifying them of each airplane's activity.
 */

export class ControlTower {
  private airplanes: Airplane[] = [];

  registerAirplane(airplane: Airplane) {
    this.airplanes.push(airplane);
  }

  sendMessage(sender: Airplane, message: string): void {
    this.airplanes
      .filter((airplane) => airplane.getId() !== sender.getId())
      .forEach((airplane) => airplane.receiveMessage(sender, message));
  }

  requestLanding(sender: Airplane): void {
    console.log(`\nControl Tower: landing permission granted to ${sender.getId()}`);

    this.sendMessage(sender, `${sender.getId()} is landing`);
  }

  requestTakeoff(sender: Airplane): void {
    console.log(`\nControl Tower: taking off permission granted to ${sender.getId()}`);

    this.sendMessage(sender, `${sender.getId()} is taking off.`);
  }
}

export class Airplane {
  private id: string;
  private controlTower: ControlTower;

  constructor(id: string, controlTower: ControlTower) {
    this.id = id;
    this.controlTower = controlTower;

    this.controlTower.registerAirplane(this);
  }

  getId(): string {
    return this.id;
  }

  requestLanding(): void {
    console.log(`${this.id} requests permission to land`);
    this.controlTower.requestLanding(this);
  }

  requestTakeoff(): void {
    console.log(`${this.id} request permission to take off`);

    this.controlTower.requestTakeoff(this);
  }

  receiveMessage(sender: Airplane, message: string): void {
    console.log(`${this.id} message recieved from ${sender.getId()}: "${message}"`);
  }
}

function main(): void {
  const controlTower = new ControlTower();

  const airplane1 = new Airplane('Flight 101', controlTower);
  const airplane2 = new Airplane('Flight 202', controlTower);
  const airplane3 = new Airplane('Flight 303', controlTower);

  airplane1.requestLanding();
  airplane2.requestTakeoff();
  airplane3.requestLanding();
}

main();
