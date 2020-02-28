module.exports = (sequelize, Sequelize) => {
  const MdlKomentar = sequelize.define("komentar", {
    id_komentar: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    isi_komentar: {
      type: Sequelize.STRING
    },
    id_artikel: {
      type: Sequelize.INTEGER
    },
    id_user: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.STRING
    }
  });
  return MdlKomentar;
};
