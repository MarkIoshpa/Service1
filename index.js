const express = require('express')
const ctrl = require('./controller')
const app = express();
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//return json object containing all athlete data
app.get('/getAllAthletes', (req, res) => 
    ctrl.getAllAthletes()
        .then((val) => {
            if(!(val.length == 0) && !(val === undefined)) res.json(val)
            else res.status(404).send('Not found')
        })
        .catch((err) => {
            console.log('Error occured:', err.message)
            res.status(500).send(err.message)
        })
 )

 //return json object contain all athletes matching specified tournament year and sport
 app.get('/getAthletesBySportYear/:sport/:year', (req, res) => 
    ctrl.getAthletesBySportYear(req.params.sport, req.params.year)
        .then((val) => {
            if(!(val.length == 0) && !(val === undefined)) res.json(val)
            else res.status(404).send('Not found')
        })
        .catch((err) => {
            console.log('Error occured:', err.message)
            res.status(500).send(err.message)
        })
 )

 //update athlete by adding new tournament, recieves the following tournament fields: year, country, city, season
 app.post('/setNewTournament/:id', (req,res) => {
    const tournament = {year = null, country = null, city = null, season = null} = req.body

    ctrl.setNewTournament(req.params.id, tournament)
        .then((val) => {
            if(!(val.length == 0) && !(val === undefined)) res.json(val)
            else res.status(404).send('Not found')
        })
        .catch((err) => {
            console.log('Error occured:', err.message)
            res.status(500).send(err.message)
        })
})

//global route handler
app.all('*', (req, res) => {
    res.status(404).send('Route does not exist')
})

//start server
app.listen(port,() => console.log('Server listening on port', port))