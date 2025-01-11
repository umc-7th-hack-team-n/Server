// src/services/couple.service.js
import { responseFromCouple } from "../dtos/couple.dto.js";
import { updateCouple, getCouple } from "../repositories/couple.repositories.js";
import {DuplicateCouple, NotFoundCouple } from "../errors/couple.error.js";

/**
 * 커플 정보 조회 서비스
 */
export const coupleInfo = async (coupleId) => {
  try {
    // 커플 정보 조회
    const couple = await getCouple(coupleId);
    if (!couple) {
      // 커플이 없을 경우 예외 던지기
      throw new NotFoundCouple("커플 정보를 찾을 수 없습니다.", { coupleId });
    }
    // 커플이 존재하면, 변환된 응답을 반환
    return responseFromCouple(couple);
  } catch (error) {
    throw error; // 에러를 상위로 전달
  }
};

/**
 * 커플 정보 수정 서비스
 */
export const coupleInfoUpdateService = async (coupleId, coupleData = null) => {
    // 커플 조회
    const couple = await getCouple(coupleId);
    if (!couple) {
      throw new NotFoundCouple("커플 정보를 찾을 수 없습니다.", { coupleId });
    }
  
    // 커플 정보 수정
    if (coupleData) {
      // 커플 정보 수정 로직
      const updatedCouple = await updateCouple(coupleId, coupleData);
      if (!updatedCouple) {
        throw new DuplicateCouple("중복된 커플 정보가 있습니다.", { coupleId });
      }
      return updatedCouple;
    }
    return couple;
  };