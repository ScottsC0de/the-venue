const User = require('./User');
const Playlist = require('./Playlist');
const Post = require('./Post');

User.hasMany(this.Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasOne(Playlist, {
    foreignKey: 'user_id',
});

Playlist.belongsTo(User,{
    foreignKey: 'driver_id',
});


module.exports = { User, Playlist, Post };
