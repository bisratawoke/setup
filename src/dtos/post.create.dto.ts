import { z } from "zod";

export const PostCreateDto = z.object({
  title: z.string().min(1).max(255),
});

export const findPostByIdDto = z.object({
  id: z.string().min(5).max(255),
});

export type PostCreateDto = z.infer<typeof PostCreateDto>;

export type findPostByIdDto = z.infer<typeof findPostByIdDto>;
