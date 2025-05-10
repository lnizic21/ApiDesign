import { Router } from "express";
import { updateUsername, getUser } from './handlers/user';
import { createPost, updatePost, deletePost, getAllPosts, getPostById } from './handlers/post';

const router = Router();

router.get("/product", (req, res) => {
  res.json({ message: "product" });
});

router.get("/user", getUser);
router.put("/updateUsername", updateUsername);
router.post("/post", createPost);
router.put("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);
router.get("/getPosts", getAllPosts);
router.get("/post/:id", getPostById);

export default router;