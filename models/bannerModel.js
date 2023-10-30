const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bannerSchema = new schema({

    banner: {
        type: String,
        required: true,
        unique: true
    },
    Image: {
        type: String,
        required: true,
    },
}, 
    { timestamps: true }
)

const bannerModel = mongoose.model('BannerData', bannerSchema);
module.exports = bannerModel;