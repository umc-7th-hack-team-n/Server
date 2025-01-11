//src/repositories/couple.repositories.js
import { prisma } from "../db.config.js";
import logger from '../logger.js';
// 커플 정보 조회
export const getCouple = async (coupleId) => {
    try {
      const couple = await prisma.couple.findUnique({
        where: { couple_id: coupleId },
      });
  
  
      logger.info("Fetched Couple from DB:", couple); // 커플 데이터 확인
      return couple;
    } catch (error) {
      logger.error("Error fetching couple from DB:", error); // 에러 로그 찍기
      throw error;
    }
  };
  

  // 커플 정보 수정

  export const updateCouple = async (coupleId, coupleData) => {
    return await prisma.couple.update({
      where: { couple_id: coupleId },
      data: coupleData,
    });
  };