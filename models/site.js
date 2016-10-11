var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

/** Sites Schema
 */
var sitesSchema = new Schema({
    gitRepo: String,
    domainName: String,
    envPort: String,
    startScript: String

});
sitesSchema.plugin(URLSlugs('domainName'));
mongoose.model('Site', sitesSchema);