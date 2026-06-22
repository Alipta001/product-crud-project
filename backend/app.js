require('dotenv').config()
const express = require('express');
const ejs = require('ejs')
const app = express()
const path = require('path');

//cors
const cors = require('cors');
app.use(
  cors({
    origin: 'http://localhost:4000',
    credentials: true,
  })
);



app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//database connection
const connectDB = require('./app/config/db');
connectDB();

//setup ejs
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'app', 'views'));
//1st views is mvc views locate
//2nd is the directory


//static folder
// static folder
app.use(express.static("public"));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


//Routes
const productRoutes = require('./app/routes/productRoutes');
app.use('/products', productRoutes)
const homeRoutes = require('./app/routes/homeRoutes')
app.use('/',homeRoutes)
const authRoutes = require('./app/routes/authRoutes');
app.use('/auth', authRoutes)




const PORT = process.env.PORT || 4000
 
//server
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server running on', `http://localhost:${PORT}`);
  }
});

