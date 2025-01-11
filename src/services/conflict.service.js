import { createdGetJudgeConflictDTO } from "../dtos/conflict.dto.js";
import { NonExistCoupleError } from "../errors/conflict.error.js";
import { addJudgement } from "../repositories/conflict.repository.js";
import { getJudgement } from "../repositories/conflict.repository.js";
import { getConflictsByMonthRepository, getConflictsByIdRepository } from '../repositories/conflict.repository.js';
import { conflictMonthDTO, conflictIdDTO } from '../dtos/conflict.dto.js';

import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// OpenAI API를 사용하여 judgement 생성
const generateJudgement = async (m_text, f_text) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'user', content: `둘 중 누가 더 잘못을 했는지에 대해 150자 이내로 정리해서 알려줘. 반드시 
                    누가 더 잘못했다라는 내용이 들어가야만 해. 남자의 ${m_text}라는 주장과 여자의 ${f_text}라는 주장` },
            ],
            max_tokens: 500,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating judgement:', error);
        throw new Error('판결문 생성에 실패했습니다.');
    }
};

// OpenAI API를 사용하여 score 생성
const generateScore = async (m_text, f_text) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'user', content: `두 사람의 잘못과실이 10을 기준으로 몇 대 몇인지 알려줘. 이때 설명 없이 수치만 알려줘.
                    결과 값은 "숫자값:숫자값"의 형식이야. 또한 5:5, 10:0은 불가야. 남자의 ${m_text}라는 주장과 여자의 ${f_text}라는 주장` },
            ],
            max_tokens: 300,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating judgement:', error);
        throw new Error('판결문 생성에 실패했습니다.');
    }
};

// gpt api를 통해 판결
export const getJudgeConflict = async (data) => {
    try {
        // ChatGPT API를 호출
        const judgement = await generateJudgement(data.m_text, data.f_text);
        const score = await generateScore(data.m_text, data.f_text);

        // 생성된 judgement를 데이터에 추가
        const judgementData = await addJudgement({
            couple_id: data.couple_id,
            score: score,
            m_text: data.m_text,
            f_text: data.f_text,
            c_text: judgement,
        });

        if (judgementData === null || judgementData.length === 0) {
            throw new NonExistCoupleError("존재하지 않는 커플입니다.", { couple_id: data.couple_id });
        }

        const judgements = await getJudgement(judgementData);

        return createdGetJudgeConflictDTO(judgements);
    } catch (error) {
        throw error;
    }
};

//monthly-conflict-api
export const getConflictsByMonthService = async month => {
  const dto = conflictMonthDTO(month);
  return await getConflictsByMonthRepository(dto.month);
};

//specific-conflict-api
export const getConflictsByIdService = async conflict_id => {
  const dto = conflictIdDTO(conflict_id);
  return await getConflictsByIdRepository(dto.conflict_id);
};
