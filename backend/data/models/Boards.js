const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Boardschema = new Schema({
    name: {
        type: String,
        required: true
    },
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'Lists'
    }]
});

const BoardsModel = mongoose.model('Boards', Boardschema);

module.exports = BoardsModel;
