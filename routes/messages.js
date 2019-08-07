var express = require('express');
var router = express.Router();

// libs
const Messages = require('../src/lib/Messages');

router.get('/list', (req, res, next)=> {

    Messages.list('@Room:3tqR0siOD', messages => {
        res.json(messages);
    });
});

module.exports = router;
