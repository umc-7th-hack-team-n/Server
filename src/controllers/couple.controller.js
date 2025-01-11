import { StatusCodes } from 'http-status-codes';
import { DuplicateCouple, NotFoundCouple } from '../errors/couple.error.js';
import { bodyToCouple, responseFromCouple } from '../dtos/couple.dto.js';
import { coupleInfo, coupleInfoUpdateService } from '../services/couple.service.js';
import logger from '../logger.js';

/**
 * @swagger
 * /couple/{couple_id}:
 *   get:
 *     summary: 커플 정보 조회
 *     description: 주어진 커플 ID에 해당하는 커플 정보를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: couple_id
 *         required: true
 *         description: 조회할 커플의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 커플 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: "SUCCESS"
 *                 success:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "커플 조회 성공"
 *                     data:
 *                       type: object
 *                       properties:
 *                         couple_id:
 *                           type: integer
 *                           example: 1
 *                         m_nickname:
 *                           type: string
 *                           example: "john_doe"
 *                         f_nickname:
 *                           type: string
 *                           example: "jane_doe"
 *                         couple_date:
 *                           type: string
 *                           format: date
 *                           example: "2025-01-01"
 *       400:
 *         description: 잘못된 요청 (예: 잘못된 데이터)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: "FAIL"
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: "A100"
 *                     reason:
 *                       type: string
 *                       example: "잘못된 커플 ID"
 *                     data:
 *                       type: object
 *                       additionalProperties: true
 *       404:
 *         description: 존재하지 않는 커플입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: "FAIL"
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: "A404"
 *                     reason:
 *                       type: string
 *                       example: "커플을 찾을 수 없습니다."
 *                     data:
 *                       type: object
 *                       additionalProperties: true
 */
export const handleCouple = async (req, res, next) => {
  try {
    const couple_id = parseInt(req.params.couple_id, 10); // couple_id 파싱

    // 서비스에서 커플 정보 조회
    const couple = await coupleInfo(couple_id);

    if (!couple) {
      throw new NotFoundCouple('커플 정보를 찾을 수 없습니다.', { couple_id });
    }

    console.log('Fetched Couple Data:', couple); // couple 데이터 확인

    const responseData = responseFromCouple(couple);

    console.log('Response Data from responseFromCouple:', responseData); // 응답 데이터 확인

    return res.status(StatusCodes.OK).success({
      message: '커플 조회 성공!',
      data: responseData,
    });
  } catch (error) {
    next(error); // 에러 미들웨어로 전달
  }
}; // 커플 정보 조회 API

/**
 * @swagger
 * /couple/{couple_id}:
 *   put:
 *     summary: 커플 정보 수정
 *     description: 주어진 커플 ID에 해당하는 커플 정보를 수정합니다.
 *     parameters:
 *       - in: path
 *         name: couple_id
 *         required: true
 *         description: 수정할 커플의 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               m_nickname:
 *                 type: string
 *                 example: "john_doe"
 *               f_nickname:
 *                 type: string
 *                 example: "jane_doe"
 *               couple_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *     responses:
 *       200:
 *         description: 커플 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: "SUCCESS"
 *                 success:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "커플 정보 수정 성공"
 *                     data:
 *                       type: object
 *                       properties:
 *                         couple_id:
 *                           type: integer
 *                           example: 1
 *                         m_nickname:
 *                           type: string
 *                           example: "john_doe"
 *                         f_nickname:
 *                           type: string
 *                           example: "jane_doe"
 *                         couple_date:
 *                           type: string
 *                           format: date
 *                           example: "2025-01-01"
 *       400:
 *         description: 잘못된 요청 (예: 잘못된 데이터)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: "FAIL"
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: "A100"
 *                     reason:
 *                       type: string
 *                       example: "잘못된 요청 데이터"
 *                     data:
 *                       type: object
 *                       additionalProperties: true
 *       404:
 *         description: 존재하지 않는 커플입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: "FAIL"
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: "A404"
 *                     reason:
 *                       type: string
 *                       example: "커플을 찾을 수 없습니다."
 *                     data:
 *                       type: object
 *                       additionalProperties: true
 */
