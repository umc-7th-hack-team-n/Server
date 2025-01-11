import { ConflictIdNotValidError, MonthNotValidError } from '../errors/conflict.error.js';
import logger from '../logger.js';

//monthly-conflict-api
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

//specific-conflict-api
export const conflictIdDTO = conflict_id => {
  logger.debug(conflict_id);
  const parsed_conflict_id = parseInt(conflict_id, 10);
  const regex = /^\d+$/; // Check if conflict_id consists only of digits
  if (!regex.test(conflict_id)) {
    throw new ConflictIdNotValidError(`Invalid conflict_id: ${conflict_id}. Must be a valid integer.`, {
      conflict_id: conflict_id,
    });
  }
  return { conflict_id: parsed_conflict_id };
};
