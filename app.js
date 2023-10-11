require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');


const app = express();

const port = 5000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 


//static file
app.use(express.static('public'));

// template engine
app.use(expressLayouts);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
});

app.listen(port, () => {
    console.log(`app running on port ${port}`)
});