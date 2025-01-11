// src/services/couple.service.js
import { responseFromCouple } from '../dtos/couple.dto.js';
import { getCoupleById } from '../repositories/couple.repositories.js';
import { NotFoundCouple } from '../errors/couple.error.js';

/**
 * 커플 정보 조회 서비스
 */
export const coupleInfo = async (couple_id) => {
  console.log('Searching for couple with ID:', couple_id); // couple_id 로그 찍기

  // 레포지토리에서 커플 정보 조회
  const couple = await getCoupleById(couple_id);

  console.log('Fetched Couple:', couple); // couple 객체 확인

  if (!couple) {
    throw new NotFoundCouple("커플 정보를 찾을 수 없습니다.", { couple_id: couple_id });
  }

  // 커플 정보가 있으면 응답 데이터 반환
  return responseFromCouple(couple);
};
