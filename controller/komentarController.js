const db = require("../app/db.js");
const Artikel = db.artikel;
const Komentar = db.komentar;
const User = db.user;
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

exports.tampilkankomen = asyncMiddleware(async (req, res) => {
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
exports.sembunyikankomen = asyncMiddleware(async (req, res) => {
  await Komentar.update(
    {
      status: "hide "
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
    attributes: [
      "id_artikel",
      "judul",
      "isi",
      "status",
      "id_user",
      "createdAt"
    ],
    include: [
      {
        model: Komentar,
        where: { status: "show" },
        required: false,
        require: false,
        attributes: [
          "id_komentar",
          "id_user",
          "isi_komentar",
          "status",
          "createdAt"
        ],
        include: [
          {
            model: User,
            attributes: ["id_user", "name"]
          }
        ]
      }
    ]
  });
  res.status(200).json({
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
exports.tampilsemuakomentar = asyncMiddleware(async (req, res) => {
  const komentar = await Komentar.findAll({
    attributes: ["id_komentar", "isi_komentar", "id_user", "status"],
    include: [
      {
        model: User,
        attributes: ["id_user", "name"]
      }
    ]
  });
  console.log(req.data);

  res.status(200).json({
    description: "Tampil Semua Artikel",
    data: komentar
  });
});

//delete book by id
exports.hapuskomentar = asyncMiddleware(async (req, res) => {
  await Komentar.destroy({ where: { id_komentar: req.params.id } });
  res.status(201).send({
    status: "Hapus Artikel Berhasil!"
  });
});
