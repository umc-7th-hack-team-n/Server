import { PrismaClient } from '@prisma/client';
import { coupleNotFoundError } from '../errors/promise.error.js';

const prisma = new PrismaClient();

export const getPromiseByCoupleIdRepository = async couple_id => {
  const promise = await prisma.promise.findFirst({
    where: { couple_id },
    select: {
      id: true,
      couple_id: true,
      text1: true,
      text2: true,
      text3: true,
      text4: true,
      text5: true,
      text6: true,
      text7: true,
      text8: true,
      text9: true,
      text10: true,
    },
  });
  if (!promise) {
    // Check if the couple_id exists in the Couple table
    const coupleExists = await prisma.couple.findUnique({
      where: { couple_id },
      select: { couple_id: true },
    });

    if (!coupleExists) {
      throw new coupleNotFoundError(`Couple with id ${couple_id} not found.`, { couple_id: couple_id });
    }

    // Log a message if the couple exists but no promise is found
    const newPromise = await prisma.promise.create({
      data: {
        couple: {
          connect: { couple_id },
        },
        text1: null,
        text2: null,
        text3: null,
        text4: null,
        text5: null,
        text6: null,
        text7: null,
        text8: null,
        text9: null,
        text10: null,
      },
    });

    return newPromise;
  }

  return promise;
};
