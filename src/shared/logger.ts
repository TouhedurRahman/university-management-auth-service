import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf, prettyPrint } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
	const date = new Date(timestamp)
	const hour = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
  	return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

const infoLogger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'info' }),
    timestamp(),
    myFormat,
	prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
		filename: path.join(process.cwd(), 'logs', 'winston', 'successes', 'um-%DATE%-success.log'),
		datePattern: 'YYYY-MM-DD-HH',
		zippedArchive: true,
		maxSize: '20m',
		maxFiles: '14d'
  	})
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'error' }),
    timestamp(),
    myFormat,
	prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
		filename: path.join(process.cwd(), 'logs', 'winston', 'errors', 'um-%DATE%-error.log'),
		datePattern: 'YYYY-MM-DD-HH',
		zippedArchive: true,
		maxSize: '20m',
		maxFiles: '14d'
  	})
  ],
});

export {
	infoLogger,
	errorLogger
};
