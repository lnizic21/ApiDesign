import { Router } from "express";
import { updateUsername, getUser } from './handlers/user';
import { createPost, updatePost, deletePost, getAllPosts, getPostById } from './handlers/post';
import { createNewUserAdmin, deleteUserAdmin, getAllUsersAdmin, deleteAllUsersAdmin } from './handlers/admin';
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

const adminRouter = Router();

adminRouter.post("/createUser", createNewUserAdmin);
adminRouter.delete("/deleteUser", deleteUserAdmin);
adminRouter.get("/getAllUsers", getAllUsersAdmin);
adminRouter.delete("/deleteAllUsers",deleteAllUsersAdmin);

export { router, adminRouter };