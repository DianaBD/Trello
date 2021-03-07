const express = require('express');
const cors = require('cors');

const routes = require('./routes.js');

const app = express()

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.trace(err);
  let status = 500;
  let message = 'Something Bad Happened';
  if (err.httpStatus) {
      status = err.httpStatus;
      message = err.message;
  }
  res.status(status).json({error: message});
})

app.listen(process.env.PORT, () => {
  console.log(`App is listening on ${process.env.PORT}`)
})
