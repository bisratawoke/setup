import { z } from "zod";

export const BlogCreateDto = z.object({
  title: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
});

export const BlogUpdateDto = BlogCreateDto.partial();

export type BlogCreateDto = z.infer<typeof BlogCreateDto>;
export type BlogUpdateDto = z.infer<typeof BlogUpdateDto>;
