import { prisma } from "../connections/db.connections";

export async function findAll() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (err) {}
}

export async function findById(id: string) {
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    return post;
  } catch (err) {}
}

export async function create(payload: { title: string }) {
  try {
    const post = await prisma.post.create({ data: payload });
    return post;
  } catch (err) {}
}

export async function update(id: string, payload: { title: string }) {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title: payload.title,
      },
    });
    return post;
  } catch (error) {}
}

export async function remove(id: string) {
  try {
    const post = await prisma.post.delete({ where: { id } });
    return post;
  } catch (error) {}
}
