const mongoose = require('mongoose');
const moment = require('moment');

mongoose.Promise = global.Promise;

const ListSchema = new mongoose.Schema({
    listName: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    }
});

ListSchema.methods.apiRepr = () => (
    {
        id: this._id,
        listName: this.listName,
        dateCreated: moment(this.dateCreated).formate('MMM DD, YYYY')
    }
);

const List = mongoose.model('List', ListSchema);

module.exports = { List };
