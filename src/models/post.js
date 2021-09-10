const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                content:{
                    type:Sequelize.TEXT,
                    allowNull:false,
                }
            },
            {
                modelName:'Post',
                tableName:'posts',
                sequelize,
            }
        )
    }
    static associate(db) {
        db.Post.hasMany(db.CommentGroup);
        db.Post.hasMany(db.Comment);
        db.Post.belongsTo(db.User);
    }
}