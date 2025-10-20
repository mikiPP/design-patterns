import { AutomaticDoor, Closed, Opening, Open, Closing } from './state';

describe('AutomaticDoor', () => {
  let door: AutomaticDoor;

  beforeEach(() => {
    door = new AutomaticDoor();
  });

  test('should initialize in Closed state', () => {
    expect(door.getStateName()).toBe('Closed');
  });

  describe('Closed state', () => {
    test('should transition to Opening state when opened', () => {
      door.open();
      expect(door.getStateName()).toBe('Opening');
    });

    test('should stay in Closed state when close is called', () => {
      door.close();
      expect(door.getStateName()).toBe('Closed');
    });
  });

  describe('Opening state', () => {
    beforeEach(() => {
      door.setState(new Opening(door));
    });

    test('should not allow opening when already opening', () => {
      door.open();
      expect(door.getStateName()).toBe('Opening');
    });

    test('should not allow closing while opening', () => {
      door.close();
      expect(door.getStateName()).toBe('Opening');
    });
  });

  describe('Open state', () => {
    beforeEach(() => {
      door.setState(new Open(door));
    });

    test('should not allow opening when already open', () => {
      door.open();
      expect(door.getStateName()).toBe('Open');
    });

    test('should transition to Closing state when closed', () => {
      door.close();
      expect(door.getStateName()).toBe('Closing');
    });
  });

  describe('Closing state', () => {
    beforeEach(() => {
      door.setState(new Closing(door));
    });

    test('should transition to Opening state when opened', () => {
      door.open();
      expect(door.getStateName()).toBe('Opening');
    });

    test('should transition to Closed state when close is called', () => {
      door.close();
      expect(door.getStateName()).toBe('Closed');
    });
  });
});
