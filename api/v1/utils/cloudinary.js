const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'pm4',
  api_key: '353432665156297',
  api_secret: '4GAUCWgDxW9Ji8IQ5JJSF7vztjk',
});

module.exports = cloudinary;
