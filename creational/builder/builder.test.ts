import { QueryBuilder } from './builder';

describe('QueryBuilder', () => {
  it('should create a SELECT query', () => {
    const query = new QueryBuilder('users')
      .select('id', 'name', 'email')
      .where('age > 18')
      .where("country = 'Cri'", 'AND')
      .orderBy('name', 'ASC')
      .limit(10)
      .execute();

    expect(query).toBe(
      "SELECT id, name, email FROM users WHERE age > 18 AND country = 'Cri' ORDER BY name ASC LIMIT 10",
    );
  });

  it('should create a query without optional methods', () => {
    const query = new QueryBuilder('users').select('id', 'name', 'email').execute();

    expect(query).toBe('SELECT id, name, email FROM users');
  });

  it('should create a query with multiple where conditions', () => {
    const query = new QueryBuilder('users')
      .select('id', 'name', 'email')
      .where('age > 18')
      .where("country = 'Cri'", 'AND')
      .where("status = 'active'", 'OR')
      .execute();

    expect(query).toBe(
      "SELECT id, name, email FROM users WHERE age > 18 AND country = 'Cri' OR status = 'active'",
    );
  });

  it('should create a query with different order by direction', () => {
    const query = new QueryBuilder('users')
      .select('id', 'name', 'email')
      .orderBy('name', 'DESC')
      .execute();

    expect(query).toBe('SELECT id, name, email FROM users ORDER BY name DESC');
  });

  it('should create a query with different orders', () => {
    const query = new QueryBuilder('users')
      .select('id', 'name', 'email')
      .orderBy('name', 'DESC')
      .orderBy('active', 'ASC')
      .execute();

    expect(query).toBe('SELECT id, name, email FROM users ORDER BY name DESC, active ASC');
  });

  it('should create a query with a limit', () => {
    const query = new QueryBuilder('users').select('id', 'name', 'email').limit(5).execute();

    expect(query).toBe('SELECT id, name, email FROM users LIMIT 5');
  });

  it('should create a delete query', () => {
    const query = new QueryBuilder('users')
      .queryType('DELETE')
      .select()
      .where('active = false')
      .execute();

    expect(query).toBe('DELETE * FROM users WHERE active = false');
  });
});
