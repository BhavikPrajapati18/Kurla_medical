import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
    // console.log("Multer storing file");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // console.log("Multer changing name:- ", "Multer working fine");
  },
});

export const upload = multer({ storage });
