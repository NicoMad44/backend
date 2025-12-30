const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const optimizeImage = require('../middleware/optimizeImage');

const bookCtrl = require('../controllers/book');

router.get('/', bookCtrl.getAllBooks);

router.get('/bestrating', bookCtrl.getBestBooks);

router.get('/:id', bookCtrl.getOneBook);

router.post('/:id/rating', auth, bookCtrl.rateBook);

router.post('/', auth, multer, optimizeImage, bookCtrl.createBook);

router.put('/:id', auth, multer, optimizeImage, bookCtrl.updateBook);

router.delete('/:id', auth, bookCtrl.deleteBook);


module.exports = router;