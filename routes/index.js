var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(process.cwd());
  res.sendFile(path.join(process.cwd(), 'views', 'index.html'));
});

module.exports = router;
