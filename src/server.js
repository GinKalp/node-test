const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

// set engine, default directory /views
app.set('view engine', 'ejs')
app.set('views', 'src/views')

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

// static directory for css, img, js front files
const staticPath = path.join(__dirname, 'assets')
app.use(express.static(staticPath))

app.get('/', (req, res) => {
  res.send('Hello express');
});


app.all('*', (req, res) =>{
  res.status(404).send('Page not found')
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
