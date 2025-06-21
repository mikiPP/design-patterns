import { TextEditor, CopyCommand, PasteCommand, UndoCommand, Toolbar } from './command';

describe('Command Pattern - TextEditor', () => {
  let editor: TextEditor;
  let copyCommand: CopyCommand;
  let pasteCommand: PasteCommand;
  let undoCommand: UndoCommand;
  let toolbar: Toolbar;

  beforeEach(() => {
    editor = new TextEditor();
    copyCommand = new CopyCommand(editor);
    pasteCommand = new PasteCommand(editor);
    undoCommand = new UndoCommand(editor);
    toolbar = new Toolbar();
    toolbar.setCommand('copy', copyCommand);
    toolbar.setCommand('paste', pasteCommand);
    toolbar.setCommand('undo', undoCommand);
  });

  test('should type text and get the correct text', () => {
    editor.type('Hello');
    editor.type(' World');
    expect(editor.getText()).toBe('Hello World');
  });

  test('should copy and paste text', () => {
    editor.type('abc');
    toolbar.clickButton('copy');
    editor.type('123');
    toolbar.clickButton('paste');
    expect(editor.getText()).toBe('abc123abc');
  });

  test('should undo last operation', () => {
    editor.type('foo');
    editor.type('bar');
    toolbar.clickButton('undo');
    expect(editor.getText()).toBe('foo');
    toolbar.clickButton('undo');
    expect(editor.getText()).toBe('');
  });

  test('should not fail when undoing with empty history', () => {
    expect(() => toolbar.clickButton('undo')).not.toThrow();
    expect(editor.getText()).toBe('');
  });

  test('should handle multiple copy and paste operations', () => {
    editor.type('A');
    toolbar.clickButton('copy');
    editor.type('B');
    toolbar.clickButton('paste');
    expect(editor.getText()).toBe('ABA');
    toolbar.clickButton('copy');
    toolbar.clickButton('paste');
    expect(editor.getText()).toBe('ABAABA');
  });

  test('should not execute command if button is not set', () => {
    expect(() => toolbar.clickButton('nonexistent')).not.toThrow();
  });

  test('should maintain correct history for undo after paste', () => {
    editor.type('X');
    toolbar.clickButton('copy');
    toolbar.clickButton('paste');
    expect(editor.getText()).toBe('XX');
    toolbar.clickButton('undo');
    expect(editor.getText()).toBe('X');
  });
});
