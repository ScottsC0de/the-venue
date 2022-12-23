const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Playlist extends Model {}

Playlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    track_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artists_name: {
      type: DataTypes.STRING,
    },
    album_image: {
      type: DataTypes.BLOB,
    },

    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'playlist',
  }
);

module.exports = Playlist;
