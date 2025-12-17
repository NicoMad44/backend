const { body, validationResult } = require('express-validator');

module.exports = {
  loginValidator : [
    body('email')
      .notEmpty().withMessage('Email requis') // note: le front devra etre adapter pour afficher les bons messages d'erreure
      .isEmail().withMessage('Format email invalide')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Mot de passe requis'),
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};

