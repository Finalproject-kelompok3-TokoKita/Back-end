const multer = require("multer");
const path = require("path");

const uploader = (directory) => {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const uploadDirectory = path.resolve("public", directory);
        req.fileMetadata.dir = uploadDirectory;
        cb(null, uploadDirectory);
      },
      filename: function (req, file, cb) {
        console.log("Filename Metadata", file);
        const filename =
          Date.now() +
          "." +
          file.originalname.split(".")[file.originalname.split(".").length - 1];
        req.fileMetadata.storedFilename = filename;
        cb(null, filename);
      },
    }),
    fileFilter: function (req, file, cb) {
      console.log("File Filter Metadata", file);

      // Cek apakah ukuran file melebihi batas tertentu (misalnya, 5MB)
      if (file.size > 5242880) {
        return cb(new Error("Ukuran file terlalu besar. Maksimal 5MB."));
      }

      if (
        !["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype) ||
        !["png", "jpg", "jpeg"].find((ext) => file.originalname.endsWith(ext))
      ) {
        return cb(new Error("Invalid File"));
      }

      req.fileMetadata = file;
      cb(null, true);
    },
    limits: {
      fileSize: 5242880, // 5MB dalam byte
    },
  });
};

module.exports = uploader;
