const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI
    if (!uri) throw new Error('MONGO_URI not defined in environment')

    await mongoose.connect(uri)
    console.log('MongoDB conectado com sucesso')
  } catch (err) {
    console.error('Erro de conexão com o MongoDB:', err.message)
    process.exit(1) // sair do processo com falha
  }
}

module.exports = connectDB
