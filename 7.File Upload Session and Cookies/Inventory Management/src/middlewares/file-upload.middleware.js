// 1.Install multer
// 2.Changes in View
// 3.Middleware to handle files
// 4.Apply that middleware
// 5.Update controller to update urls of images

import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

export const uploadFile = multer({
  storage: storageConfig,
});
