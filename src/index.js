const express = require('express')
const morgan = require('morgan')
const { engine, create } = require('express-handlebars')
const { log } = require('console')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
const path = require('path')
const app = express()
const port = 3000;
const route = require('./routes/index')

const db = require('./config/db')
db.connect();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//use cookie Parser 
app.use(cookieParser());

//HTTP logger
app.use(morgan('combined'))  

app.use(express.static(path.join(__dirname, 'public')));

//app paremethod use req.body
app.use(express.urlencoded());
app.use(express.json());

//Template engine
app.engine(
  '.hbs',
  engine({
      extname: '.hbs',
      helpers: {
          sum: (a, b) => {
              return a + b;
          },
          percent: (a, b) => {
              return Math.round(((a - b) / a) * 100);
          },
          getUserNameComment: (userId, users)=>{
              var result
              for (var user in users) {
                  if(userId.includes(user._id)){
                      result = user.name;
                  }
              }
              // var result = users.find(function(user){
              //     var a = userId.includes(user._id)
              //     return a.name
              // });
              return result;
          },
          multi: (a, b)=>{
              return a*b;
          },
          json: a => {
              return JSON.stringify(a);
          },
          compare: (a, b)=>{
              if(a > b) return true;
              return false;
          }
      },
  }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));


//Route init
route(app)

app.listen(port, () => {
  console.log(`App listening at  http://localhost:${port}`);
});