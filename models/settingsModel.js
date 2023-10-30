const mongoose = require('mongoose');
const schema = mongoose.Schema;

const settingsSchema = new schema({

    processDays: {
        type: Number,
    },
}
)

const settingsModel = mongoose.model('Settings', settingsSchema);
module.exports = settingsModel;