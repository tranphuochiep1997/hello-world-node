var express = require('express');
var router = express.Router();

const { networkInterfaces } = require('os');
const nets = networkInterfaces();

/* GET home page. */
router.get('/', function(req, res, next) {
  const { name } = req.query;

  const results = [];
  for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
          // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
          if (net.family === 'IPv4' && !net.internal) {
              results.push(net.address);
          }
      }
  }
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log('Request to homepage: ' + clientIp);
  res.render('index', { title: 'Express', name, address: results });
});

module.exports = router;
