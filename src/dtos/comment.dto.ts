import { z } from "zod";

export const createCommentDto = z.object({
  content: z.string().min(1).max(255),
  post_id: z.string().min(5).max(100),
});

export const updateCommentDto = createCommentDto.partial();

export type createCommentDto = z.infer<typeof createCommentDto>;
export type updateCommentDto = z.infer<typeof updateCommentDto>;
