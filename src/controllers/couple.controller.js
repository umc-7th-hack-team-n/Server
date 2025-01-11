import { StatusCodes } from "http-status-codes";
import { updateCoupleInfo } from "../services/couple.service.js";
import { bodyToCouple, responseFromCouple } from '../dtos/couple.dto.js';
import { coupleInfo} from '../services/couple.service.js';
import { NotFoundCouple } from '../errors/couple.error.js';  // 추가: NotFoundCouple 임포트

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

export const handleCouple = async (req, res, next) => {
  /**
    #swagger.summary = '특정 커플 정보 조회 API';
    #swagger.description = '고유 ID를 사용하여 특정 커플의 세부 정보를 조회합니다.';
    #swagger.responses[200] = {
      description: '커플 정보 조회 성공',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              error: { type: 'object', nullable: true, example: null },
              success: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: '커플 정보 조회 성공' },
                  data: {
                    type: 'object',
                    properties: {
                      couple_id: { type: 'integer', example: 1 },
                      m_nickname: { type: 'string', example: 'john_doe' },
                      f_nickname: { type: 'string', example: 'jane_doe' },
                      couple_date: { type: 'string', format: 'date', example: '2025-01-01' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: '존재하지 않는 커플입니다.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'FAIL' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'A404' },
                  reason: { type: 'string', example: '커플을 찾을 수 없습니다.' },
                  data: { type: "integer", example: 11 }
                }
              },
              success: { type: 'object', nullable: true, example: null }
            }
          }
        }
      }
    };
*/
  try {
    const couple_id = parseInt(req.params.couple_id, 10); // couple_id 파싱

    // 서비스에서 커플 정보 조회
    const couple = await coupleInfo(couple_id);
    const responseData = responseFromCouple(couple);

    res.status(StatusCodes.OK).success({
      message: '커플 조회 성공!',
      data: responseData,
    });
  }catch (error) {
    if (error instanceof NotFoundCouple) {
      return res.error({
        errorCode: error.errorCode,
        reason: error.reason,
        data: error.data,
      });
    }
    next(error); 
  }
}; // 커플 정보 조회 API


