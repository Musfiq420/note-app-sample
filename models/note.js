const mongoose = require('mongoose');
const schema = mongoose.Schema;

const NoteSchema = new schema({
    title:  String,
    body:   String,
    user: String,
    favourite: Boolean,
    trashAt: Date
})

module.exports = mongoose.model('Note', NoteSchema);