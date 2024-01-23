const multer = require("multer");
const path = require("path");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDirectory = path.resolve("public", "users");
      req.fileMetadata.dir = uploadDirectory;
      cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
      console.log("Filename Metadata", file);
      const filename = Date.now() + "." + file.originalname.split(".")[file.originalname.split(".").length - 1];
      req.fileMetadata.storedFilename = filename;
      cb(null, filename);
    },
  }),
  fileFilter: function (req, file, cb) {
    console.log("File Filter Metadata", file);
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype) || !["png", "jpg", "jpeg"].find((ext) => file.originalname.endsWith(ext))) {
      return cb(new Error("Invalid File"));
    }

    req.fileMetadata = file;
    cb(null, true);
  },
  limits: {
    fileSize: 2097152,
  },
});

module.exports = upload;
