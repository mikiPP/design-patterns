import { ConfidentialDoc, DocProxy, User } from './proxy';

describe('Proxy Pattern', () => {
  let confidentialDoc: ConfidentialDoc;
  let proxy: DocProxy;
  let user: User;
  let admin: User;

  beforeEach(() => {
    confidentialDoc = new ConfidentialDoc('Content from the confidential doc');
    proxy = new DocProxy(confidentialDoc);
    user = new User('Juan', 'user');
    admin = new User('Ana', 'admin');
  });

  test('should deny access to a user with role "user"', () => {
    console.log = jest.fn();
    proxy.displayContent(user);
    expect(console.log).toHaveBeenCalledWith(
      'Access denied, you need to be admin to check the file',
    );
  });

  test('should allow access to a user with role "admin"', () => {
    console.log = jest.fn();
    proxy.displayContent(admin);
    expect(console.log).toHaveBeenCalledWith(`file content: \nContent from the confidential doc\n`);
  });
});
