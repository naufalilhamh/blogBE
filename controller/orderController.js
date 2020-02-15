const db = require("../app/db.js");
const User = db.user;
const Book = db.book;

const asyncMiddleware = require("express-async-handler");

exports.ordering = asyncMiddleware(async (req, res) => {
  // Save order to Database
  console.log("Processing func -> Ordering");
  const user = await User.findOne({
    where: { id: req.userId }
  });
  const books = await Book.findOne({
    where: { id: req.params.id }
  });
  await user.addBooks(books);
  res.status(201).send({
    status: "Order Berhasil Dibuat!"
  });
});

//show all orders
exports.orders = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: ["title", "author", "pages", "language", "publisher_id"],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "Tampil Semua Order",
    user: user
  });
});

//find order by user id
exports.getOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: ["title", "author", "page", "language", "publisher_id"],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "Halama Order User",
    user: user
  });
});
