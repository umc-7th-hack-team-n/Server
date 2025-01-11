import { StatusCodes } from 'http-status-codes';
import { getConflictsByMonthService, getConflictsByIdService } from '../services/conflict.service.js';

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
