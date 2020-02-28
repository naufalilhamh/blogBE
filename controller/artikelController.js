const db = require("../app/db.js");
const Artikel = db.artikel;
const asyncMiddleware = require("express-async-handler");

exports.tambahartikel = asyncMiddleware(async (req, res) => {
  // Add book to Database
  await Artikel.create({
    judul: req.body.judul,
    isi: req.body.isi,
    id_user: req.params.id,
    status: "hide"
  });
  res.status(201).send({
    status: "Artikel Berhasil Dibuat!"
  });
});
exports.updatestatusartikel = asyncMiddleware(async (req, res) => {
  await Artikel.update(
    {
      status: "show"
    },
    { where: { id_artikel: req.params.id } }
  );
  res.status(201).send({
    status: "Status Artikel Sudah Tampil!"
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
    data: book
  });
});

//tampil buku by id
exports.tampilsemuaartikel = asyncMiddleware(async (req, res) => {
  const artikel = await Artikel.findAll({
    attributes: ["id_artikel", "judul", "isi", "id_user", "status"]
  });
  res.status(200).json({
    description: "Tampil Semua Artikel",
    data: artikel
  });
});

exports.tampilartikelperIDpembuat = asyncMiddleware(async (req, res) => {
  const artikel = await Artikel.findAll({
    where: { id_user: req.params.id },
    attributes: ["id_artikel", "judul", "isi", "status", "id_user"]
  });
  res.status(200).json({
    description: "Tampil Artikel PerID " + req.params.id,
    data: artikel
  });
});

//delete book by id
exports.hapusartikel = asyncMiddleware(async (req, res) => {
  await Artikel.destroy({ where: { id_artikel: req.params.id } });
  res.status(201).send({
    status: "Hapus Artikel Berhasil!"
  });
});
