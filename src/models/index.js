const Sequelize = require('sequelize')
const user = require('./user')
const post = require('./post')
const comment = require('./comment')
const commentGroup = require('./commentGroup')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]
const db = {}

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
)

db.User = user
db.Post = post
db.Comment = comment
db.CommentGroup = commentGroup

Object.keys(db).forEach(modelName => {
    db[modelName].init(sequelize)
})

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db