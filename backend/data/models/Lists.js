const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Listschema = new Schema({
    title: {
        type: String,
        required: true
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Cards'
    }]
});

const ListsModel = mongoose.model('Lists', Listschema);

module.exports = ListsModel;
