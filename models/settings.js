var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/** Sites Schema
 */
var settingsSchema = new Schema({
    IpAddress: String
});
mongoose.model('Setting', settingsSchema);