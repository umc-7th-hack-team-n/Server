import { getConflictsByMonthRepository } from '../repositories/conflict.repository.js';
import { conflictMonthDTO } from '../dtos/conflict.dto.js';

export const getConflictsByMonthService = async month => {
  const dto = conflictMonthDTO(month);
  return await getConflictsByMonthRepository(dto.month);
};
