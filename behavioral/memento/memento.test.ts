import { DrawingMemento, DrawingBoard, HistoryBoard } from './memento';

describe('DrawingMemento', () => {
  it('should clone shapes array to avoid mutation', () => {
    const shapes = ['Circle', 'Square'];
    const memento = new DrawingMemento(shapes);
    shapes.push('Triangle');
    expect(memento.getShapes()).toEqual(['Circle', 'Square']);
  });

  it('should return a copy of shapes array', () => {
    const memento = new DrawingMemento(['Circle']);
    const shapes = memento.getShapes();
    shapes.push('Square');
    expect(memento.getShapes()).toEqual(['Circle']);
  });
});

describe('DrawingBoard', () => {
  let board: DrawingBoard;

  beforeEach(() => {
    board = new DrawingBoard();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.log as jest.Mock).mockRestore();
  });

  it('should add shapes and show board', () => {
    board.addShape('Circle');
    board.addShape('Square');
    board.showBoard();
    expect((console.log as jest.Mock).mock.calls[2][1]).toContain('Circle');
    expect((console.log as jest.Mock).mock.calls[2][1]).toContain('Square');
  });

  it('should save and restore board state', () => {
    board.addShape('Circle');
    const memento = board.save();
    board.addShape('Square');
    board.restore(memento);
    board.showBoard();
    const lastCall = (console.log as jest.Mock).mock.calls.pop();
    expect(lastCall?.[1]).toContain('Circle');
    expect(lastCall?.[1]).not.toContain('Square');
  });
});

describe('HistoryBoard', () => {
  it('should push and pop mementos', () => {
    const history = new HistoryBoard();
    const m1 = new DrawingMemento(['Circle']);
    const m2 = new DrawingMemento(['Circle', 'Square']);
    history.push(m1);
    history.push(m2);
    expect(history.pop()).toBe(m2);
    expect(history.pop()).toBe(m1);
    expect(history.pop()).toBeUndefined();
  });
});

describe('Integration: DrawingBoard with HistoryBoard', () => {
  let board: DrawingBoard;
  let history: HistoryBoard;

  beforeEach(() => {
    board = new DrawingBoard();
    history = new HistoryBoard();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.log as jest.Mock).mockRestore();
  });

  it('should undo board state using history', () => {
    board.addShape('Circle');
    history.push(board.save());

    board.addShape('Square');
    history.push(board.save());

    board.addShape('Triangle');
    board.showBoard();

    // Undo last shape
    board.restore(history.pop()!);
    board.showBoard();

    // Undo again
    board.restore(history.pop()!);
    board.showBoard();

    // Check board state after undos
    const calls = (console.log as jest.Mock).mock.calls;
    // Last showBoard should only have 'Circle'
    expect(calls[calls.length - 1][1]).toContain('Circle');
    expect(calls[calls.length - 1][1]).not.toContain('Square');
    expect(calls[calls.length - 1][1]).not.toContain('Triangle');
  });
});
