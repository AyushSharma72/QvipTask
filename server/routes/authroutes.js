const express = require("express");
const {
  loginController,
  registerController,
  GetSingleUserInfo,
  GetUserPhotoController,
  UpdateSocialLinksController,
  UpdatePasswordController,
  UpdateProfileController,
  GetAllUsers,
} = require("../contollers/AuthController");

const formidable = require("express-formidable");

//roter object
const router = express.Router();

//register
router.post("/register", formidable(), registerController);

//login
router.post("/login", loginController);
//get info
router.get("/Getuserinfo/:uid", GetSingleUserInfo);

//get user photo
router.get("/get-userPhoto/:id", GetUserPhotoController);

router.get("/get-allusers", GetAllUsers);
//update user

router.put("/Profile/:id", formidable(), UpdateProfileController);

router.put("/ProfilePassword/:id", formidable(), UpdatePasswordController);

router.put("/ProfileLinks/:id", UpdateSocialLinksController);

module.exports = router;
