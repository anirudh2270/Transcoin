const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const db = require('./db.js');
const Auth = require('./routes/auth_routes.js');
const binance = require('./routes/binance_api.js');
const verifyToken = require('./middlewares/Verify_jwt.js');

// CONFIGS
app.use(express.static('Public'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// ROUTES
app.use('/dashboard', verifyToken, (req, res) => {
  res.send({ ok: 'ok' });
});

app.get('/sidebar', async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM sidebar ORDER BY id ASC');
    res.send(data.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong...please try again later!' });
  }
});

app.use('/auth', Auth);

app.use('/binance', binance);

const port = 3000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
