import { prisma } from '..//db.config.js';
import { ConflictNotFoundError } from '../errors/conflict.error.js';
import logger from '../logger.js';
//monthly-conflict-api
export const getConflictsByMonthRepository = async month => {
  return await prisma.conflict
    .findMany({
      where: {
        created_at: {
          gte: new Date(`${month}-01`),
          lt: new Date(`${month}-31`),
        },
      },
      select: {
        conflict_id: true,
        created_at: true,
      },
    })
    .then(conflicts =>
      conflicts.map(conflict => ({
        conflict_id: conflict.conflict_id,
        date: conflict.created_at.toISOString().split('T')[0],
      })),
    );
};

//specific-conflict-api
export const getConflictsByIdRepository = async conflict_id => {
  console.log(conflict_id);
  const conflict = await prisma.conflict.findUnique({
    where: { conflict_id },
    include: {
      couple: {
        select: {
          m_nickname: true,
          f_nickname: true,
        },
      },
    },
  });

  if (!conflict) {
    logger.error(`Conflict with id ${conflict_id} not found.`);
    throw new ConflictNotFoundError(`Conflict with id ${conflict_id} not found.`, { conflict_id: conflict_id });
  }

  return conflict;
};
