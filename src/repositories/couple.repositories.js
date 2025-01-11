//src/repositories/couple.repositories.js
import { prisma } from '../db.config.js';
import logger from '../logger.js';
// 커플 정보 조회
export const getCoupleById = async couple_id => {
  
    const couple = await prisma.couple.findUnique({
      where: { couple_id: couple_id },
    });
    return couple;
    
};

