const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cardschema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const CardsModel = mongoose.model('Cards', Cardschema);

module.exports = CardsModel;
