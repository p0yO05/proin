const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.post("/addUser", UserController.addUser);
router.put("/:id", UserController.updateUser);
router.post("/:id", UserController.changeUserStatus);

module.exports = router;
