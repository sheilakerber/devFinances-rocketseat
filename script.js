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

// funcionalidades a partir do obj Transaction
const Transaction = {
    // array para guardar as transactions
    all: [{
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
    ],
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
        tr.innerHTML = DOM.innerHtmlTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHtmlTransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
                <td class="description">${transaction.description}</td>
                <td class= "${CSSclass}">${amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                    <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
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
    }, 
    formatValues(value){
        value = Number(value) * 100  // para garantir que fique no padrao necessario para a formatacao do currency
        return value 
    },
    formatDate(date){
    const splittedDate = date.split("-")  //ano mes dia
       return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    }
}

const Form = {


    // pegando os dados html do form
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    // pegando os valores do html
    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    // verificar se todas as infos foram preenchidas
    validateFields(){
        const { description, amount, date } = Form.getValues()
        
        if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
            throw new Error("Por favor, preencha todos os campos.")
        }
    },

    // formatar os dados para salvar
    formatValues(){
        let { description, amount, date } = Form.getValues()
        amount = Utils.formatValues(amount)
        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    // apagar os dados do form
    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },


    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()                       // validar
            const transaction = Form.formatValues()     // formatar
            Transaction.add(transaction)                // salvar
            Form.clearFields()                          // apagar dados form
            Modal.close()                               // fechar modal
        
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {
        Transaction.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index)
        })
        
        DOM.updateTotal()
    },
    reload(){
        DOM.clearTransactions()
        App.init()
    },
}

App.init()

// Transaction.add({
//     description: 'combustivel',
//     amount: 5000,
//     date: '20/10/2021'
// })k