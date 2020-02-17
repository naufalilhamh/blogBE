const db = require("../app/db.js");
const Book = db.book;
const asyncMiddleware = require("express-async-handler");

exports.tambahbuku = asyncMiddleware(async (req, res) => {
  // Add book to Database
  await Book.create({
    title: req.body.title,
    author: req.body.author,
    published_date: req.body.published_date,
    page: req.body.page,
    language: req.body.language,
    publisher_id: req.body.publisher_id
  });
  res.status(201).send({
    status: "Buku Berhasil Dibuat!"
  });
});

//Ubah buku by id
exports.updatebuku = asyncMiddleware(async (req, res) => {
  await Book.update(
    {
      title: req.body.title,
      author: req.body.author,
      published_date: req.body.published_date,
      page: req.body.page,
      language: req.body.language,
      publisher_id: req.body.publisher_id
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Buku Berhasil DiUpdate!"
  });
});

//tampil buku by id
exports.caribuku = asyncMiddleware(async (req, res) => {
  const book = await Book.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "title",
      "author",
      "published_date",
      "page",
      "language",
      "publisher_id"
    ]
  });
  res.status(200).json({
    description: "Tampil Buku",
    book: book
  });
});

//tampil buku by id
exports.tampilsemuabuku = asyncMiddleware(async (req, res) => {
  const book = await Book.findAll({
    attributes: [
      "id",
      "title",
      "author",
      "published_date",
      "page",
      "language",
      "publisher_id"
    ]
  });
  res.status(200).json({
    description: "Tampil Semua Buku",
    book: book
  });
});

//delete book by id
exports.hapusbuku = asyncMiddleware(async (req, res) => {
  await Book.destroy({ where: { id: req.params.id } });
  res.status(201).send({
    status: "Hapus Buku Berhasil!"
  });
});
