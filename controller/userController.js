const db = require("../app/db.js");
const User = db.user;
const Role = db.role;
const asyncMiddleware = require("express-async-handler");
var bcrypt = require("bcryptjs");

exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["id_user", "name", "username", "email", "admin", "status"]
  });
  res.status(200).json({
    description: "Tampil Semua User",
    data: user
  });
});

exports.showUser = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: ["id", "name", "username", "email"]
  });
  res.status(200).json({
    data: user
  });
});

exports.userContent = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id_user: req.params.id },
    attributes: ["id_user", "name", "username", "email", "admin", "status"]
  });
  if (user) {
    res.status(200).json({
      data: user
    });
  } else {
    res.status(500).json({
      Erorr: "Akun Tidak Ada!"
    });
  }
});

exports.adminBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
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
  res.status(200).json({
    description: "Halaman Admin",
    user: user
  });
});

exports.managementBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
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
  res.status(200).json({
    description: "Halaman Management",
    user: user
  });
});
exports.updatestatus = asyncMiddleware(async (req, res) => {
  await User.update(
    {
      status: req.body.status,
      password: bcrypt.hashSync(req.body.password, 8)
    },
    { where: { id_user: req.params.id } }
  );
  res.status(201).send({
    status: "Status User Berhasil DiUpdate!"
  });
});
