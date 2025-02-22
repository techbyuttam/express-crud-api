import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

// Log file path format: logs/YYYY-MM-DD.log
const logFilePath = path.join(__dirname, "..", "logs", "%DATE%.log");

const dailyRotateTransport = new DailyRotateFile({
    filename: logFilePath,
    datePattern: "YYYY-MM-DD",
    maxFiles: "30d", // Keep logs for 30 days
    zippedArchive: true, // Compress old logs
});

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new transports.Console(), // Logs in the console
        dailyRotateTransport, // Store logs by date
    ],
});

export default logger;
