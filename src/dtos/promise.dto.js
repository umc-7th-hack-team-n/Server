import { coupleIdNotValidError } from '../errors/promise.error.js';
import logger from '../logger.js';

//get-promise-api
export const promiseCoupleIdDTO = couple_id => {
  logger.debug(couple_id);
  const parsed_couple_id = parseInt(couple_id, 10);
  const regex = /^\d+$/; // Check if couple_id consists only of digits
  if (!regex.test(couple_id)) {
    throw new coupleIdNotValidError(`Invalid couple_id: ${couple_id}. Must be a valid integer.`, {
      couple_id: couple_id,
    });
  }
  return { couple_id: parsed_couple_id };
};
