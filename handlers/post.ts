import { prisma } from '../db';

export const createPost = async (req, res) => {
  const { title, content, published , authorId } = req.body;
  

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId,
      },
    });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create post' });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;

  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        published,
      },
    });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to update post' });
  }
};



export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to delete post' });
  }
};

export const getAllPosts = async (req, res) => {
  const authorId = req.body.authorId;

  try {
    const posts = await prisma.post.findMany({
      where: { authorId },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to get posts' });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to get post' });
  }
};
