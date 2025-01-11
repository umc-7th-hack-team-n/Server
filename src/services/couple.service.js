// src/services/couple.service.js
import { responseFromCouple } from '../dtos/couple.dto.js';
import { updateCouple, getCoupleById } from '../repositories/couple.repositories.js';
import { DuplicateCouple, NotFoundCouple } from '../errors/couple.error.js';

/**
 * 커플 정보 조회 서비스
 */
export const coupleInfo = async couple_id => {
  try {
    // 레포지토리에서 커플 정보 조회
    const couple = await getCoupleById(couple_id);

    if (!couple) {
      throw new NotFoundCouple('커플 정보를 찾을 수 없습니다.', { couple_id });
    }

    // 커플 정보가 있으면 응답 데이터 반환
    return responseFromCouple(couple);
  } catch (error) {
    throw error; // 에러를 상위로 전달
  }
};

/**
 * 커플 정보 수정 서비스
 */



