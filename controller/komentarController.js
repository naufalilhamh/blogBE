const db = require("../app/db.js");
const Artikel = db.artikel;
const Komentar = db.komentar;
const asyncMiddleware = require("express-async-handler");

exports.tambahkomentar = asyncMiddleware(async (req, res) => {
  // Add book to Database
  await Komentar.create({
    isi_komentar: req.body.isi_komentar,
    id_artikel: req.params.id_artikel,
    id_user: req.params.id_user,
    status: "hide"
  });
  res.status(201).send({
    status:
      "Komentar untuk artikel yang ID " +
      req.params.id_artikel +
      " nya Berhasil Dibuat!"
  });
});

exports.updatestatuskomentar = asyncMiddleware(async (req, res) => {
  await Komentar.update(
    {
      status: "show"
    },
    { where: { id_komentar: req.params.id } }
  );
  res.status(201).send({
    status: "Komentar Sudah Tampil!"
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
exports.tampilkomentarperartikel = asyncMiddleware(async (req, res) => {
  const artikel = await Artikel.findOne({
    where: { id_artikel: req.params.id },
    attributes: ["id_artikel", "judul", "isi", "status", "id_user"],
    include: [
      {
        model: Komentar,
        attributes: ["isi_komentar", "id_user", "status", "createdAt"]
      }
    ]
  });
  res.status(200).json({
    description: "Tampil Komentar PerArtikel " + req.params.id,
    data: artikel
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

//delete book by id
exports.hapusartikel = asyncMiddleware(async (req, res) => {
  await Artikel.destroy({ where: { id_artikel: req.params.id } });
  res.status(201).send({
    status: "Hapus Artikel Berhasil!"
  });
});
