const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                login_id: {
                    type:Sequelize.STRING(100),
                    allowNull:false,
                    unique:true,
                },
                password: {
                    type:Sequelize.STRING(100),
                    allowNull:false,
                },
                nickname: {
                    type:Sequelize.STRING(20),
                    allowNull:false,
                }
            },
            {
                modelName:'User',
                tableName:'users',
                sequelize,
            }
        )
    }
    static associate(db) {
        db.User.hasMany(db.Comment);
    }
}