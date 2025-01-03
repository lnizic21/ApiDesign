import { Router } from "express";
import { updateUsername, getUser } from './handlers/user';
import { createPost, updatePost, deletePost, getAllPosts, getPostById } from './handlers/post';

const router = Router();

/**
 * Product
 */
router.get("/product", (req, res) => {
  res.json({ message: "product" });
});

/**
 * User
 */
router.get("/user", getUser);
router.put("/updateUsername", updateUsername);

/**
 * Post
 * 
 * POST /post - Kreira novi post
 * Primjer tijela zahtjeva:
 * {
 *   "title": "Naslov posta",
 *   "content": "Sadržaj posta",
 *   "published": true
 * }
 * 
 * PUT /post/:id - Ažurira post s danim ID-om
 * Primjer tijela zahtjeva:
 * {
 *   "title": "Ažurirani naslov",
 *   "content": "Ažurirani sadržaj",
 *   "published": false
 * }
 * 
 * DELETE /post/:id - Briše post s danim ID-om
 * 
 * GET /post - Dohvaća sve postove
 * 
 * GET /post/:id - Dohvaća post s danim ID-om
 */
router.post("/post", createPost);
router.put("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);
router.get("/getPosts", getAllPosts);
router.get("/post/:id", getPostById);

export default router;