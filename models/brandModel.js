const mongoose = require('mongoose');
const schema = mongoose.Schema;

const brandSchema = new schema({

    brand: {
        type: String,
        required: true,
        unique: true
    },
    sheet: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
)

const brandModel = mongoose.model('BrandData', brandSchema);
module.exports = brandModel;