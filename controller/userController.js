const db = require("../app/db.js");
const User = db.user;
const Role = db.role;
const asyncMiddleware = require("express-async-handler");

exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["id", "name", "username", "email"],
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
    description: "Semua User",
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
    where: { id: req.params.id },
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
    data: user
  });
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
