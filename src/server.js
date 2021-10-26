const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

const authRouter = require('./routes/authRouter')
const accountsRouter = require('./routes/accountsRouter')
const billsRouter = require('./routes/billsRouter')


// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter)
app.use('/accounts', accountsRouter)
app.use('/bills', billsRouter)

app.get('/', (req, res) => {
  res.send('Hello express');
});


app.all('*', (req, res) =>{
  res.status(404).send('Page not found')
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
