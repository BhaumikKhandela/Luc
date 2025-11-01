import { z } from 'zod';

export const editVideoInfoSchema = z.object({
    title: z.string().min(5, "Title must be at least 3 characters long"),
    description: z.string().min(100, "Description must be at least 10 characters long"),
});
