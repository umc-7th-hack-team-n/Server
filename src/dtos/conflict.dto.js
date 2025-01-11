export const createdGetJudgeConflictDTO = (body) => {
    return {
      couple_id: body.couple_id,
      c_text: body.c_text,
      score: body.score,
    }
  };