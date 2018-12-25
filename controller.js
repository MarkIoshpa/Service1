const mongoose = require('mongoose')
const consts = require('./consts')
const Athlete = require('./athlete')

const {MLAB_URL, DB_USER,  DB_PASS} = consts
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    user: DB_USER,
    pass: DB_PASS
}

//function returns all athelete data from database
module.exports.getAllAthletes = function getAllAthletes() {
    return new Promise( (resolve, reject) => {
        mongoose
            .connect(MLAB_URL, options)
            .then(() => {
                Athlete.find({}, {'_id':0, 'tournaments._id': 0},
                    (err, result) => {
                        if(err) reject(err)
                        mongoose.disconnect()
                        resolve(result)
                    }
                )
            })
            .catch(err => reject(err))
    })
}

//function finds and returns atheletes by given sport and year
module.exports.getAthletesBySportYear = function getAllAthletesBySportYear(sport, year) {
    return new Promise( (resolve, reject) => {
        mongoose
            .connect(MLAB_URL, options)
            .then(() => {
                Athlete.find({'tournaments.year': {$eq: year}, 'tournaments.sport': {$eq: sport}}, {'_id':0, 'tournaments._id': 0},
                    (err, result) => {
                        if(err) reject(err)
                        mongoose.disconnect()
                        resolve(result)
                    }
                )
            })
            .catch(err => reject(err))
    })
}

//function updates athlete with given id using the fields 'year, country, city, season, sport' in body parameter
module.exports.setNewTournament = function setNewTournament(id, body) {
    return new Promise( (resolve, reject) => {
        mongoose
            .connect(MLAB_URL, options)
            .then(() => {
                Athlete.updateOne({'id': {$eq: id}}, {$push: {tournaments: body}},
                    (err, result) => {
                        if(err) reject(err)
                        mongoose.disconnect()
                        resolve(result)
                    }
                )
            })
            .catch(err => reject(err))
    })
}


