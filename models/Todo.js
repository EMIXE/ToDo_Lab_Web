const { Schema, model } = require('mongoose')

const schema = new Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Todo', schema)