const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.array("Image", 4);
const uploadFile = upload.single("Image");

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
    } else if (err) {
      return res.send(err);
    }

    next();
  });
};
const uploadImage = (req, res, next) => {
  uploadFile(req, res, err => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
    } else if (err) {
      return res.send(err);
    }

    next();
  });
};

const resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async file => {
      const filename = file.originalname.replace(/\..+$/, "");
      const newFilename = `${file.fieldname}-${Date.now()}-${Math.random()}.jpeg`;

      await sharp(file.buffer)
        .resize(736, 1000)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`./public/images/product/${newFilename}`);
      console.log(newFilename);
      req.body.images.push(newFilename);
    })
  );

  next();
};


const resizeCategoryImage = async (req, res, next) => {
  if (!req.file) return next();
  const file = req.file
  const filename = file.originalname.replace(/\..+$/, "");
  const newFilename = `${file.fieldname}-${Date.now()}-${Math.random()}.jpeg`;

  await sharp(file.buffer)
    .resize(300, 400)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`./public/images/category/${newFilename}`);
  console.log(newFilename);
  req.body.image = newFilename



  next();
};
const resizeBannerImage = async (req, res, next) => {
  if (!req.file) return next();
  const file = req.file
  const filename = file.originalname.replace(/\..+$/, "");
  const newFilename = `${file.fieldname}-${Date.now()}-${Math.random()}.jpeg`;

  await sharp(file.buffer)
    .resize(768, 1024)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`./public/images/banner/${newFilename}`);
  console.log(newFilename);
  req.body.image = newFilename
  next();
};
const resizeCustomImage = async (req, res, next) => {
  if (!req.file) return next();
  const file = req.file
  const filename = file.originalname.replace(/\..+$/, "");
  const newFilename = `${file.fieldname}-${Date.now()}-${Math.random()}.jpeg`;

  await sharp(file.buffer)
    .toFormat("jpeg")
    .jpeg({ quality: 100 })
    .toFile(`./public/images/custom/${newFilename}`);
  console.log(newFilename);
  req.body.image = newFilename
  next();
};

module.exports = {
  uploadImages: uploadImages,
  resizeImages: resizeImages,
  uploadImage: uploadImage,
  resizeCategoryImage: resizeCategoryImage,
  resizeBannerImage: resizeBannerImage,
  resizeCustomImage: resizeCustomImage

};