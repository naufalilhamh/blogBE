const db = require("../app/db.js");
const config = require("../app/config.js");
const User = db.user;
const Role = db.role;
const asyncMiddleware = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = asyncMiddleware(async (req, res) => {
  // Save User to Database
  console.log("Processing func -> SignUp");
  const user = await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  const roles = await Role.findAll({
    where: {
      name: {
        [Op.or]: req.body.roles
      }
    }
  });
  await user.setRoles(roles);
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
    },
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
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
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    config.secret,
    {
      expiresIn: 86400 // expires in 24 hours
    }
  );
  if (!user.roles[1]) {
    res.status(200).send({
      auth: true,
      type: "Bearer",
      accessToken: token,
      Role: user.roles[0].name,
      id_user: user.id
    });
  } else {
    res.status(200).send({
      auth: true,
      type: "Bearer",
      accessToken: token,
      Role: user.roles[1].name,
      id_user: user.id
    });
  }
});
