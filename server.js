const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var profile = require('./profile')
const app = express();
const PORT = process.env.PORT||5000;
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//const bootstrap = require('bootstrap');
//const jquery = require('jquery');
//env file to mask the api key. do npm install dotenv.


app.use('./profile', profile)
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/views'));

app.set('views', './views');


app.set('view engine', 'ejs');
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/thanks', (req, res) => {
  const msg = {
    to: 'vigne6@gmail.com',
    from: 'test@example.com',
    subject: 'Unknown',
    text: 'Message goes here',
    html: '<strong>Testing Here</strong>',
  };
  sgMail.send(msg);
  res.render('thanks', { contact: req.body })
});

app.get('/', (req, res) => {
  const data = {
    person: {
      firstName: 'Eric',
      lastName: 'Taylor',
    }
  }
  res.render('index', data);
});

app.listen(5000, () => {
  console.log('Listening at http://localhoast:5000');
});
