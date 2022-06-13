const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const mongoose = require("mongoose");
require("dot-env").config();

mongoose.connect(`mongodb+srv://admin-swati:${process.env.MONGODB}@cluster0.hddpl4a.mongodb.net/notesDB`);

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Note = new mongoose.model("note", noteSchema);

const app = express();
// app.use(
//     cors({
//       origin: "http://localhost:3000",
//       credentials: true,
//       optionsSuccessStatus: 200,
//     })
// );
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.route("/api")
    .get((req, res) => {
        return (Note.find({}, "id title content",(err, foundNotes) => {
            if(err) {
                console.log(err);
            } else {
                res.send(foundNotes);
            }
        }))
    })
    .post((req, res) => {
        Note.create({title: req.body.title, content: req.body.content}, (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log("Successfully added a note to the DB");
            }
        })
    })
    .delete((req, res) => {
        console.log(req.body.id);
        Note.findByIdAndDelete(req.body.id, (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log("Successfully deleted the item from the DB");
                return (Note.find({}, "id title content",(err, foundNotes) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.send(foundNotes);
                    }})
                )
            }
        })
    });

app.listen(process.env.PORT || 7000, () => {
    console.log("Server up and running on Heroku & local port 7000");
});