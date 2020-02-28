module.exports = (sequelize, Sequelize) => {
  const MdlArtikel = sequelize.define("artikel", {
    id_artikel: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    judul: {
      type: Sequelize.STRING
    },
    isi: {
      type: Sequelize.STRING
    },
    id_user: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.STRING
    }
  });
  return MdlArtikel;
};
