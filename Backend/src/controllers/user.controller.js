const User = require("../models/user.model.js");
const { handleCreateUser } = require("../services/user.service.js");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken.model.js");
const cloudinary = require("../utils/cloudinary.config.js");
const { upload } = require("../services/multer.service.js");
const streamifier = require("streamifier");

async function handleRegisterUser(req, res) {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid input",
        erros: errors.array(),
      });
    }

    const { fullname, password, email } = req.body;

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await handleCreateUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      password: hashedPassword,
      email,
    });

    const token = await user.generateAuthToken();
    res.cookie("token", token);

    return res.status(201).json({
      message: "User created successfully.",
      token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(
      `Error in user register controller - Err message -> ${err.message}, FULL ERROR -> ${err}`,
    );
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function handleLoginUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid input",
        erros: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    console.log(`User loggedIn successfully. User name ${(email, password)}`);

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = await user.generateAuthToken();
    res.cookie("token", token);

    res.status(200).json({
      message: "User logged in successfully.",
      token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(
      `Error in user login controller - Err message -> ${err.message}, FULL ERROR -> ${err}`,
    );
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function handleGetUserProfile(req, res) {
  try {
    // const userId = req.params;
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const userId = req.user._id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // res.status(200).json({
    //   message: "User retrived successfully.",
    //   user: {
    //     userId,
    //     fullname: {
    //       firstname: user.firstname,
    //       lastname: user.lastname,
    //     },
    //     email: user.email,
    //   },
    // });

    res.status(200).json({
      message: "User profile retrieved successfully.",
      user,
    });
  } catch (err) {
    console.log(
      `Failed while retriving the user profile. ERROR MESSAGE - ${err.message}, FULL ERROR ${err}`,
    );
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function handleUserLogout(req, res) {
  try {
    const user = req.user;
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const isTokenBlacklisted = await BlacklistToken.findOne({ token });
    if (isTokenBlacklisted) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const blacklistedToken = new BlacklistToken({
      token,
    });

    await blacklistedToken.save();

    res.clearCookie("token");

    res.status(200).json({ message: "User logged out successfully." });
  } catch (err) {
    console.log(
      `Error in user logout controller - Err message -> ${err.message}, FULL ERROR -> ${err}`,
    );
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function handleUpdateUser(req, res) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const userId = req.user._id;
    let { fullname, phone, email, location } = req.body;
    const user = await User.findById(userId);

    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Parse fullname if it's a JSON string (comes from FormData)
    if (typeof fullname === "string") {
      try {
        fullname = JSON.parse(fullname);
      } catch (e) {
        // If parsing fails, it's already an object
        console.log("Error in parsing name from frontend - ", e.message)
      }
    }

    const uploadFromBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "swiftRoute/users",
            public_id: `${userId}_${Date.now()}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    let imageUrl = user.profileImage?.url || user.profileImage || null;
    console.log("Before upload ->", imageUrl);

    try {
      if (req.file && req.file.buffer) {
        console.log("File received, uploading to Cloudinary...");
        const uploadResult = await uploadFromBuffer(req.file.buffer);
        console.log("Upload successful:", uploadResult.secure_url);
        imageUrl = uploadResult.secure_url;
      } else {
        console.log("No file provided, keeping existing image");
      }
    } catch (uploadError) {
      console.error("Image upload failed:", uploadError.message);
      return res.status(400).json({ 
        message: "Image upload failed", 
        error: uploadError.message 
      });
    }

    console.log("After upload ->", imageUrl);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        fullname: {
          firstname: fullname.firstname,
          lastname: fullname.lastname,
        },
        email,
        phone,
        location,
        profileImage: imageUrl,
      },
      { new: true },
    );

    res.status(200).json({
      message: "User profile updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.error(`Failed in updating user. Error message: ${err.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  handleRegisterUser,
  handleLoginUser,
  handleGetUserProfile,
  handleUserLogout,
  handleUpdateUser,
};
