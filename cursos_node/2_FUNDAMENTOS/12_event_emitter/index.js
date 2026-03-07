// Usar o módulo 'EventEmitter' para trabalhar com eventos no Node.js

// Importar o módulo 'events' do Node.js
const EventEmitter = require('events')

// Criar uma nova instãncia de EventEmitter
const eventEmitter = new EventEmitter()

// Registrar um 'listener' (ouvinte) para o evento 'start'
// Quando esse evento for emitido, a função callback será executada
eventEmitter.on('start', () => {
  console.log('Durante')
})

// Imprimir "Antes"
console.log('Antes')

// Emitir o evento 'start', que dispara o listener registrado acima
eventEmitter.emit('start')

// Imprimir "Depois"
console.log('Depois')
