
var app = require('./app');


app.init().then(function () {
  app.start();
}, function (err) {
  app.log.error(err.message);
  app.log.fatal('Not initialized, exiting');
});