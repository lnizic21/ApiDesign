import { Router } from "express";
import { updateUsername, getUser } from './handlers/user';
import { createPost, updatePost, deletePost, getAllPosts, getPostById } from './handlers/post';
import { createNewUserAdmin, deleteUserAdmin, getAllUsersAdmin, deleteAllUsersAdmin } from './handlers/admin';
import { handleInputErrors } from './modules/middleware'
import { body } from "express-validator";
const router = Router();

router.get("/product", (req, res) => {
  res.json({ message: "product" });
});

router.get("/user", getUser);

router.post("/updateUsername",
  body("username").isString().notEmpty(),
  body("newUsername").isString().notEmpty(),
  handleInputErrors,
  updateUsername
);


router.post("/createPost",
  body("title").isString().notEmpty(),
  body("content").isString().notEmpty(),
  body("published").isBoolean(),
  body("authorId").isInt(),
  handleInputErrors,
  createPost);

router.put("/updatePost/:id",
  body("title").isString().optional(),
  body("content").isString().optional(),
  body("published").isBoolean(),
  handleInputErrors,
  updatePost);

router.delete("/deletePost/:id", deletePost);
router.get("/getPosts", getAllPosts);
router.get("/post/:id", getPostById);

const adminRouter = Router();

adminRouter.post("/createUser",
  body("username").isString().notEmpty(),
  body("password").isString().notEmpty(),
  handleInputErrors,
  createNewUserAdmin);

adminRouter.delete("/deleteUser", deleteUserAdmin);
adminRouter.get("/getAllUsers", getAllUsersAdmin);
adminRouter.delete("/deleteAllUsers",deleteAllUsersAdmin);

export { router, adminRouter };