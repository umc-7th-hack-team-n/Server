import { StatusCodes } from "http-status-codes";
import { getJudgeConflict } from "../services/conflict.service.js";
import { getConflictsByMonthService, getConflictsByIdService } from '../services/conflict.service.js';

// gpt api를 통해 판결하기
export const handleJudgeConflict = async (req, res, next) => {

/*
#swagger.summary = '판결 API';
#swagger.description = 'ChatGPT API를 기반으로 연인간의 잘못을 판결합니다.'
#swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              couple_id: { type: "number", example : 1 },
              m_text: { type: "string", example : "남자친구가 늦게까지 술 마시고 연락도 안받는 거야. 게다가 집도 안 들어가고 결국 다음 날까지 연락을 안 받았어. 근데 이런 일이 한 두번이 아니야." },
              f_text: { type: "string", example : "아니 술 마시다보면 연락 안될 수도 있지.  그렇다고 복수한다면서 연락 회피하고 외박하는 게 말이 돼?" }
            }
          }
        }
      }
    };
#swagger.responses[200] = {
  description: "판결 성공 응답",
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
              c_text: { type: "string", example: "남자가 더 잘못했다. 술을 마시고 연락을 끊는 것은 한 번이면 오해일 수 있지만, 반복적으로 발생한다면 그것은 무시나 피하려는 행동으로 보입니다." },
              score: { type: "string", example: "7:3" }
            }
          }
        }
      }
    }
  }
};

#swagger.responses[400] = {
  description: "판결 실패 응답",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "C005" },
              reason: { type: "string", example: "존재하지 않는 커플입니다." },
              data: {
                type: "object",
                properties: {
                  couple_id: { type: "integer", example: 1 }
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

   
       console.log("gpt를 활용한 판결 요청");
       
       const judgement = await getJudgeConflict(req.body);
   
       res.status(StatusCodes.OK).success(judgement);
   
   };

//monthly-conflict-api
export const getConflictsByMonth = async (req, res, next) => {
  /**
    #swagger.summary = '월별 다툼 기록 조회 API';
    #swagger.description = '특정 월에 발생한 모든 다툼 기록을 조회합니다.';
    #swagger.parameters['month'] = {
      in: 'path',
      description: '조회할 월 (YYYY-MM 형식)',
      required: true,
      schema: {
        type: 'string',
        pattern: "^\\d{4}-(0[1-9]|1[0-2])$",
        example: '2025-01'
      }
    };
    #swagger.responses[200] = {
      description: '월별 다툼 기록 조회 성공',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              error: { type: 'object', nullable: true, example: null },
              success: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    conflict_id: { type: 'integer', example: 1 },
                    date: { type: 'string', format: 'date', example: '2025-01-02' }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: '잘못된 월 형식',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'CT001' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'CT001' },
                  reason: { type: 'string', example: 'Invalid month format. Expected \u2018YYYY-MM\u2019 with MM between 01 and 12.' },
                  data: {
                    type: 'object',
                    properties: {
                      month: { type: 'string', example: '2024-13' }
                    }
                  }
                }
              },
              success: { type: 'array', nullable: true, example: [] }
            }
          }
        }
      }
    };
*/
  const { month } = req.params;
  const conflicts = await getConflictsByMonthService(month);
  res.status(StatusCodes.OK).success(conflicts);
};

//sepecific-conflict-api
export const getConflictsById = async (req, res, next) => {
  /**
    #swagger.summary = '특정 다툼 기록 조회 API';
    #swagger.description = '고유 ID를 사용하여 특정 다툼의 세부 정보를 조회합니다.';
    #swagger.parameters['conflict_id'] = {
      in: 'path',
      description: '조회할 다툼의 고유 ID',
      required: true,
      schema: {
        type: 'integer',
        example: 1
      }
    };
    #swagger.responses[200] = {
      description: '다툼 기록 조회 성공',
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
                  conflict_id: { type: 'integer', example: 1 },
                  winner: { type: 'string', example: 'John' },
                  score: { type: 'integer', example: 60 },
                  m_text: { type: 'string', example: 'I prefer action movies.' },
                  f_text: { type: 'string', example: 'I prefer romantic movies.' },
                  c_text: { type: 'string', example: 'We decided to alternate choices.' },
                  created_at: { type: 'string', format: 'date-time', example: '2025-01-02T14:30:00Z' }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: '해당 ID로 다툼 기록을 찾을 수 없음',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'CT003' },
              error: { type: 'string', example: 'Conflict not found.' },
              success: { type: 'object', nullable: true, example: null }
            }
          }
        }
      }
    };
*/
  const { conflict_id } = req.params;
  const conflicts = await getConflictsByIdService(conflict_id);
  res.status(StatusCodes.OK).success(conflicts);
};
