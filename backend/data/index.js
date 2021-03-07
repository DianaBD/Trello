const mongoose = require('mongoose');
mongoose.set('returnOriginal', false);
mongoose.set('useFindAndModify', false);

(async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${process.env.MPORT}/${process.env.MDATABASE}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  } catch(e) {
    console.trace(e);
  }
})();

const Boards = require('./models/Boards.js');
const Lists = require('./models/Lists.js');
const Cards = require('./models/Cards.js');

module.exports = {
  Boards,
  Lists,
  Cards
}
