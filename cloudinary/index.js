const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');


cloudinary.config({
    cloud_name: 'daopvsnw2',
    api_key: '352171346229274',
    api_secret: 'gpBHItzELN_gs5e78WL665i01Ps',
    secure: true,
  });
  
//   console.log(cloudinary);
  
  const storage = new CloudinaryStorage({
    cloudinary,
    // folder:'waterbb',
    // allowedFormats:['jpeg','jpg','png']
    params: {
      folder: 'waterbb',
      allowedFormats: (req, file) => ['png', 'jpg', 'jpeg'], // Return an array of allowed formats
    //   public_id: (req, file) => 'computed-filename-using-request',
    },
  });
  
//   console.log(storage);
  
  module.exports = {
      storage,
    cloudinary,
  };