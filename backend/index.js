const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
require('dotenv').config()

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.send('Hello World!')
})

// Configuração do middleware Body Parser
app.use(bodyParser.json())

// Inicialização do servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

// Conexão com o banco de dados
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    dbName: 'ShopNotify',
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conectado ao MongoDB!')
  })
  .catch(error => {
    console.error('Erro ao conectar ao MongoDB', error)
  })

// routes
app.use('/api', routes)
