import { prisma } from '..//db.config.js';

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
