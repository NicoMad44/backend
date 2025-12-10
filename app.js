const express = require('express');

const app = express();

app.use(express.json());

const mongoose = require('mongoose');

const path = require('path');

const bookRoutes = require('./routes/book');

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://nicolasmadier_db_user:RFkYOlKZJdDbFufS@cluster0.ufu3rkl.mongodb.net/?appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

/* app.use((req, res, next) => {
    const exempleBooks =
        {
            title: "toto",
            Author: "tata",
            imageUrl: 'test.jpg',
            year: 2024,
            genre: "cool",
            ratings : [{userID : "titi", grade : 3}],
            averageRating: 3,
        }
    ;

    const book = new Book(exempleBooks);

    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !'}))
        .catch(error => res.status(400).json({ error }));

    next();
}); */

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


/* app.get('/api/books', (req, res, next) => {
    Book.find()
        .then((books) => {res.status(200).json(books);
            console.log(books)
        })
        .catch(error => res.status(400).json({ error }));
 });

 app.get('/api/books/:id', (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
})
 */
/* app.get('/api/books/bestrating', (req, res, next) =>{

}) */

/* app.post('/api/books', (req, res, next) => {
delete req.body._id;
const book = new Book({
    ...req.body
});
book.save()
    .then(() => res.status(201).json({ message: 'Livre enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/books/:id', (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });


app.delete('/api/books/:id', (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Livre supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }); */


module.exports = app;