const { Schema, model } = require('mongoose')

const schema = new Schema({
    _id: {
        type: Number
    },
    name: {
        type: String
    },
    surname: {
        type: String
    }
})

module.exports = model('Student', schema)