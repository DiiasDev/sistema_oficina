// BUSCAR CLIENTES 

// No arquivo "index.js" ou em um script separado referenciado no HTML

// Código JavaScript
async function carregarClientes() {
  try {
    const response = await fetch('/Clientes'); // Requisição para a rota '/clientes' no servidor
    const clientes = await response.json(); // Converte a resposta para JSON

    const selectClientes = document.getElementById('cliente'); // Elemento select pelo ID
    const inputTelefone = document.getElementById('telefone'); // Elemento de telefone

    // Limpa as opções atuais do select
    selectClientes.innerHTML = '';

    // Preenche as opções do select com os clientes obtidos do servidor
    clientes.forEach(cliente => {
      const option = document.createElement('option');
      option.value = `${cliente.primeiro_nome} ${cliente.segundo_nome}`; // Nome e segundo nome como valor da opção
      option.textContent = `${cliente.primeiro_nome} ${cliente.segundo_nome}`; // Nome exibido na opção
      selectClientes.appendChild(option);
    });

    // Adiciona um evento de escuta para o evento 'change' no campo de seleção de clientes
    selectClientes.addEventListener('change', function(event) {
      const clienteSelecionadoNome = event.target.value; // Nome do cliente selecionado

      // Encontra o cliente selecionado nos dados carregados
      const clienteSelecionado = clientes.find(cliente =>
        `${cliente.primeiro_nome} ${cliente.segundo_nome}` === clienteSelecionadoNome
      );

      // Preenche o campo de telefone com o telefone do cliente selecionado
      inputTelefone.value = clienteSelecionado ? clienteSelecionado.celular : ''; // Use o nome correto do campo de telefone retornado pelo servidor
    });
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
}

// Chama a função para carregar os clientes quando o formulário for carregado ou quando necessário
document.addEventListener('DOMContentLoaded', carregarClientes);


//BUSCAR CARROS: 

async function carregarCarros() {
  try {
    const response = await fetch('/carros'); // Requisição para obter os carros do servidor
    const carros = await response.json(); // Convertendo a resposta para JSON

    const selectCarros = document.getElementById('carro'); // Elemento select de carros
    const inputMarca = document.getElementById('Marca'); // Elemento input de marca
    const inputPlaca = document.getElementById('Placa'); // Elemento input de marca
    const inputMotor = document.getElementById('motor'); // Elemento input de motor
    const inputKM = document.getElementById('KM'); // Elemento input de KM
    const inputAno = document.getElementById('Ano'); // Elemento input de Ano

    // Função para preencher os campos com os detalhes do carro selecionado
    function preencherDetalhesCarro(carroSelecionado) {
      inputMarca.value = carroSelecionado.marca;
      inputMotor.value = carroSelecionado.motor;
      inputKM.value = carroSelecionado.km;
      inputAno.value = carroSelecionado.ano;
      inputPlaca.value = carroSelecionado.placa;
    }

    // Limpa as opções atuais do select
    selectCarros.innerHTML = '';

    // Preenche as opções do select com os nomes dos carros obtidos do servidor
    carros.forEach(carro => {
      const option = document.createElement('option');
      option.value = carro.veiculo_id; // Valor enviado quando a opção for selecionada
      option.textContent = carro.modelo; // Exibe apenas o nome do modelo do carro
      selectCarros.appendChild(option);
    });

    // Adiciona um evento de escuta para o evento 'change' no campo de seleção de carros
    selectCarros.addEventListener('change', function(event) {
      const carroSelecionadoId = event.target.value; // ID do carro selecionado

      // Encontra o carro selecionado nos dados carregados
      const carroSelecionado = carros.find(carro => carro.veiculo_id == carroSelecionadoId);

      // Chama a função para preencher os detalhes do carro selecionado
      preencherDetalhesCarro(carroSelecionado);
    });
  } catch (error) {
    console.error('Erro ao carregar carros:', error);
  }
}


// Chama a função para carregar os carros quando o formulário for carregado
document.addEventListener('DOMContentLoaded', carregarCarros);



// ADICIONANDO MAIS UMA PEÇA e somando tudo 

// Obtém o botão e o container onde as novas peças serão adicionadas
const adicionarPecaBtn = document.getElementById('adicionarPeca');
const pecasContainer = document.getElementById('pecasContainer');

// Adiciona um ouvinte de evento ao botão de adicionar peça
adicionarPecaBtn.addEventListener('click', function() {
    // Cria novos elementos de input para peça, valor e referência
    const novaPecaInput = document.createElement('input');
    novaPecaInput.type = 'text';
    novaPecaInput.name = 'Peca';
    novaPecaInput.placeholder = 'Nome da peça';

    const novoValorInput = document.createElement('input');
    novoValorInput.type = 'text';
    novoValorInput.name = 'Valor';
    novoValorInput.placeholder = 'Valor da peça';

    const novaReferenciaInput = document.createElement('input');
    novaReferenciaInput.type = 'text';
    novaReferenciaInput.name = 'Referencia';
    novaReferenciaInput.placeholder = 'Referência da peça';

    // Adiciona os novos inputs ao container de peças
    pecasContainer.appendChild(novaPecaInput);
    pecasContainer.appendChild(novoValorInput);
    pecasContainer.appendChild(novaReferenciaInput);
    pecasContainer.appendChild(document.createElement('br')); // Adiciona uma quebra de linha para separar os campos

    // Adiciona um ouvinte de evento para os novos campos de valor, para atualizar a soma quando eles forem modificados
    novoValorInput.addEventListener('input', calcularValorTotal);
});


// SOMANDO 


// Função para calcular a soma dos valores das peças e mão de obra
function calcularValorTotal() {
  const inputsValorPecas = document.getElementsByName('Valor');
  const inputMaoDeObra = document.getElementById('maoDeObra');
  const inputValorTotal = document.getElementById('valorTotal');

  let somaPecas = 0;

  // Calcula a soma dos valores das peças
  for (let i = 0; i < inputsValorPecas.length; i++) {
    const valorPeca = parseFloat(inputsValorPecas[i].value) || 0;
    somaPecas += valorPeca;
  }

  const maoDeObra = parseFloat(inputMaoDeObra.value) || 0; // Valor da mão de obra
  const valorTotal = somaPecas + maoDeObra; // Soma das peças e mão de obra

  // Exibe o resultado da soma no campo de Valor Total, formatado como moeda
  inputValorTotal.value = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


// Adiciona um ouvinte de evento ao botão de adicionar peça
adicionarPecaBtn.addEventListener('click', function() {
  // ... (código para adicionar novos campos de peças)

  // Adiciona um ouvinte de evento para os novos campos de valor, para atualizar a soma quando eles forem modificados
  novoValorInput.addEventListener('input', calcularValorTotal);
});

// Obtém o botão de criar orçamento
const criarOrcamentoBtn = document.getElementById('criarOrcamento');

// Adiciona um ouvinte de evento ao botão de criar orçamento para calcular o valor total final
criarOrcamentoBtn.addEventListener('click', calcularValorTotal);

// Obtém todos os campos de valor das peças e adiciona um ouvinte de evento para calcular a soma ao serem modificados
const inputsValorPecas = document.getElementsByName('Valor');
inputsValorPecas.forEach(input => {
  input.addEventListener('input', calcularValorTotal);
});

// Obtém o campo de mão de obra e adiciona um ouvinte de evento para calcular a soma ao ser modificado
const inputMaoDeObra = document.getElementById('maoDeObra');
inputMaoDeObra.addEventListener('input', calcularValorTotal);


// PDF 

// Obtém o botão de criar orçamento


// Adiciona um ouvinte de evento ao botão de criar orçamento para enviar os dados ao servidor e gerar o PDF


// Adiciona um ouvinte de evento ao botão de criar orçamento para calcular o valor total final antes de enviar os dados
criarOrcamentoBtn.addEventListener('click', async function() {
  // Chama a função para calcular o valor total antes de enviar os dados para gerar o PDF
  calcularValorTotal();


  const clienteField = document.getElementById('cliente');
  const clienteID = clienteField.value; // Pega o ID do cliente
  const clienteNome = clienteField.options[clienteField.selectedIndex].text; // Pega o nome do cliente
  const KMValue = document.getElementById('KM').value;
  const placaValue = document.getElementById('Placa').value;
  function obterDadosPecas() {
    const pecasInputs = document.getElementsByName('Peca');
    const referenciasInputs = document.getElementsByName('Referencia');
    const valoresInputs = document.getElementsByName('Valor');
  
    const pecas = [];
  
    for (let i = 0; i < pecasInputs.length; i++) {
      const peca = {
        nome: pecasInputs[i].value,
        referencia: referenciasInputs[i].value,
        valor: valoresInputs[i].value,
      };
  
      pecas.push(peca);
    }
  
    return pecas;
  }
  try {
    const response = await fetch('/gerar-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cliente: {
          id: clienteID,
          nome: clienteNome,
        },
        telefone: document.getElementById('telefone').value,
        carro: document.getElementById('carro').value,
        placa: placaValue,
        marca: document.getElementById('Marca').value,
        motor: document.getElementById('motor').value,
        KM: KMValue,
        ano: document.getElementById('Ano').value,
        pecas: obterDadosPecas(), // Função para obter dados dinâmicos de peças
        maoDeObra: document.getElementById('maoDeObra').value,
        valorTotal: document.getElementById('valorTotal').value,
        // Inclua os demais dados do formulário conforme necessário
      }),
    });

    if (response.ok) {
      console.log('PDF gerado com sucesso!');
      // Faça algo com a resposta, se necessário
    } else {
      console.error('Erro ao gerar o PDF:', response.statusText);
      // Lide com o erro, se necessário
    }
  } catch (error) {
    console.error('Erro ao gerar o PDF:', error);
    // Lide com o erro, se necessário
  }
});