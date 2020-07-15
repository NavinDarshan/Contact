const express = require('express')
const note = require('../models/note')
const Router = express.Router();

Router.get("/:username" ,(req,res) =>{
    note.find({username : req.params.username} , (err , notes) =>{
        if(err){
            console.log(err)
        }else{
            res.json(notes)

            console.log(notes);
        }
    })
})

Router.get("/:id", (req, res) => {
    note.findById(req.params.id, (err, notes) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(notes);
        }
    })
})

Router.post("/", (req, res) => {

    const name = req.body.text;
    const number = req.body.number;
    const username = req.body.username;
    const email = req.body.email;
    const toShow = req.body.toShow;

    note.create({
        text: name,
        number:number,
        email : email,
        username: username,
        toShow : toShow
    }, (err, notes) => {
        console.log("its success")
        res.send("success")
    })
})
Router.delete("/", (req, res) => {
    note.findByIdAndDelete(req.body.id, (err, todo) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Deleted");
            res.json(todo);

        }
    })
})


module.exports = Router;
