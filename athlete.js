const mongoose = require('mongoose')
const tournament = require('./tournament.js')
const Schema = mongoose.Schema

var athlete = new Schema({
    id: { type: Number, required:true, index: 1 },
    name: { type:String, required:true },
    sport: { type:String, required:true },
    birthdate: { type:Date, required: true },
    gender: { type:String, required: true },
    tournaments: [tournament]
})

module.exports = mongoose.model('Athlete', athlete)