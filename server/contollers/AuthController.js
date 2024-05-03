const Usermodel = require("../models/usermodel");
const { hashPassword, comparePassword } = require("../helpers/authhelper");
const JWT = require("jsonwebtoken");
const fs = require("fs").promises;

async function registerController(req, res) {
  try {
    const { Name, Email, Password, Location, MobileNo } = req.fields;

    if (!Name || !Email || !Password || !Location) {
      return res
        .status(400)
        .send({ success: false, error: "All fields are required" });
    }
    const existingUsername = await Usermodel.findOne({ Name });

    const existingEmail = await Usermodel.findOne({ Email });

    const existingNumber = await Usermodel.findOne({ MobileNo });

    if (existingEmail) {
      return res
        .status(409)
        .send({ success: false, message: "Email already exists" });
    } else if (existingUsername) {
      return res
        .status(409)
        .send({ success: false, message: "Username is already taken" });
    } else if (existingNumber) {
      return res
        .status(409)
        .send({ success: false, message: "MobileNo already exists" });
    }

    const hashedPassword = await hashPassword(Password);
    const user = new Usermodel({
      Name,
      Email,
      Password: hashedPassword,
      Location,
      MobileNo,
    });

    if (req.files && req.files.photo) {
      user.photo.data = await fs.readFile(req.files.photo.path);
      user.photo.contentType = req.files.photo.type;
      await fs.unlink(req.files.photo.path);
    }

    await user.save();
    res
      .status(201)
      .send({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, error: "Internal server error" });
  }
}

async function loginController(req, resp) {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return resp.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //check user already exist or not with email

    const user = await Usermodel.findOne({ Email });

    if (!user) {
      return resp.status(404).send({
        success: false,
        message: "user not registered",
      });
    }

    const match = await comparePassword(Password, user.Password);

    if (!match) {
      //if password do not match
      return resp.status(210).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    resp.status(200).send({
      success: true,
      message: "login successfull",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
}

async function GetSingleUserInfo(req, resp) {
  try {
    const uid = req.params.uid;
    const user = await Usermodel.findById(uid).select("-photo");

    if (user) {
      resp.status(200).send({
        success: true,
        user,
      });
    } else {
      resp.status(400).send({
        success: false,
        message: "Cannot get user try again",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: " user error",
      error,
    });
  }
}

async function GetUserPhotoController(req, resp) {
  try {
    const user = await Usermodel.findById(req.params.id).select("photo");
    if (user.photo.data) {
      resp.set("Content-type", user.photo.contentType);
    }
    return resp.status(200).send(user.photo.data);
  } catch (error) {
    resp.status(404).send({
      success: false,
      message: "Error getting Product",
      error,
    });
  }
}
async function UpdateProfileController(req, res) {
  try {
    const { Name, Location, Number } = req.fields;
    const { photo } = req.files;

    const user = await Usermodel.findById(req.params.id);

    const existingUser = await Usermodel.findOne({ Number });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists with this number",
      });
    }

    const UpdatedUser = await Usermodel.findByIdAndUpdate(
      req.params.id,
      {
        Name: Name || user.Name,

        Location: Location || user.Location,
        MobileNo: Number || user.MobileNo,
      },
      { new: true }
    );
    if (photo) {
      UpdatedUser.photo.data = await fs.readFile(photo.path);
      UpdatedUser.photo.contentType = photo.type;
    }
    await UpdatedUser.save();

    res.status(200).send({
      success: true,
      message: "Profile Updated Succesfully",
      UpdatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Profile Updatedation",
    });
  }
}
async function UpdateSocialLinksController(req, res) {
  try {
    const { Github, LinkedIn, Website } = req.body;
    const { id } = req.params;
    const UpdatedUser = await Usermodel.findByIdAndUpdate(
      id,
      {
        Github: Github,
        LinkedIn: LinkedIn,
        Website: Website,
      },
      { new: true }
    );
    await UpdatedUser.save();

    res.status(200).send({
      success: true,
      message: "Profile Updated Succesfully",
      UpdatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Updatedation",
    });
  }
}

async function UpdatePasswordController(req, res) {
  try {
    const { OldPassword, NewPassword } = req.fields;

    if (!NewPassword || NewPassword.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Check Password length",
      });
    }
    const user = await Usermodel.findById(req.params.id);

    const match = await comparePassword(OldPassword, user.Password);

    if (!match) {
      return res.status(210).send({
        success: false,
        message: "Invalid  Oldpassword",
      });
    }
    const hashedPassword = await hashPassword(NewPassword);

    const UpdatedUser = await Usermodel.findByIdAndUpdate(
      req.params.id,
      {
        Password: hashedPassword,
      },
      { new: true }
    );

    await UpdatedUser.save();

    res.status(200).send({
      success: true,
      message: "Password Updated ",
      UpdatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Profile Updatedation",
      user,
    });
  }
}

async function GetAllUsers(req, resp) {
  try {
    const Users = await Usermodel.find()
      .select("-photo")
      .sort({ createdAt: -1 });
    if (Users) {
      return resp.status(200).send({
        Users,
        success: true,
      });
    } else {
      return resp.status(500).send({
        success: false,
        message: "Error getting users",
      });
    }
  } catch (error) {
    return resp.status(400).send({
      success: false,
      message: "Error in api",
    });
  }
}

module.exports = {
  registerController,
  loginController,
  GetSingleUserInfo,
  GetUserPhotoController,
  UpdateSocialLinksController,
  UpdatePasswordController,
  UpdateProfileController,
  GetAllUsers,
};
