import { DatabaseConnection } from './singleton';

describe('DatabaseConnection Singleton', () => {
  it('should return the same instance', () => {
    const db1 = DatabaseConnection.getInstance();
    const db2 = DatabaseConnection.getInstance();
    expect(db1).toBe(db2);
  });

  it('should connect and disconnect properly', () => {
    const db = DatabaseConnection.getInstance();
    db.connect();
    expect(db.isConnected()).toBe(true);

    db.disconnect();
    expect(db.isConnected()).toBe(false);
  });

  it('should maintain connection state across instances', () => {
    const db1 = DatabaseConnection.getInstance();
    db1.connect();
    expect(db1.isConnected()).toBe(true);

    const db2 = DatabaseConnection.getInstance();
    expect(db2.isConnected()).toBe(true);

    db2.disconnect();
    expect(db1.isConnected()).toBe(false);
  });
});
