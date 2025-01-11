import { StatusCodes } from 'http-status-codes';
import { getPromiseByCoupleIdService, putPromiseByCoupleIdService } from '../services/promise.service.js';

export const getPromiseByCoupleId = async (req, res) => {
  /**
    #swagger.summary = '특정 커플의 약속 조회 API';
    #swagger.description = '커플 ID를 기반으로 Promise 테이블의 데이터를 조회합니다.';
    #swagger.parameters['couple_id'] = {
      in: 'path',
      description: '조회할 커플 ID',
      required: true,
      schema: {
        type: 'integer',
        example: 1
      }
    };
    #swagger.responses[200] = {
      description: '약속 데이터 조회 성공',
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
                  id: { type: 'integer', example: 1 },
                  couple_id: { type: 'integer', example: 1 },
                  text1: { type: 'string', example: '나는 지각하지 않겠습니다.' },
                  text2: { type: 'string', example: '나는 연락을 잘 하겠습니다.' },
                  text3: { type: 'string', example: '나는 늦게까지 게임하지 않겠습니다.' },
                  text4: { type: 'string', example: '나는 상대방의 의견을 존중하겠습니다.' },
                  text5: { type: 'string', example: null },
                  text6: { type: 'string', example: null },
                  text7: { type: 'string', example: null },
                  text8: { type: 'string', example: null },
                  text9: { type: 'string', example: null },
                  text10: { type: 'string', example: null }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: '잘못된 요청',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'FAIL' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'CP001' },
                  reason: { type: 'string', example: 'Couple with id 5 not found.' },
                  data: {
                    type: 'object',
                    properties: {
                      couple_id: { type: 'string', example: '5' }
                    }
                  }
                }
              },
              success: { type: 'object', nullable: true, example: null }
            }
          }
        }
      }
    };
 */

  const { couple_id } = req.params;

  const promise = await getPromiseByCoupleIdService(couple_id);
  res.status(StatusCodes.OK).success(promise);
};

export const putPromiseByCoupleId = async (req, res) => {
  /**
    #swagger.summary = '특정 커플의 약속 수정 및 생성 API';
    #swagger.description = '커플 ID를 기반으로 Promise 테이블의 약속 데이터를 수정하거나 생성합니다.';
    #swagger.parameters['couple_id'] = {
      in: 'path',
      description: '수정 또는 생성할 커플 ID',
      required: true,
      schema: {
        type: 'integer',
        example: 1
      }
    };
    #swagger.requestBody = {
      description: '수정할 약속 데이터',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              text1: { type: 'string', example: '나는 지각하지 않겠습니다.' },
              text2: { type: 'string', example: '나는 지각하지 않겠습니다.' },
              text3: { type: 'string', example: '나는 늦게까지 게임하지 않겠습니다.' },
              text4: { type: 'string', example: '나는 연락을 잘 하겠습니다.' },
              text5: { type: 'string', example: null },
              text6: { type: 'string', example: null },
              text7: { type: 'string', example: null },
              text8: { type: 'string', example: null },
              text9: { type: 'string', example: '끝난거같은데?' },
              text10: { type: 'string', example: null }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: '약속 데이터 수정 또는 생성 성공',
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
                  id: { type: 'integer', example: 1 },
                  couple_id: { type: 'integer', example: 1 },
                  text1: { type: 'string', example: '나는 지각하지 않겠습니다.' },
                  text2: { type: 'string', example: '나는 지각하지 않겠습니다.' },
                  text3: { type: 'string', example: '나는 늦게까지 게임하지 않겠습니다.' },
                  text4: { type: 'string', example: '나는 연락을 잘 하겠습니다.' },
                  text5: { type: 'string', example: null },
                  text6: { type: 'string', example: null },
                  text7: { type: 'string', example: null },
                  text8: { type: 'string', example: null },
                  text9: { type: 'string', example: '끝난거같은데?' },
                  text10: { type: 'string', example: null }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: '잘못된 요청',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'FAIL' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'CP002' },
                  reason: { type: 'string', example: 'Invalid couple_id: 1ㅁㄴ1. Must be a valid integer.' },
                  data: {
                    type: 'object',
                    properties: {
                      couple_id: { type: 'string', example: '1ㅁㄴ1' }
                    }
                  }
                }
              },
              success: { type: 'object', nullable: true, example: null }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: '커플 ID를 찾을 수 없음',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'FAIL' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'CP001' },
                  reason: { type: 'string', example: 'Couple with id 5 not found.' },
                  data: {
                    type: 'object',
                    properties: {
                      couple_id: { type: 'integer', example: 5 }
                    }
                  }
                }
              },
              success: { type: 'object', nullable: true, example: null }
            }
          }
        }
      }
    };
 */

  const { couple_id } = req.params;
  console.log('body:', req.body);
  const promise = await putPromiseByCoupleIdService(couple_id, req.body);
  res.status(StatusCodes.OK).success(promise);
};
