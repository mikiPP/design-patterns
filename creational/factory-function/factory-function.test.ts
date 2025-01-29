import { colors, createLogger } from './factory-function';

describe('Logger Factory Function', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log info messages with the correct format and color', () => {
    const infoLogger = createLogger('info');
    infoLogger('App running');

    expect(consoleSpy).toHaveBeenCalledWith(
      colors['info'],
      expect.stringMatching(/\[INFO:\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\] App running/),
    );
  });

  it('should log warning messages with the correct format and color', () => {
    const warnLogger = createLogger('warn');
    warnLogger('The memory use is high');

    expect(consoleSpy).toHaveBeenCalledWith(
      colors['warn'],
      expect.stringMatching(
        /\[WARNING:\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\] The memory use is high/,
      ),
    );
  });

  it('should log error messages with the correct format and color', () => {
    const errorLogger = createLogger('error');
    errorLogger('Error with the database connection');

    expect(consoleSpy).toHaveBeenCalledWith(
      colors['error'],
      expect.stringMatching(
        /\[ERROR:\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\] Error with the database connection/,
      ),
    );
  });
});
