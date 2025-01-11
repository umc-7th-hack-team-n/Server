import { getPromiseByCoupleIdRepository, putPromiseByCoupleIdRepository } from '../repositories/promise.repository.js';
import { promiseCoupleIdDTO } from '../dtos/promise.dto.js';
import { checkCoupleExists } from '../repositories/promise.repository.js';
import { checkPromiseExists } from '../repositories/promise.repository.js';
import { makeNewPromise } from '../repositories/promise.repository.js';

export const getPromiseByCoupleIdService = async couple_id => {
  const dto = promiseCoupleIdDTO(couple_id);
  await checkCoupleExists(dto.couple_id);
  if (await !checkPromiseExists(dto.couple_id)) {
    return await makeNewPromise(dto.couple_id);
  }
  return await getPromiseByCoupleIdRepository(dto.couple_id);
};

export const putPromiseByCoupleIdService = async (couple_id, body) => {
  const dto = promiseCoupleIdDTO(couple_id);
  await checkCoupleExists(dto.couple_id);
  return await putPromiseByCoupleIdRepository(dto.couple_id, body);
};
