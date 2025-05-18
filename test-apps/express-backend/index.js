const express = require('express');
const app = express();
const ImageKit = require('imagekit'); // Node.js SDK
const dotenv = require('dotenv');
dotenv.config();

const imagekit = new ImageKit({
  urlEndpoint: 'https://ik.imagekit.io/demo', // https://ik.imagekit.io/your_imagekit_id
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

// allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/auth', function (req, res) {
  // Your application logic to authenticate the user
  // For example, you can check if the user is logged in or has the necessary permissions
  // If the user is not authenticated, you can return an error response
  const { token, expire, signature } = imagekit.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});

app.listen(3001, function () {
  console.log('Live at Port 3001');
});