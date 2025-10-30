
import winston from "winston"
import { getCorrelationId } from "../utils/helpers/request.helpers";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM:DD:YYYY HH:MM:SS" }),
        winston.format.json(), // format the log message as json
        // defining custom print
        winston.format.printf(({ timestamp, level, message, ...data }) => {
            const output = { level, message, timestamp, correlationId: getCorrelationId(), data };
            return JSON.stringify(output)
        })
    ),
    transports:[
        new winston.transports.Console(),
        // new winston.transports.File({filename:'logs/app.log'})
        new DailyRotateFile({
        filename: 'logs/application-%DATE%-app.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d'
        })
    ] 
})

export default logger;