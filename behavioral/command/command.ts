/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 */

import { COLORS } from '../helpers/colors.ts';

// 1. Interfaz Command
interface Command {
  execute(): void;
}

// 2. Clase Receptor - TextEditor

class TextEditor {
  private text: string = '';
  private clipboard: string = '';
  private history: string[] = [];

  // Agregar texto al editor
  type(text: string): void {
    this.history.push(this.text); // Guardar estado antes de cambiarlo
    this.text += text;
  }

  // Copiar el texto actual
  copy(): void {
    this.clipboard = this.text;
    console.log(`Texto copiado al portapapeles: \n%c"${this.clipboard}"`, COLORS.blue);
  }

  // Pegar el texto del portapapeles
  paste(): void {
    this.history.push(this.text); // Guardar estado antes de pegar
    this.text += this.clipboard;
    console.log(`Texto después de pegar: \n%c"${this.text}"`, COLORS.blue);
  }

  // Deshacer la última acción
  undo(): void {
    if (this.history.length > 0) {
      this.text = this.history.pop()!;
      console.log(`Texto después de deshacer: \n%c"${this.text}"`, COLORS.blue);
      return;
    }

    console.log('No hay nada para deshacer.');
  }

  // Mostrar el texto actual
  getText(): string {
    return this.text;
  }
}

// 3. Clases de Comandos Concretos
class CopyCommand implements Command {
  private editor: TextEditor;

  // TODO: Inyectar el editor en el constructor y el método execute con la acción respectiva
}

class PasteCommand implements Command {
  private editor: TextEditor;

  // TODO: Inyectar el editor en el constructor y el método execute con la acción respectiva
}

class UndoCommand implements Command {
  private editor: TextEditor;

  // TODO: Inyectar el editor en el constructor y el método execute con la acción respectiva
}

// 4. Clase Cliente - Toolbar

class Toolbar {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    // TODO: Asignar el comando al botón correspondiente
  }

  clickButton(button: string): void {
    //TODO: Ejecutar el comando correspondiente al botón

    // TODO: Manejar el caso en que no haya un comando asignado al botón
    console.error(`No hay un comando asignado al botón "${button}"`);
  }
}

// 5. Código Cliente para probar el patrón Command
// !Nada del código main debe ser modificado
function main() {
  const editor = new TextEditor();
  const toolbar = new Toolbar();

  // Crear comandos para el editor
  const copyCommand = new CopyCommand(editor);
  const pasteCommand = new PasteCommand(editor);
  const undoCommand = new UndoCommand(editor);

  // Asignar comandos a los botones de la barra de herramientas
  toolbar.setCommand('copy', copyCommand);
  toolbar.setCommand('paste', pasteCommand);
  toolbar.setCommand('undo', undoCommand);

  // Simulación de edición de texto
  editor.type('H');
  editor.type('o');
  editor.type('l');
  editor.type('a');
  editor.type(' ');
  editor.type('M');
  editor.type('u');
  editor.type('n');
  editor.type('d');
  editor.type('o');
  editor.type('!');
  console.log(`Texto actual: %c"${editor.getText()}"`, COLORS.green);

  // Usar la barra de herramientas
  console.log('\nCopiando texto:');
  toolbar.clickButton('copy');

  console.log('\nPegando texto:');
  toolbar.clickButton('paste');

  console.log('\nDeshaciendo la última acción:');
  toolbar.clickButton('undo');

  console.log('\nDeshaciendo de nuevo:');
  toolbar.clickButton('undo');

  console.log(`\nTexto final: "${editor.getText()}"`);
}

main();
