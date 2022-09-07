//@ts-nocheck
  import dotenv from "dotenv";
  import express, { Express, Request, Response } from "express";
  import path from "path";
  import cors from "cors";
  import mongoose from 'mongoose';
  import Note from "./models/note";
  const CONNECTION_STRING = "mongodb+srv://musfiq:24434@cluster0.afutsjg.mongodb.net/NoteDb?retryWrites=true&w=majority"

  

  dotenv.config();

  const app: Express = express();

  app.use(express.json());
  app.use(cors());

  
  
  
  mongoose.connect(CONNECTION_STRING);
  
  
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get("/getNotes", (req, res) => {
    Note.find(function(err, data) {
        if(err) {
            console.log(error);
        }
        else { 
            res.send(data);
        }
    });
    
  });  
  

  app.get('/*', (req: Request, res: Response) => {
   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

app.post("/deleteNote", (req, res) => {
  Note.remove({_id:req.body.id}, function (err, data) {
      if(err) {
          console.log(error);
      }
      else {
          res.send(data); 
      }
  });
  
});  


app.post("/addNote", (req, res) => {
  let newNote = new Note({title:req.body.title, body:req.body.body});
  newNote.save(function(err, data) {
      if(err) {
          console.log(error);
      }
      else {
          res.send("Data inserted");
      }
  });
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
