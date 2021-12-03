const Modal = {
    // abrir modal e adicionar classe active
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
    },
    // fechar modal e remover classe active
    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

// array para guardar as transactions
const transactions = [{
        description: 'Luz',
        amount: -15000,
        date: '01/01/2021'
    },
    {
        description: 'Aluguel',
        amount: -120000,
        date: '01/01/2021'
    },{
        description: 'Salário',
        amount: 800000,
        date: '09/01/2021'
    }
]

// funcionalidades a partir do obj Transaction
const Transaction = {
    all: transactions,
    add(transaction){
        Transaction.all.push(transaction)
        App.reload()
    },
    remove(index){
        Transaction.all.splice(index, 1)
        App.reload()
    },
    // somar entradas
    incomes() {
        let income = 0
        Transaction.all.forEach((transaction) => {
           if (transaction.amount > 0 )
           income += transaction.amount
        })

        return income
    },

    // somar saídas
    expenses(){
        let expense = 0
        Transaction.all.forEach((transaction) => {
           if (transaction.amount < 0 )
           expense += transaction.amount
        })

        return expense

    },

    // balanço total
    total(){
        return Transaction.incomes() + Transaction.expenses()

    }
}

// obj com as funcionalidades para criação do hmtl de cada nova transação inserida pelo usuário
const DOM = {
    transactionsContainer: document.querySelector('#dataTable tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHtmlTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHtmlTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
                <td class="description">${transaction.description}</td>
                <td class= "${CSSclass}">${amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                    <img src="./assets/minus.svg" alt="Remover transação">
                </td>
        `
        return html
    },
    updateTotal(){
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },
    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    }
}

// funcionalidades úteis diversas
// obj com funcionalidade para formatar o valor para a moeda brasileira
const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : "" 

        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

const App = {
    init() {
        Transaction.all.forEach((transaction) => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateTotal()
    },
    reload(){
        DOM.clearTransactions()
        App.init()
    },
}

App.init()

Transaction.add({
    description: 'combustivel',
    amount: 5000,
    date: '20/10/2021'
})