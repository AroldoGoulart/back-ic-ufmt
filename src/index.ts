import express from 'express'

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/karla', function(req,res) {
    res.send('Aoba!')
})
app.get('/salas', function(req,res) {
    res.send('Sala1, sala2, cb-04')
})

app.listen(3000)