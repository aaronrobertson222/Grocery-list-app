const mongoose = require('mongoose');
const moment = require('moment');

mongoose.Promise = global.Promise;

const ListSchema = new mongoose.Schema({
    listName: {
        type: String,
        required: true
    },
    listOwner: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    },
    items: {
        type: Array
    },
    listUsers: {
        type: Array
    }
});

ListSchema.methods.apiRepr = function () {
    return {
        id: this._id,
        listName: this.listName,
        items: this.items,
        listOwner: this.listOwner,
        dateCreated: moment(this.dateCreated).format('MMM DD, YYYY')
    };
};

const List = mongoose.model('List', ListSchema);

module.exports = { List };
