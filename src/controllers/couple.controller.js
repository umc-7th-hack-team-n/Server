import { StatusCodes } from "http-status-codes";
import { updateCoupleInfo } from "../services/couple.service.js";

// 커플 정보 수정하기
export const handleCoupleInfo = async (req, res, next) => {  
    
/*
#swagger.summary = '커플 정보 수정 API';
#swagger.description = '커플 정보를 수정합니다.';
#swagger.requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          m_nickname: { type: "string", example: "John" },
          f_nickname: { type: "string", example: "Jane" },
          couple_date: { type: "string", format: "date-time", example: "2024-01-15T00:00:00.000Z" }
        }
      }
    }
  }
};

#swagger.responses[200] = {
  description: "커플 정보 수정 성공 응답",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "SUCCESS" },
          error: { type: "object", nullable: true, example: null },
          success: {
            type: "object",
            properties: {
              couple_id: { type: "integer", example: 1 },
              m_nickname: { type: "string", example: "John" },
              f_nickname: { type: "string", example: "Jane" },
              couple_date: { type: "string", format: "date-time", example: "2024-01-15T00:00:00.000Z" }
            }
          }
        }
      }
    }
  }
};

#swagger.responses[400] = {
  description: "커플 정보 수정 실패 응답",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "CP005" },
              reason: { type: "string", example: "존재하지 않는 커플입니다." },
              data: {
                type: "object",
                properties: {
                  couple_id: { type: "integer", example: 11 }
                }
              }
            }
          },
          success: { type: "object", nullable: true, example: null }
        }
      }
    }
  }
};
*/

       console.log("커플 정보 수정");

       const coupleId = req.params.coupleId
       
       const coupleInfo = await updateCoupleInfo(coupleId, req.body);
   
       res.status(StatusCodes.OK).success(coupleInfo);
   
   };