const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ['Fiction', 'Science', 'Comic'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}
)

const BookModel = mongoose.model("book", BookSchema)

module.exports = {
    BookModel
}