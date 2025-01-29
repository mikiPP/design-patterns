export interface PaymentProcessor {
  processPayment(amount: number): void;
}

class PayPalService {
  sendPayment(amount: number): void {
    console.log(`Paying amount: $${amount} with PayPal`);
  }
}

class StripeService {
  makeCharge(amount: number): void {
    console.log(`Paying amount: $${amount} with Stripe`);
  }
}

export class PayPalAdapter implements PaymentProcessor {
  private paypalService = new PayPalService();

  processPayment(amount: number): void {
    this.paypalService.sendPayment(amount);
  }
}

export class StripeAdapter implements PaymentProcessor {
  private stripeService = new StripeService();

  processPayment(amount: number): void {
    this.stripeService.makeCharge(amount);
  }
}

export class PaymentProccesorAdapter implements PaymentProcessor {
  private service: PaymentProcessor;

  constructor(service: PaymentProcessor) {
    this.service = service;
  }

  processPayment(amount: number): void {
    this.service.processPayment(amount);
  }
}

function main() {
  const paymentAmount = 100;

  const paypalProcessor: PaymentProcessor = new PayPalAdapter();
  const stripeProcessor: PaymentProcessor = new StripeAdapter();

  console.log('Using PayPal:');
  paypalProcessor.processPayment(paymentAmount);

  console.log('\nUsing Stripe:');
  stripeProcessor.processPayment(paymentAmount);

  console.log('\nUsing the paymment processor adapter with paypal');
  const paymentProcessor = new PaymentProccesorAdapter(paypalProcessor);
  paymentProcessor.processPayment(paymentAmount);
}

main();
