const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    snippet: {
        type: String,
        required: [true, 'Please add a short snippet']
    },
    content: {
        type: String,
        required: [true, 'Please add blog content']
    },
    coverImage: {
        type: String,
        default: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);