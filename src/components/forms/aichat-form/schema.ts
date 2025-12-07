import { z } from "zod";

export const createQuestionSchema = z.object({
    question: z.string().min(1, { message: "Question cannot be empty" }).max(500, { message: "Question is too long" }),
})