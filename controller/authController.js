const db = require("../app/db.js");
const config = require("../app/config.js");
const User = db.user;
const Role = db.role;
const asyncMiddleware = require("express-async-handler");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = asyncMiddleware(async (req, res) => {
  // Save User to Database
  console.log("Processing func -> SignUp");
  await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    admin: req.body.admin,
    status: req.body.status
  });

  res.status(201).send({
    status: "User Berhasil Dibuat!"
  });

  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // const isiemail = {
  //   to: req.body.email,
  //   from: "perpustakaan@gmail.com",
  //   subject: "Sending with SendGrid is Fun",
  //   text: "Selamat Meminjam Buku",
  //   html: "<strong>Selamat Akun Anda sudah Dibuat</strong>"
  // };

  // sgMail.send(isiemail, (error, result) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     res.status(201).send({
  //       status: result
  //     });
  //   }
  // });
});

exports.signin = asyncMiddleware(async (req, res) => {
  console.log("Sign-In");

  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  });
  if (!user) {
    return res.status(404).send({
      auth: false,
      accessToken: null,
      reason: "User Tidak Ada!"
    });
  }
  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      auth: false,
      accessToken: null,
      reason: "Password Salah!"
    });
  } else if (user.status === "nonaktif") {
    return res.status(401).send({
      auth: false,
      accessToken: null,
      reason: "Akun Sedang Nonaktif!"
    });
  }

  const token = jwt.sign(
    { id: user.id_user, username: user.username },
    config.secret,
    {
      expiresIn: 86400 // expires in 24 hours
    }
  );
  res.status(200).send({
    auth: true,
    type: "Bearer",
    accessToken: token,
    admin: user.admin,
    id_user: user.id_user,
    status: user.status,
    name: user.name
  });
});
