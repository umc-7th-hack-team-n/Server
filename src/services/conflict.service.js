import { getConflictsByMonthRepository, getConflictsByIdRepository } from '../repositories/conflict.repository.js';
import { conflictMonthDTO, conflictIdDTO } from '../dtos/conflict.dto.js';

//monthly-conflict-api
export const getConflictsByMonthService = async month => {
  const dto = conflictMonthDTO(month);
  return await getConflictsByMonthRepository(dto.month);
};

//specific-conflict-api
export const getConflictsByIdService = async conflict_id => {
  const dto = conflictIdDTO(conflict_id);
  return await getConflictsByIdRepository(dto.conflict_id);
};
