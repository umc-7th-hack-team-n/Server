import { pool } from '../db.config.js';
import { prisma } from '../db.config.js';
import { NonExistCoupleInfoError } from '../errors/couple.error.js';

// 특정 커플 정보 수정하기
export const fixCoupleInfo = async (coupleId, updateData) => {
  // 먼저, 해당 coupleId가 존재하는지 확인
  const existingCouple = await prisma.couple.findUnique({
    where: { couple_id: parseInt(coupleId) },
  });

  // coupleId에 해당하는 커플이 없으면 에러 처리
  if (!existingCouple) {
    throw new NonExistCoupleInfoError('존재하지 않는 커플입니다.', { couple_id: coupleId });
  }

  const updateCouple = await prisma.couple.update({
    where: { couple_id: parseInt(coupleId) },
    data: updateData,
  });

  return updateCouple;
};
