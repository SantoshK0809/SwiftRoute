const multer = require("multer");
const path = require("path");


// Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Directory to save uploaded files
//     },
//     filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename with original extension
//   }
// });

const storage = multer.memoryStorage(); // Store files in memory as Buffer

// module.exports.upload = multer({ storage: storage });
// module.exports.upload = multer({ storage: storage }).single("file"); // For single file upload

// const upload = multer({ storage: storage });

// Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


const upload = multer({
  storage,
  limits: { fileSize: 7 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and WEBP formats are allowed"), false);
    }
    cb(null, true);
  },
});

module.exports.upload = upload;