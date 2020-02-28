const db = require("../app/db.js");
const User = db.user;
const Book = db.book;

const asyncMiddleware = require("express-async-handler");

exports.tambahorder = asyncMiddleware(async (req, res) => {
  // Save order to Database
  console.log("Processing func -> Ordering");
  const user = await User.findOne({
    where: { id: req.params.id_user }
  });
  const books = await Book.findOne({
    where: { id: req.params.id_buku }
  });
  await user.addBooks(books);
  res.status(201).send({
    status: "Order Berhasil Dibuat!"
  });
});

//show all orders
exports.tampilorder = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["id", "name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: [
          "id",
          "title",
          "author",
          "published_date",
          "page",
          "language",
          "publisher_id"
        ],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    data: user
  });
});

//find order by user id
exports.AmbilOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: ["id", "name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: [
          "id",
          "title",
          "author",
          "published_date",
          "page",
          "language",
          "publisher_id"
        ],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    data: user
  });
});
