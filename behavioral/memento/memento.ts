export class DrawingMemento {
  private shapes: string[];

  constructor(shapes: string[]) {
    // Clone the object to avoid unespected mutations
    this.shapes = [...shapes];
  }

  getShapes(): string[] {
    return [...this.shapes];
  }
}

export class DrawingBoard {
  private shapes: string[] = [];

  addShape(shape: string): void {
    this.shapes.push(shape);
    console.log(`Shape added: ${shape}`);
  }

  showBoard(): void {
    console.log('Current board: ', this.shapes.join(', ') || 'Empty');
  }

  save(): DrawingMemento {
    return new DrawingMemento(this.shapes);
  }

  restore(memento: DrawingMemento): void {
    this.shapes = memento.getShapes();
    console.log('Board status restored.');
  }
}

export class HistoryBoard {
  private mementos: DrawingMemento[] = [];

  push(memento: DrawingMemento): void {
    this.mementos.push(memento);
  }

  pop(): DrawingMemento | undefined {
    if (!this.mementos.length) {
      console.warn("You can't undo more.");
      return undefined;
    }

    return this.mementos.pop();
  }
}

function main(): void {
  const drawingBoard = new DrawingBoard();
  const history = new HistoryBoard();

  drawingBoard.addShape('Círculo');
  history.push(drawingBoard.save());

  drawingBoard.addShape('Cuadrado');
  history.push(drawingBoard.save());

  drawingBoard.addShape('Triángulo');
  drawingBoard.showBoard();

  drawingBoard.restore(history.pop()!);
  drawingBoard.showBoard();

  drawingBoard.restore(history.pop()!);
  drawingBoard.showBoard();
}

main();
