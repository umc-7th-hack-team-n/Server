import { MonthNotValidError } from '../errors/conflict.error.js';
import logger from '../logger.js';

export const conflictMonthDTO = month => {
  logger.debug(month);
  const regex = /^\d{4}-(0[1-9]|1[0-2])$/;
  if (!regex.test(month)) {
    const errorMessage = "Invalid month format. Expected 'YYYY-MM' with MM between 01 and 12.";
    throw new MonthNotValidError(errorMessage, {
      month,
    });
  }
  return { month };
};
