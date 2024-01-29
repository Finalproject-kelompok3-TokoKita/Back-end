const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploader = (directory) => {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const uploadDirectory = path.resolve("public", directory);
        if (!fs.existsSync(uploadDirectory)) {
          fs.mkdirSync(uploadDirectory, { recursive: true });
        }

        req.fileMetadata.dir = uploadDirectory;
        cb(null, uploadDirectory);
      },
      filename: function (req, file, cb) {
        console.log("Filename Metadata", file);
        const extname = path.extname(file.originalname);

        const filename = Date.now() + extname;
        req.fileMetadata.storedFilename = filename;
        cb(null, filename);
      },
    }),
    fileFilter: function (req, file, cb) {
      console.log("File Filter Metadata", file);
      if (file.size > 5242880) {
        return cb(new Error("Ukuran file terlalu besar. Maksimal 5MB."));
      }

      const extname = path.extname(file.originalname);

      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype) || ![".png", ".jpg", ".jpeg"].includes(extname)) {
        return cb(new Error("Invalid File Type"));
      }

      req.fileMetadata = file;
      cb(null, true);
    },
    limits: {
      fileSize: 5242880,
    },
  });
};

module.exports = uploader;
