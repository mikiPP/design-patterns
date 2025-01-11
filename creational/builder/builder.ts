/**
 * Task: crearte a QueryBuilder to build SQL queries
 * It must have the following methods:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- if it's empty, it should select all fields with the *
 * - where(condition: string): QueryBuilder - optional
 * - orderBy(field: string, order: string): QueryBuilder - optional
 * - limit(limit: number): QueryBuilder - optional
 * - execute(): string - retorns the SQL query
 * 
 ** Example:
  const usersQuery = new QueryBuilder("users") // users is the name of the table
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('query: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

type QUERY_TYPE = 'SELECT' | 'UPDATE' | 'DELETE';
type DIRECTION = 'ASC' | 'DESC';
type CONDITION_TYPE = 'AND' | 'OR';

export class QueryBuilder {
  private table: string;
  private type: QUERY_TYPE = 'SELECT';
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;
  private readonly COMA_SEPARATOR = ', ';

  constructor(table: string) {
    this.table = table;
  }

  queryType(type: QUERY_TYPE): QueryBuilder {
    this.type = type;
    return this;
  }

  select(...fields: string[]): QueryBuilder {
    this.fields = fields;
    return this;
  }

  where(condition: string, conditiontype?: CONDITION_TYPE): QueryBuilder {
    if (!this.conditions.length) {
      this.conditions.push(condition);
      return this;
    }

    if (this.conditions.length && !conditiontype) {
      throw new Error('The condition type is needed if there is more than one condition');
    }

    this.conditions.push(` ${conditiontype} ${condition}`);
    return this;
  }

  orderBy(field: string, direction: DIRECTION = 'ASC'): QueryBuilder {
    this.orderFields.push(`${field} ${direction}`);
    return this;
  }

  limit(count: number): QueryBuilder {
    this.limitCount = count;
    return this;
  }

  toString() {
    const select = this.fields.length ? this.fields.join(this.COMA_SEPARATOR) : '*';
    const where = this.conditions.length ? ` WHERE ${this.conditions.join('').trim()}` : '';
    const orderBy = this.orderFields.length
      ? ` ORDER BY ${this.orderFields.join(this.COMA_SEPARATOR)}`
      : '';
    const limit = this.limitCount ? ` LIMIT ${this.limitCount}` : '';

    return `${this.type} ${select} FROM ${this.table}${where}${orderBy}${limit}`;
  }

  execute(): string {
    return this.toString();
  }
}

function main() {
  const usersQuery = new QueryBuilder('users')
    .select('id', 'name', 'email')
    .where('age > 18')
    .where("country = 'Cri'", 'AND')
    .orderBy('name', 'ASC')
    .limit(10)
    .execute();

  console.log('query:\n');
  console.log(usersQuery);
}

main();
