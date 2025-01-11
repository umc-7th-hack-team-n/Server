import { StatusCodes } from "http-status-codes";
import { getJudgeConflict } from "../services/conflict.service.js";

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
