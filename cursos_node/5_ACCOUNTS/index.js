// ============================================================
// PROJETO: SISTEMA DE CONTAS BANCÁRIAS
// ============================================================
// Este programa cria um sistema simples de gerenciamento de contas
// Com funcionalidades de criar conta, depositar, sacar e consultar saldo
// Utiliza inquirer para interface interativa e fs para persistir dados em JSON

const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

// Início do programa
operation()

// Função principal que exibe o menu de opções
  // inquirer.prompt() cria um menu de seleção
  // O usuário escolhe uma ação da lista
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Sair',
        ],
      },
    ])
    .then((answer) => {
      const action = answer['action']

      if (action === 'Criar conta') {
        createAccount()
      } else if (action === 'Depositar') {
        deposit()
      } else if (action === 'Consultar Saldo') {
        getAccountBalance()
      } else if (action === 'Sacar') {
        withdraw()
      } else if (action === 'Sair') {
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
        process.exit()
      }
    })
}

// ============================================================
// FUNÇÃO: CRIAR NOVA CONTA
// ============================================================
// Cria uma nova conta bancária com saldo inicial de 0
// A conta é armazenada em um arquivo JSON no diretório 'accounts'
  console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
  console.log(chalk.green('Defina as opções da sua conta a seguir'))

  buildAccount()
}

// ============================================================
// FUNÇÃO: CONSTRUIR/SALVAR CONTA
// ============================================================
// Pede o nome da conta e salva um arquivo JSON com os dados
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para a sua conta:',
      },
    ])
    .then((answer) => {
      console.info(answer['accountName'])

      const accountName = answer['accountName']

      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts')
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black('Esta conta já existe, escolha outro nome!'),
        )
        buildAccount(accountName)
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance":0}',
        function (err) {
          console.log(err)
        },
      )

      console.log(chalk.green('Parabéns, sua conta foi criada!'))
      operation()
    })
}

// ============================================================
// FUNÇÃO: DEPOSITAR DINHEIRO
// ============================================================
// Permite ao usuário depositar um valor em sua conta
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName']

      if (!checkAccount(accountName)) {
        return deposit()
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja depositar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount']

          addAmount(accountName, amount)
          operation()
        })
    })
}

// ============================================================
// FUNÇÃO: VERIFICAR EXISTÈNCIA DE CONTA
// ============================================================
// Verifica se um arquivo de conta existe no sistema de arquivos
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
    return false
  }
  return true
}

// ============================================================
// FUNÇÃO: OBTER DADOS DA CONTA
// ============================================================
// Lê o arquivo JSON da conta e retorna o objeto com os dados
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r',
  })

  return JSON.parse(accountJSON)
}

// ============================================================
// FUNÇÃO: ADICIONAR VALOR À CONTA
// ============================================================
// Soma um valor ao saldo da conta e salva a alteração no arquivo JSON
  const accountData = getAccount(accountName)

  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'),
    )
    return deposit()
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err)
    },
  )

  console.log(
    chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`),
  )
}

// ============================================================
// FUNÇÃO: CONSULTAR SALDO
// ============================================================
// Exibe o saldo atual da conta do usuário
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName']

      if (!checkAccount(accountName)) {
        return getAccountBalance()
      }

      const accountData = getAccount(accountName)

      console.log(
        chalk.bgBlue.black(
          `Olá, o saldo da sua conta é de R$${accountData.balance}`,
        ),
      )
      operation()
    })
}

// ============================================================
// FUNÇÃO: SACAR DINHEIRO
// ============================================================
// Permite ao usuário sacar dinheiro de sua conta
// Com verificação de saldo suficiente
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName']

      if (!checkAccount(accountName)) {
        return withdraw()
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja sacar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount']

          removeAmount(accountName, amount)
          operation()
        })
    })
}

// ============================================================
// FUNÇÃO: REMOVER VALOR DA CONTA
// ============================================================
// Subtrai um valor do saldo da conta
// Verifica se há saldo suficiente antes de realizar o saque
  const accountData = getAccount(accountName)

  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'),
    )
    return withdraw()
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black('Valor indisponível!'))
    return withdraw()
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err)
    },
  )

  console.log(
    chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`),
  )
}
