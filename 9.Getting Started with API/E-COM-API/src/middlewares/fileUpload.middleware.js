// import multer
import multer from "multer";

// configure storage with filename and location
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + file.originalname);
  },
});

export const upload = multer({
  storage: storageConfig,
});
