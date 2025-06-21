export interface Command {
  execute(): void;
}

export class TextEditor {
  private text: string = '';
  private clipboard: string = '';
  private history: string[] = [];

  type(text: string): void {
    this.history.push(this.text);
    this.text += text;
  }

  copy(): void {
    this.clipboard = this.text;
    console.log(`Text copied to clipboard: \n${this.clipboard}`);
  }

  paste(): void {
    this.history.push(this.text);
    this.text += this.clipboard;
    console.log(`Text after paste: \n"${this.text}"`);
  }

  undo(): void {
    if (this.history.length > 0) {
      this.text = this.history.pop()!;
      console.log(`Text after undo: \n"${this.text}"`);
      return;
    }

    console.log('There is nothing to undo.');
  }

  getText(): string {
    return this.text;
  }
}

export class CopyCommand implements Command {
  private editor: TextEditor;

  constructor(editor: TextEditor) {
    this.editor = editor;
  }

  execute(): void {
    this.editor.copy();
  }
}

export class PasteCommand implements Command {
  private editor: TextEditor;

  constructor(editor: TextEditor) {
    this.editor = editor;
  }

  execute(): void {
    this.editor.paste();
  }
}

export class UndoCommand implements Command {
  private editor: TextEditor;

  constructor(editor: TextEditor) {
    this.editor = editor;
  }

  execute(): void {
    this.editor.undo();
  }
}

export class Toolbar {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    this.commands[button] = command;
  }

  clickButton(button: string): void {
    const command = this.commands[button];
    if (!command) {
      console.error(`There is not any button assigned "${button}"`);
      return;
    }

    this.commands[button].execute();
  }
}

function main() {
  const editor = new TextEditor();
  const toolbar = new Toolbar();

  const copyCommand = new CopyCommand(editor);
  const pasteCommand = new PasteCommand(editor);
  const undoCommand = new UndoCommand(editor);

  toolbar.setCommand('copy', copyCommand);
  toolbar.setCommand('paste', pasteCommand);
  toolbar.setCommand('undo', undoCommand);

  editor.type('H');
  editor.type('e');
  editor.type('l');
  editor.type('l');
  editor.type('o');
  editor.type(' ');
  editor.type('w');
  editor.type('o');
  editor.type('r');
  editor.type('l');
  editor.type('d');
  editor.type('!');
  console.log(`Current text: "${editor.getText()}"`);

  console.log('\nCopying text:');
  toolbar.clickButton('copy');

  console.log('\nPasting text:');
  toolbar.clickButton('paste');

  console.log('\nUndoing the last section:');
  toolbar.clickButton('undo');

  console.log('\nUndoing again:');
  toolbar.clickButton('undo');

  console.log(`\nFinal text: "${editor.getText()}"`);
}

main();
