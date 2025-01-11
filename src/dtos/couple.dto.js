export const createdFixCoupleInfoDTO = (updatedCouple) => {
    return {
      data: updatedCouple,
    };
  };

// src/dtos/couple.dtos.js
// 조회 데이터
export const bodyToCouple = body => {
  return {
    m_nickname: body.m_nickname,
    f_nickname: body.f_nickname,
    couple_date: new Date(body.couple_date),
  };
}; // 조회할 데이터 변환

export const responseFromCouple = couple => {
  console.log(couple);
  return {
    couple_id: couple.couple_id,
    m_nickname: couple.m_nickname,
    f_nickname: couple.f_nickname,
    couple_date: couple.couple_date,
  }; // 응답 데이터 반환
};