import { USATaxStrategy, CanadaTaxStrategy, GermanyTaxStrategy, TaxCalculator } from './strategy';

describe('Tax Strategies', () => {
  describe('USATaxStrategy', () => {
    const usaTaxStrategy = new USATaxStrategy();

    it('should calculate 10% tax', () => {
      expect(usaTaxStrategy.calculateTax(100)).toBe(10);
      expect(usaTaxStrategy.calculateTax(200)).toBe(20);
    });
  });

  describe('CanadaTaxStrategy', () => {
    const canadaTaxStrategy = new CanadaTaxStrategy();

    it('should calculate 13% tax', () => {
      expect(canadaTaxStrategy.calculateTax(100)).toBe(13);
      expect(canadaTaxStrategy.calculateTax(200)).toBe(26);
    });
  });

  describe('GermanyTaxStrategy', () => {
    const germanyTaxStrategy = new GermanyTaxStrategy();

    it('should calculate 19% tax', () => {
      expect(germanyTaxStrategy.calculateTax(100)).toBe(19);
      expect(germanyTaxStrategy.calculateTax(200)).toBe(38);
    });
  });

  describe('TaxCalculator', () => {
    let taxCalculator: TaxCalculator;

    beforeEach(() => {
      taxCalculator = new TaxCalculator(new USATaxStrategy());
    });

    it('should calculate using initial strategy', () => {
      expect(taxCalculator.calculate(100)).toBe(10);
    });

    it('should change strategy and calculate correctly', () => {
      taxCalculator.setStrategy(new CanadaTaxStrategy());
      expect(taxCalculator.calculate(100)).toBe(13);

      taxCalculator.setStrategy(new GermanyTaxStrategy());
      expect(taxCalculator.calculate(100)).toBe(19);
    });
  });
});
