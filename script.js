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