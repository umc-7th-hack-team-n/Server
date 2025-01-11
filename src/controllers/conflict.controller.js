// conflict.controller.js

import { StatusCodes } from 'http-status-codes';
import { getConflictsByMonthService } from '../services/conflict.service.js';

// 특정 달의 싸움 기록 가져오기
export const getConflictsByMonth = async (req, res, next) => {
  const { month } = req.params;
  const conflicts = await getConflictsByMonthService(month);
  res.status(StatusCodes.OK).success(conflicts);
};
