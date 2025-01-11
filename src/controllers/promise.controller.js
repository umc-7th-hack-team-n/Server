import { StatusCodes } from 'http-status-codes';
import { getPromiseByCoupleIdService } from '../services/promise.service.js';

/**
 * @swagger
 * /api/promise/{couple_id}:
 *   get:
 *     summary: 특정 커플의 약속 조회 API
 *     description: 커플 ID를 기반으로 Promise 테이블의 데이터를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: couple_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 조회할 커플 ID
 *     responses:
 *       200:
 *         description: 약속 데이터 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: SUCCESS
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 success:
 *                   type: object
 *                   properties:
 *                     promise_id:
 *                       type: integer
 *                       example: 1
 *                     couple_id:
 *                       type: integer
 *                       example: 1
 *                     text1:
 *                       type: string
 *                       example: "나는 지각하지 않겠습니다."
 *                     text2:
 *                       type: string
 *                       example: "나는 연락을 잘 하겠습니다."
 *                     ...
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: FAIL
 *                 error:
 *                   type: string
 *                   example: Invalid couple_id
 *                 success:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
export const getPromiseByCoupleId = async (req, res) => {
  const { couple_id } = req.params;

  const promise = await getPromiseByCoupleIdService(couple_id);
  res.status(StatusCodes.OK).success(promise);
};
