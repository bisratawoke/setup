import express, { Router } from "express";
import {
  create,
  findAll,
  findById,
  remove,
  update,
} from "../services/post.service";
import genericValidationMiddleware from "../middlewares/validation.middleware";

import { findPostByIdDto, PostCreateDto } from "../dtos/post.create.dto";
export const postController: Router = express.Router();

postController.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const posts = await findAll();
    res.json(posts);
  }
);

postController.get("/:id", async (req, res): Promise<void> => {
  const { id } = req.params;
  const post = await findById(id);
  res.json(post);
});

postController.post(
  "/",
  genericValidationMiddleware(PostCreateDto, "body"),
  async (req, res): Promise<void> => {
    const { title } = req.validatedData as PostCreateDto;
    const post = await create({ title });
    res.json(post);
  }
);

postController.put(
  "/:id",
  genericValidationMiddleware(findPostByIdDto, "params"),
  async (req, res): Promise<void> => {
    const { id } = req.params;
    const { title } = req.body;
    const post = await update(id, { title });
    res.json(post);
  }
);

postController.delete("/:id", async (req, res): Promise<void> => {
  const { id } = req.params;
  const post = await remove(id);
  res.json(post);
});
