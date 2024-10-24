import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  // Write your code here
  destination: function (req, file, cb) {
    cb(null, path.join("public", "uploads"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

export default multer({ storage });
