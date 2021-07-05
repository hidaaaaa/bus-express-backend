const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    plate: {
        type: String,
        required: true
    },
    trip_id: {
        type: String,
        required: true
    },
    date_go: {
        type: Date,
        required: true
    },
    times: {
        type: Number,
        required: true,
        default: 1
    },
    stars: {
        type: Number,
        required: true
    }


});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
