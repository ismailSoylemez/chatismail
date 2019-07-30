const express = require('express');
const router = express.Router();
const passportGoogle = require('../auth/google');

//butona basıldığı anda çalışacak kısım
router.get('/google',
    passportGoogle.authenticate(
        'google',
        {
            scope: ['profile'] //google da kayıt olan kişilerden hangi bilgileri isteyeceksin
        }
));
//google dan dönen cevap
router.get('/google/callback',
    passportGoogle.authenticate(
        'google',
        {
            failureRedirect: '/'
        }),
        (req,res) => {
            res.redirect('/chat'); //login başarılıysa
        });

module.exports =  router;