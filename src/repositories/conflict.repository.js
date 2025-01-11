import { prisma } from "../db.config.js";
import { pool } from "../db.config.js";

//gpt가 작성한 판결문 데이터 삽입
export const addJudgement = async (data) => {
    const conn = await pool.getConnection();

    // 커플이 존재하는지 먼저 확인
    const [couple] = await pool.query(`SELECT * FROM Conflict WHERE couple_id = ?;`, [data.couple_id]);

    if (couple.length === 0) {
        return null;
      }

    try {
          const [result] = await pool.query(
            `INSERT INTO Conflict (couple_id, score, m_text, f_text, c_text) VALUES (?, ?, ?, ?, ?);`,
            [
              data.couple_id,
              data.score,
              data.m_text,
              data.f_text,
              data.c_text,
            ]
          );
      
          return result.insertId;
    } catch (error) {
        console.error("Error in addJudgement: ", error);
        throw error;
    }
};

//DB에 저장된 판결문 데이터 조회
export const getJudgement = async (conflictId) => {
    const conn = await pool.getConnection();

    try {
        const [conflicts] = await pool.query(`SELECT * FROM Conflict WHERE conflict_id = ?;`, [conflictId]);

        return conflicts[0];
    } catch (error) {
        console.error("Error in getJudgement: ", error);
        throw error;
    }
};