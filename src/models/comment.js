const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type:Sequelize.TEXT,
                    allowNull:false,
                    comment:"댓글 내용"
                },
                // class:{
                //     type:Sequelize.ENUM('COMMENT','REPLY'),
                //     comment: "계층(부모:COMMENT,자식:REPLY)"
                // },
                // order:{
                //     type:Sequelize.INTEGER,
                //     comment: "순서"
                // },
                parentId:{
                    type:Sequelize.INTEGER,
                    comment:"REPLY 일시 부모 id"
                },
                likeCount:{
                    type:Sequelize.INTEGER,
                    comment:"좋아요 카운트",
                    defaultValue:0,
                },
                isDisplay:{
                  type:Sequelize.BOOLEAN,
                  defaultValue:false
                },
                isDeleted:{
                    type:Sequelize.BOOLEAN,
                    defaultValue:false,
                    comment:"기본:0, 삭제:1"
                }
            },
            {
                modelName:'comment',
                tableName:'comments',
                sequelize,
            }
        )
    }
    static associate(db) {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
        // db.Comment.belongsTo(db.CommentGroup, {foreignKey: 'groupId'});
        db.Comment.belongsToMany(db.User, {through : 'logUserCommentLike'});
    }
}