import express from 'express';
const app = express()
import hbs from 'hbs';
import * as url from 'url';
import * as dotenv from 'dotenv'
dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const port = process.env.PORT;


// handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// servir contenido estático (middleware)
app.use(express.static('public'));


// Controlador
app.get('/', (req, res) => {
  res.render('home', {
    nombre: 'Taco',
    titulo: 'Curso de Node'
  });
})

app.get('/generic', (req, res) => {
  res.render('generic', {
    nombre: 'Taco',
    titulo: 'Curso de Node'
  });
})

app.get('/elements', (req, res) => {
  res.render('elements', {
    nombre: 'Taco',
    titulo: 'Curso de Node'
  });
})

// app.get('/generic', (req, res) => {
//   res.sendFile( __dirname + '/public/generic.html')
// })

// app.get('/elements', (req, res) => {
//   res.sendFile( __dirname + '/public/elements.html')
// })

// app.get('*', (req, res) => {
//   res.sendFile( __dirname + '/public/404.html')
// })



app.listen( port, () => {
  console.log(`Listening at http://localhost:${port}`)
});