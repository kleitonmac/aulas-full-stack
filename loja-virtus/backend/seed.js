const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./src/models/User')

// Conectar ao MongoDB
mongoose
  .connect('mongodb://localhost:27017/loja-virtus')
  .then(async () => {
    console.log('MongoDB conectado para seed')

    // Limpar usuários existentes
    await User.deleteMany({})

    // Criar admin padrão
    const salt = await bcrypt.genSalt(10)
    const adminPassword = await bcrypt.hash('admin123', salt)

    const admin = new User({
      name: 'Administrador',
      email: 'admin@lojavirtus.com',
      password: adminPassword,
      isAdmin: true,
    })

    await admin.save()
    console.log('✅ Admin criado: admin@lojavirtus.com / admin123')

    // Criar usuário de teste
    const userPassword = await bcrypt.hash('user123', salt)
    const user = new User({
      name: 'Usuário Teste',
      email: 'user@example.com',
      password: userPassword,
      isAdmin: false,
    })

    await user.save()
    console.log('✅ Usuário teste criado: user@example.com / user123')

    console.log('\n📊 Banco de dados inicializado com sucesso!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar:', err)
    process.exit(1)
  })
