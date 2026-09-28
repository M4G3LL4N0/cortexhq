import { z } from "zod";
import { DATA_SOURCES } from "./types";

const sourceEnum = z.enum(DATA_SOURCES);

export const brainSchema = z.object({
  sources: z.array(sourceEnum).min(1),
  notes: z.string().min(30).max(12000),
  question: z.string().min(8).max(2000),
});
