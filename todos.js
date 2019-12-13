// para tratar os elementos do HTML como variáveis
var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

// tenta carregar a lista armazenada no storage do navegador
// caso não tenha lista no storage, atribui um array vazio
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
    // remove o que já existia
    listElement.innerHTML = '';
    
    // percorre array do storage para montar a lista
    for(todo of todos) {
        // cria um li e atribui seu nome (de acordo com o array)
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        // cria um a e atribui href = #
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');

        // pega o index desse elemento no array
        var index = todos.indexOf(todo);
        // no a, ao clicar no link, chama a função que deleta o li na posição index
        linkElement.setAttribute('onclick','deleteTodo(' + index + ')');

        // atribui título 'Excluir' ao a
        var linkText = document.createTextNode('Excluir');

        linkElement.appendChild(linkText);
        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
        
    }
}

// primeira tarefa ao carregar a página: renderizar a lista
renderTodos();

function addTodo() {
    // pega o que foi digitado pelo user
    var todoText = inputElement.value;
    // adiciona o que foi digitado como último elemento da lista
    todos.push(todoText);
    // limpa o campo de digitação do user
    inputElement.value = '';
    // renderiza a lista novamente (para aparecer o que foi adicionado)
    renderTodos();
    // salva no storage a lista atual
    savetoStorage();

}

// ao clicar no botão 'Adicionar', chama função addTodo
buttonElement.onclick = addTodo;

function deleteTodo(pos) {
    // delete o elemento de index 'pos' da lista
    todos.splice(pos, 1);
    // renderiza a lista novamente (para aparecer o que foi removido)
    renderTodos();
    // salva no storage a lista atual
    savetoStorage();

}

function savetoStorage() {
    // o 'banco de dados' do Storage nada mais é do que um JSON
    // logo, é necessário converter a lista em string para armazenar
    localStorage.setItem('list_todos', JSON.stringify(todos));

}