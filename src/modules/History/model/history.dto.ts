import { z } from "zod";

export const createHistoryRecordDTO = z.object({
  flagImage: z.string().nonempty(),
  countryName: z.string().nonempty(),
  userAnswer: z.string().nonempty(),
});

export type CreateHistoryRecordDTO = z.infer<typeof createHistoryRecordDTO>;
