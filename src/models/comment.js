const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                context: {
                    type:Sequelize.TEXT,
                    comment:"댓글 내용"
                },
                class:{
                    type:Sequelize.BOOLEAN,
                    comment: "계층(부모:0,자식:1)"
                },
                order:{
                    type:Sequelize.INTEGER,
                    comment: "순서"
                },
                likeCount:{
                    type:Sequelize.INTEGER,
                    comment:"좋아요 카운트",
                    defaultValue:0,
                },
                isDeleted:{
                    type:Sequelize.BOOLEAN,
                    defaultValue:0,
                    comment:"기본:0, 삭제:1"
                }
            },
            {
                modelName:'Comment',
                tableName:'comments',
                sequelize,
            }
        )
    }
    static associate(db) {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
        db.Comment.belongsTo(db.CommentGroup);
    }
}