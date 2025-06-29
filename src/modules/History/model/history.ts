import { z } from "zod";
import { createHistoryRecordDTO } from "./history.dto";

export const historyRecord = createHistoryRecordDTO.extend({
  createdAt: z.number(),
});

// Convert historyRecord object into Zod array, so later we can validate the response from the localStorage inside application layer
export const historyRecords = z.array(historyRecord);

export type HistoryRecord = z.infer<typeof historyRecord>;
