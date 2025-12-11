const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(()=> res.status(201).json({message: 'new user created'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then( user =>{ 
        if (user === null){
            res.status(401).json({message: 'email or password incorect'});
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid =>{
                if(!valid){
                    res.status(401).json({message: 'email or password incorect'});
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_KEY',
                            {expiresIn: '24h'}
                        )
                    });
                }
            })
            .catch(error => res.status(500).json({error})); // again error de traitement pas de validation de mot de pass
        }
    })
    .catch(error => res.status(500).json({error})); //retourn error serveur (pas erreur lie a la recherche)
};