const Book = require('../models/Book');
const fs = require('fs');

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    delete bookObject.averageRating; // a zero pour le premier livres - Initialise la note moyenne du livre à 0
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        averageRating: 0,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    book.save()
    .then(() => { res.status(201).json({message: 'book enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
}

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => {res.status(200).json(books)})
        .catch(error => res.status(400).json({ error }));
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
}

exports.getBestBooks = (req, res, next) => {
    Book.find({})
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books)=> {res.status(200).json(books);
    })
    .catch(error => res.status(500).json({ error }));
}

exports.updateBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message : 'unauthorized request x'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

exports.deleteBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
    .then(book => {
        if (book.userId != req.auth.userId){
            res.status(401).json({message: 'Non authorised'})
        } else {
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Book.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            });
        }
    })
    .catch(error => res.status(500).json({error}))
}

exports.rateBook = async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
  
      const alreadyRated = book.ratings.some(
        (r) => r.userId.toString() === req.auth.userId
      );
      if (alreadyRated) {
        return res.status(400).json({ message: 'Livre déjà noté par cet utilisateur' });
      }
  
      // add the new rating
      book.ratings.push({ userId: req.auth.userId, grade: req.body.rating });
  
      // average calculation
      const grades = book.ratings.map((r) => r.grade);
      const average =
        grades.length > 0
          ? grades.reduce((a, b) => a + b, 0) / grades.length
          : 0;
  
      // conversion in number of a rounded average
      book.averageRating = Math.round(average * 10) / 10;
  
      const updatedBook = await book.save();
      return res.status(200).json(updatedBook);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };