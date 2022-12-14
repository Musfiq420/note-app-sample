"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const note_1 = __importDefault(require("./models/note"));
const CONNECTION_STRING = "mongodb+srv://musfiq:24434@cluster0.afutsjg.mongodb.net/NoteDb?retryWrites=true&w=majority";
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect(CONNECTION_STRING);
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
app.get("/getNotes", (req, res) => {
    note_1.default.find({ user: req.query.user }, function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            res.send(data);
        }
    });
});
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/build', 'index.html'));
});
app.post("/deleteNote", (req, res) => {
    note_1.default.remove({ _id: req.body.id }, function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            res.send(data);
        }
    });
});
app.post("/addNote", (req, res) => {
    let newNote = new note_1.default({ title: req.body.title, body: req.body.body, user: req.body.user, favourite: req.body.favourite });
    newNote.save(function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(data.id);
            res.send({ id: data.id, title: req.body.title, body: req.body.body, user: req.body.user, favourite: req.body.favourite });
        }
    });
});
app.post("/updateNote", (req, res) => {
    const updated = { title: req.body.title, body: req.body.body, user: req.body.user, favourite: req.body.favourite };
    note_1.default.findByIdAndUpdate(req.body.id, updated, function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            res.send("Data inserted");
        }
    });
});
app.post("/markFavourite", (req, res) => {
    const updated = { favourite: req.body.favourite };
    note_1.default.findByIdAndUpdate(req.body.id, updated, function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            res.send({ favourite: req.body.favourite });
        }
    });
});
app.post("/moveToTrash", (req, res) => {
    const dateTime = new Date();
    const updated = { trashAt: dateTime };
    note_1.default.findByIdAndUpdate(req.body.id, updated, function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            res.send("Data inserted");
        }
    });
});
app.post("/restoreNote", (req, res) => {
    note_1.default.findByIdAndUpdate(req.body.id, { $unset: { trashAt: 1 } }, function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            res.send("Data inserted");
        }
    });
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
