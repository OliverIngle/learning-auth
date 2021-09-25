const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({route: "index"});
})

module.exports = router;