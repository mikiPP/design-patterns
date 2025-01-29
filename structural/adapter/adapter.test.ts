import { PayPalAdapter, StripeAdapter, PaymentProcessor, PaymentProccesorAdapter } from './adapter';

describe('PaymentProcessor Adapters', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should process payment using PayPalAdapter', () => {
    const paypalProcessor: PaymentProcessor = new PayPalAdapter();
    paypalProcessor.processPayment(100);

    expect(consoleSpy).toHaveBeenCalledWith('Paying amount: $100 with PayPal');
  });

  it('should process payment using StripeAdapter', () => {
    const stripeProcessor: PaymentProcessor = new StripeAdapter();
    stripeProcessor.processPayment(100);

    expect(consoleSpy).toHaveBeenCalledWith('Paying amount: $100 with Stripe');
  });

  it('should process payment using PaymentProccesorAdapter with PayPalAdapter', () => {
    const paypalProcessor: PaymentProcessor = new PayPalAdapter();
    const paymentProcessor = new PaymentProccesorAdapter(paypalProcessor);
    paymentProcessor.processPayment(100);

    expect(consoleSpy).toHaveBeenCalledWith('Paying amount: $100 with PayPal');
  });

  it('should process payment using PaymentProccesorAdapter with StripeAdapter', () => {
    const stripeProcessor: PaymentProcessor = new StripeAdapter();
    const paymentProcessor = new PaymentProccesorAdapter(stripeProcessor);
    paymentProcessor.processPayment(100);

    expect(consoleSpy).toHaveBeenCalledWith('Paying amount: $100 with Stripe');
  });
});
