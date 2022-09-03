"use strict";
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const NoteSchema = new schema({
    title: String,
    body: String,
});
module.exports = mongoose.model('Note', NoteSchema);
