//! Expected output
//! Pick the correct colors for the info level
//* [INFO:2025-10-21:07] App running
//* [WARNING:2025-10-21:07] The memory use is high
//* [ERROR:2025-10-21:07] Error with the database connection.

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export type LogLevel = 'info' | 'warn' | 'error';

export const colors = {
  info: '\x1b[34m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
};

export const logType = {
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
};

export function createLogger(level: LogLevel) {
  return function (message: string) {
    return console.log(colors[level], `[${logType[level]}:${formatDate(new Date())}] ${message}`);
  };
}

// Ejemplo de uso
function main() {
  const infoLogger = createLogger('info');
  const warnLogger = createLogger('warn');
  const errorLogger = createLogger('error');

  infoLogger('App running');
  warnLogger('The memory use is high');
  errorLogger('Error with the database connection');
}

main();
