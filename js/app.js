let amigos = [];
let sorteioRealizado = false;

function adicionar(){
    let nomeAmigo = document.getElementById('nome-amigo');
    let amigo = nomeAmigo.value.trim().toUpperCase();
    let lista = document.getElementById('lista-amigos');

    if(sorteioRealizado){
        alert('O sorteio já foi realizado por favor reinicie o sorteio.');
        return;
    }

    if(amigo == ''){
        alert('Por favor insira um nome!');
        return;
    } else{
        if(amigos.includes(amigo)){
            alert('Esse nome já está na lista!');
            nomeAmigo.value = '';
            return;
        } else{   
            amigos.push(amigo);
        } 
    }

    if(lista.textContent == ''){
        lista.textContent = amigo;
    } else{
        lista.textContent = lista.textContent + ', ' + amigo;
        }

    atualizarLista();
    atualizarSorteio();

    nomeAmigo.value = '';
    
}

function excluirAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

function atualizarSorteio() {
    let sorteio = document.getElementById('lista-sorteio');
    sorteio.innerHTML = '';
}


function atualizarLista() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';


    for (let i = 0; i < amigos.length; i++) {
        // Cria um elemento de parágrafo para cada amigo
        let paragrafo = document.createElement('p');
        paragrafo.textContent = amigos[i];
       
        // Adiciona um evento de clique para excluir o amigo
        paragrafo.addEventListener('click', function() {
            excluirAmigo(i);
        });

        // Adiciona o parágrafo à lista
        lista.appendChild(paragrafo);
    }
}

function embaralhar(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function sortear(){
    if(sorteioRealizado){
        alert('O sorteio já foi realizado por favor reinicie o sorteio.');
        return;
    }
    if(amigos.length < 3){
        alert('É necessário ter pelo menos três nomes para sortear.');
        return;
    }else{
        embaralhar(amigos);

        let sorteio = document.getElementById('lista-sorteio');
        for (let i = 0; i < amigos.length; i++) {
            if (i == amigos.length - 1) {
            sorteio.innerHTML = sorteio.innerHTML + amigos[i] +' tirou: ' +amigos[0] + '<br/>';
            } else {
            sorteio.innerHTML = sorteio.innerHTML + amigos[i] +' tirou: ' +amigos[i + 1] + '<br/>';
        }
    }
    document.getElementById('lista-amigos').innerHTML = '';
    sorteioRealizado = true;
    }
}

function reiniciar() {
    amigos = [];
    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';
    sorteioRealizado = false;
    document.getElementById('nome-amigo').value = '';
}

// Adiciona o evento de tecla no campo de texto para o Enter
document.getElementById('nome-amigo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {  // Verifica se a tecla pressionada foi "Enter"
        adicionar();
    }
});