/**
 * API REST COM MONGOOSE E MONGODB
 * ================================
 * Exemplo completo de uma API REST que implementa CRUD (Create, Read, Update, Delete)
 * Usa Mongoose como ODM para trabalhar com MongoDB
 * Demonstra endpoints POST, GET, GET by ID com tratamento de erros
 */

// Configuração inicial - Framework Express
const express = require('express')
const app = express()

// Importa Mongoose para conectar com MongoDB
const mongoose = require('mongoose')

// Importa o modelo Person (estrutura de dados)
const Person = require('./models/Person')

// Middleware para processar dados de formulário
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Middleware para processar requisições JSON
app.use(express.json())

// ===== ENDPOINTS DA API =====

// POST /person - Criar uma nova pessoa
app.post('/person', async (req, res) => {
  // Extrai os dados do corpo da requisição
  const { name, salary, approved } = req.body

  // Cria um objeto com os dados
  const person = {
    name,
    salary,
    approved,
  }

  try {
    // Salva a pessoa no banco de dados
    await Person.create(person)

    // Retorna status 201 (criado) com mensagem de sucesso
    res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
  } catch (error) {
    // Se houver erro, retorna status 500 com os detalhes do erro
    res.status(500).json({ erro: error })
  }
})

// GET /person - Obter todas as pessoas
app.get('/person', async (req, res) => {
  try {
    // Busca todas as pessoas cadastradas
    const people = await Person.find()

    // Retorna status 200 (ok) com a lista de pessoas
    res.status(200).json(people)
  } catch (error) {
    // Se houver erro, retorna status 500
    res.status(500).json({ erro: error })
  }
})

// GET /person/:id - Obter pessoa por ID
app.get('/person/:id', async (req, res) => {
  const id = req.params.id

  try {
    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.patch('/person/:id', async (req, res) => {
  const id = req.params.id

  const { name, salary, approved } = req.body

  const person = {
    name,
    salary,
    approved,
  }

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person)

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.delete('/person/:id', async (req, res) => {
  const id = req.params.id

  const person = await Person.findOne({ _id: id })

  if (!person) {
    res.status(422).json({ message: 'Usuário não encontrado!' })
    return
  }

  try {
    await Person.deleteOne({ _id: id })

    res.status(200).json({ message: 'Usuário removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

mongoose
  .connect(
    'mongodb+srv://user:password@restfulapibanco.lq7ds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))
