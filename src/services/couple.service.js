import { fixCoupleInfo } from "../repositories/couple.repository.js";
import { createdFixCoupleInfoDTO } from "../dtos/couple.dto.js";

// 커플 정보 수정 api
export const updateCoupleInfo = async (coupleId, updateData) => {
    const updatedCouple = await fixCoupleInfo(coupleId, updateData)
  
    return createdFixCoupleInfoDTO(updatedCouple);
  };