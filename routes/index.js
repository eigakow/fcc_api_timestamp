var moment = require ('moment');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/:time', function(req, res) {
  var input = req.params.time;
  var unix = null;
  var nat = null;
  if (!isNaN(input)) {
    console.log("Epoch detected");
    var unix = input;
    var nat = epochToString(parseInt(input));
  }
  else if (moment(input).isValid()) {
    console.log("String detected");
    var unix = stringToEpoch(input);
    var nat = epochToString(stringToEpoch(input));
  }

  res.json({ "unix": unix, "natural": nat});
});

module.exports = router;


function epochToString(sec) {
  var d = moment.unix(sec);
  return d.format("MMMM D, YYYY");
}

function stringToEpoch(str) {
  var d = moment(str);
  return d.format("X");
}
