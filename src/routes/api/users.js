const express = require('express')
const router = express.Router()
const passport = require("passport")

router.post('/login', passport.authenticate('signin'), (req, res) => {
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" });
});

module.exports = router
