/**
	1. Complete the SalesReport, InventoryReport, and BenefitsReport classes to implement 
		the Reports interface, generating the content of each report in the generate method.

	2. Implement the SalesReportFactory, InventoryReportFactory, and BenefitsReportFactory classes 
		to create instances of SalesReport, InventoryReport, and BenefitsReport, respectively.

	3. Test the program by generating different types of reports using
		the prompt to select the type of report.
 */

import readLine from 'readline-sync';

interface Reports {
  generate(): void;
}

class SalesReport implements Reports {
  generate(): void {
    console.log('Creating a sales report...');
  }
}

class InventoryReport implements Reports {
  generate(): void {
    console.log('Creating inventory report...');
  }
}

class BenefitsReport implements Reports {
  generate(): void {
    console.log('Creating benefits report...');
  }
}

abstract class ReportFactory {
  protected abstract createReport(): Reports;

  generateReport(): void {
    const report = this.createReport();
    report.generate();
  }
}

class SalesReportFactory extends ReportFactory {
  createReport(): Reports {
    return new SalesReport();
  }
}

class InventoryReportFactory extends ReportFactory {
  createReport(): Reports {
    return new InventoryReport();
  }
}

class BenefitsReportFactory extends ReportFactory {
  createReport(): Reports {
    return new BenefitsReport();
  }
}

const SALES = 'sales';
const INVENTORY = 'inventory';
const BENEFITS = 'benefits';
const reportTypes = [SALES, INVENTORY, BENEFITS];

export function main() {
  let reportFactory: ReportFactory;

  const reportType = readLine.question(
    `¿Which type of report do you need? (${reportTypes.join('/')}): `,
  );

  switch (reportType?.toLowerCase()) {
    case SALES:
      reportFactory = new SalesReportFactory();
      break;
    case INVENTORY:
      reportFactory = new InventoryReportFactory();
      break;
    case BENEFITS:
      reportFactory = new BenefitsReportFactory();
      break;
    default:
      throw new Error('This is not a valid option.');
  }

  reportFactory.generateReport();
}

// main();
