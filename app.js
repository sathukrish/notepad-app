const express = require('express');
const mongoose = require('mongoose');

const app = express ();
const Note = require('./models/note');
const notesRouter = require('./routes/notes');
require('dotenv').config();

//app.get('/', (req, res) => {
//   res.send(`Yayyy! It's working`);
//});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const notes = await Note.find().sort('-createdAt');
    res.render('index', { notes: notes });
  });

mongoose.connect('mongodb://localhost/notes', {
useNewUrlParser: true,
useUnifiedTopology: true,
});

app.use('/', notesRouter);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Has Started`);
});