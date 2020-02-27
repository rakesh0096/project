const bodyParser = require('body-parser');
const routes = require('./routes/index')

module.exports = (app) => {


    app.use(bodyParser.text())

    app.use('/api',routes);

    //invalid url
    app.all('*', function(req, res) {
        res.send("invalid url " + String(req.url));
      });

}