credentials = require("./middi/credentials.js");
const corsOptions = require("./config/corsOptions.js");
const express = require("express");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "https://ssu-admin.netlify.app",
  })
);

app.use(cors(corsOptions));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//  for route
const user = require("./Routing/userRouting.js");
const admin = require("./Routing/adminRouting.js");
const public = require("./Routing/publicRouting.js");

app.use("/user", user);

app.use("/admin", admin);

app.use("/", public);

module.exports = app;
