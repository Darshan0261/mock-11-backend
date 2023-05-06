const mongoose = require('mongoose');

const NoticeSchema = mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
})

const NoticeModel = mongoose.model('notice', NoticeSchema);

module.exports = {
    NoticeModel
}