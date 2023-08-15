const express = require('express');
const router = express.Router();

router.get('/signout', async (req, res) => {
    res.render('signin', {
        status: 'signout'
    })
});

module.exports = router;