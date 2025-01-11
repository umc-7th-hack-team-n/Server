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
  // if (!promise) {
  //   // Check if the couple_id exists in the Couple table
  //   const coupleExists = await prisma.couple.findUnique({
  //     where: { couple_id },
  //     select: { couple_id: true },
  //   });

  //   if (!coupleExists) {
  //     throw new coupleNotFoundError(`Couple with id ${couple_id} not found.`, { couple_id: couple_id });
  //   }

  //   // Log a message if the couple exists but no promise is found
  //   const new_promise = await prisma.promise.create({
  //     data: {
  //       couple: {
  //         connect: { couple_id },
  //       },
  //       text1: null,
  //       text2: null,
  //       text3: null,
  //       text4: null,
  //       text5: null,
  //       text6: null,
  //       text7: null,
  //       text8: null,
  //       text9: null,
  //       text10: null,
  //     },
  //   });

  //   return new_promise;
  // }

  return promise;
};

export const makeNewPromise = async couple_id => {
  const new_promise = await prisma.promise.create({
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
  return new_promise;
};

// Function to check if a couple exists
export const checkCoupleExists = async couple_id => {
  const coupleExists = await prisma.couple.findUnique({
    where: { couple_id },
  });

  console.log(coupleExists);
  if (!coupleExists) {
    console.log('!!!!!!!!!!!');
    throw new coupleNotFoundError(`Couple with id ${couple_id} not found.`, { couple_id: couple_id });
  }

  return true;
};

// Function to check if a promise exists for the given couple_id
export const checkPromiseExists = async couple_id => {
  const promise_exists = await prisma.promise.findFirst({
    where: { couple_id },
  });
  if (!promise_exists) {
    return false;
  }
  return promise_exists;
};

// Function to update or create a promise for a couple
export const updateOrCreatePromise = async (couple_id, updateData) => {
  // Check if a promise exists
  const existingPromise = await checkPromiseExists(couple_id);

  if (!existingPromise) {
    // Create a new promise if none exists
    console.log(`Creating new promise for couple_id ${couple_id}.`);
    const newPromise = await prisma.promise.create({
      data: {
        couple: {
          connect: { couple_id },
        },
        ...updateData,
      },
    });
    return newPromise;
  }

  // Update the existing promise
  console.log(`Updating existing promise for couple_id ${couple_id}.`);
  const updatedPromise = await prisma.promise.update({
    where: { id: existingPromise.id },
    data: {
      couple: {
        connect: { couple_id },
      },
      ...updateData,
    },
  });

  return updatedPromise;
};

// Main function to manage promise updates by couple_id
export const putPromiseByCoupleIdRepository = async (couple_id, updateData) => {
  // Update or create the promise
  const result = await updateOrCreatePromise(couple_id, updateData);

  return result;
};
