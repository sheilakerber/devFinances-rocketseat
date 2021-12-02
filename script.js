const Modal = {
    // abrir modal e adicionar classe active
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
        alert("open")
    },
    // fechar modal e remover classe active
    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
        alert("close")
    }
}

// array para guardar as transactions
const transactions = [{
        id: 1,
        description: 'Luz',
        amount: -15000,
        date: '01/01/2021'
    },
    {
        id: 2,
        description: 'Aluguel',
        amount: -120000,
        date: '01/01/2021'
    },{
        id: 3,
        description: 'Itens domésticos',
        amount: 8000,
        date: '09/01/2021'
    }
]

// obj com as funcionalidades para criação do hmtl de cada nova transação inserida pelo usuário
const DOM = {
    transactionsContainer: document.querySelector('#dataTable tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHtmlTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHtmlTransaction(transaction){
        const html = `
                <td class="description">${transaction.description}</td>
                <td class="expense">${transaction.amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                    <img src="./assets/minus.svg" alt="Remover transação">
                </td>
        `
        return html
    }
}

transactions.forEach((transaction) => {
    DOM.addTransaction(transaction)
})