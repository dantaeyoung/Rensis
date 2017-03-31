var http = require('http');
var express = require('express');
var app = express();

(function() {

  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));

})();

////////////////////////////////
///////// ROUTES HERE //////////
////////////////////////////////


app.get('/', function(req, res){
    res.sendFile(__dirname + '/site/index.html');
});



if (require.main === module) {
  var server = http.createServer(app);

  server.listen(process.env.PORT || 8082, function() {
    console.log("Listening on %j", server.address());
  });


}


///////// express server 



