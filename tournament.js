const mongoose = require('mongoose')
const Schema = mongoose.Schema

var tournament = new Schema({
    year: { type:Number, required:true },
    country: { type:String, required:true },
    city: { type:String, required:true },
    season: { type:String, required:true }
})

module.exports = tournament