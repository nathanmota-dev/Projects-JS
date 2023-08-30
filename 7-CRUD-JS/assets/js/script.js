const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');

let itens;
let id;

//ligar os itens no banco
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

//funcao para executar assim que a tela for carregada pegando os itens do banco
function loadItens() {
    itens = getItensBD();
    tbody.innerHTML = ''; //limpa a tabela antes de inserir novos itens
    itens.forEach((item, index) => {
        insertItem(item, index)
    });
}

loadItens();

//incluindo cada item
function insertItem(item, index) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.funcao}</td>
        <td>${item.salario}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button> 
        </td>
        <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>        
        </td>
    `;
    tbody.appendChild(tr);
}

function editItem(index) {
    openModal(true, index); //para editar precisa abrir a modal
}

function deleteItem(index) {
    itens.splice(index, 1); //remove o item passando seu index como parametro   
    setItensBD(); //atualiza o banco
    loadItens(); //carrega novamente os dados
}

function openModal(edit = false, index = 0) { //quando for criado um novo item não será passado por parametro
    // e por isso os parametros estão opcionais
    modal.classList.add('active'); //exibe a modal

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active'); //cada click fora da modal faz ela fechar removendo a classe
        }
    }

    if (edit) { //quando for editar carrega os antigos valores
        sNome.value = itens[index].nome;
        sFuncao.value = itens[index].funcao;
        sSalario.value = itens[index].salario;

        id = index;
    } else {
        sNome.value = '';
        sFuncao.value = '';
        sSalario.value = '';
    }
}

btnSalvar.onclick = e => {
    if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
        return;
    }

    e.preventDefault();

    //id != indefined == veio de um edit
    if (id != undefined) { //atualiza valores
        itens[id].nome = sNome.value;
        itens[id].funcao = sFuncao.value;
        itens[id].salario = sSalario.value;
    } else {
        itens.push({ 'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value })
    }

    setItensBD(); //atualiza o bd

    modal.classList.remove('active'); //fecha a modal
    loadItens();
    id = undefined;
}