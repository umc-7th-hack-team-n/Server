import { getPromiseByCoupleIdRepository } from '../repositories/promise.repository.js';
import { promiseCoupleIdDTO } from '../dtos/promise.dto.js';

export const getPromiseByCoupleIdService = async couple_id => {
  const dto = promiseCoupleIdDTO(couple_id);
  return await getPromiseByCoupleIdRepository(dto.couple_id);
};
