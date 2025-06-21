export interface Approver {
  setNext(approver: Approver): Approver;
  approveRequest(amount: number): void;
}

export abstract class BaseApprover implements Approver {
  private nextApprover: Approver | null = null;

  setNext(approver: Approver): Approver {
    this.nextApprover = approver;
    return approver;
  }

  abstract approveRequest(amount: number): void;

  protected next(amount: number): void {
    if (this.nextApprover) {
      this.nextApprover.approveRequest(amount);
      return;
    }

    console.log('Request could not be approved.');
  }
}

export class Supervisor extends BaseApprover {
  override approveRequest(amount: number): void {
    if (amount <= 1000) {
      console.log('Supervisor approved the request.');
      return;
    }

    super.next(amount);
  }
}

export class Manager extends BaseApprover {
  override approveRequest(amount: number): void {
    if (amount <= 5000) {
      console.log('Manager approved the request.');
      return;
    }

    super.next(amount);
  }
}

export class Director extends BaseApprover {
  override approveRequest(amount: number): void {
    if (amount <= 10000) {
      console.log('Director approved the request.');
      return;
    }

    super.next(amount);
  }
}

function main() {
  const supervisor = new Supervisor();
  const manager = new Manager();
  const director = new Director();

  // Chain responsability
  supervisor.setNext(manager).setNext(director);

  console.log('Purchase request for $500:');
  supervisor.approveRequest(500);

  console.log('\nPurchase request for $3000:');
  supervisor.approveRequest(3000);

  console.log('\nPurchase request for $7000:');
  supervisor.approveRequest(7000);
}

main();
