import winston from "winston";

export const logger = winston.createLogger();

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.timestamp(),
      winston.format.prettyPrint(),
    ),
  }),
);
