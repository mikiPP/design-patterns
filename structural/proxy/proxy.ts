interface Doc {
  displayContent(user: User): void;
}

export class ConfidentialDoc implements Doc {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  displayContent(): void {
    console.log(`file content: \n${this.content}\n`);
  }
}

export class DocProxy implements Doc {
  private document: Doc;

  constructor(document: Doc) {
    this.document = document;
  }

  private canSeeDocument(role: Role) {
    return role === 'admin';
  }

  displayContent(user: User): void {
    if (this.canSeeDocument(user.getRole())) {
      this.document.displayContent(user);
      return;
    }

    console.log('Access denied, you need to be admin to check the file');
  }
}

type Role = 'admin' | 'user';

export class User {
  private name: string;
  private role: Role;

  constructor(name: string, role: Role) {
    this.name = name;
    this.role = role;
  }

  getName(): string {
    return this.name;
  }

  getRole(): Role {
    return this.role;
  }
}

function main() {
  const confidentialDoc = new ConfidentialDoc('Content from the confidential doc');
  const proxy = new DocProxy(confidentialDoc);

  const user1 = new User('Juan', 'user');
  const user2 = new User('Ana', 'admin');

  console.log('Trying to access from user1:');
  proxy.displayContent(user1);

  console.log('\nTrying to access from user2:');
  proxy.displayContent(user2);
}

main();
