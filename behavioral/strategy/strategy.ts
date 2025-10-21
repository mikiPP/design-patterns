interface TaxStrategy {
  calculateTax(amount: number): number;
}

export class USATaxStrategy implements TaxStrategy {
  calculateTax(amount: number): number {
    return amount * 0.1;
  }
}

export class CanadaTaxStrategy implements TaxStrategy {
  calculateTax(amount: number): number {
    return amount * 0.13;
  }
}

export class GermanyTaxStrategy implements TaxStrategy {
  calculateTax(amount: number): number {
    return amount * 0.19;
  }
}

export class TaxCalculator {
  private strategy: TaxStrategy;

  constructor(strategy: TaxStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: TaxStrategy): void {
    this.strategy = strategy;
  }

  calculate(amount: number): number {
    return this.strategy.calculateTax(amount);
  }
}

function main(): void {
  const taxCalculator = new TaxCalculator(new USATaxStrategy());

  console.log('Calculating taxes:\n');
  console.log('USA: $', taxCalculator.calculate(100).toFixed(2));

  console.log('\nMoving to Canada...');
  taxCalculator.setStrategy(new CanadaTaxStrategy());
  console.log('Canada: $', taxCalculator.calculate(100).toFixed(2));

  console.log('\nMoving to Germany...');
  taxCalculator.setStrategy(new GermanyTaxStrategy());
  console.log('Germany: $', taxCalculator.calculate(100).toFixed(2));
}

main();
