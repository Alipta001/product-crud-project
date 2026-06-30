// const path=require('path')
// const fs=require('fs')
// const multer=require('multer')

// const FILE_TYPE_MAP={
//     'image/png':'png',
//     'image/jpeg':'jpeg',
//     'image/jpg':'jpg',
//     'image/gif':'gif',
//     'image/bmp':'bmp'
// }

// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         const isValid=FILE_TYPE_MAP[file.mimetype]
//         let uploadError=new Error('invalid image type')
//         if(isValid){
//             uploadError=null
//         }
//         cb(uploadError,'uploads')
//     },
//     filename:function(req,file,cb){
//         const fileName=file.originalname.split(' ').join('-')
//         const extension=FILE_TYPE_MAP[file.mimetype]
//         cb(null,`${fileName}-${Date.now()}.${extension}`)
//     }
// })
// const ProductImage=multer({storage:storage})

// module.exports=ProductImage


const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",

    allowed_formats: ["jpg", "jpeg", "png", "webp"],

    resource_type: "image",
  },
});

const upload = multer({ storage });

module.exports = upload;