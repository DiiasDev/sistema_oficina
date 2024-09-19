document.addEventListener('DOMContentLoaded', () => {
    const cadastrarClienteForm = document.getElementById('cadastroClienteForm');
    const btnCadastrar = document.getElementById('cadastrarCliente');
  
    btnCadastrar.addEventListener('click', async (event) => {
      event.preventDefault();
  
      const primeiroNome = document.getElementById('primeiro_Nome').value;
      const segundoNome = document.getElementById('segundo_Nome').value;
      const celular = document.getElementById('celular').value;
      const email = document.getElementById('email').value;
  
      try {
        const response = await fetch('/cadastro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            primeiro_Nome: primeiroNome,
            segundo_Nome: segundoNome,
            celular: celular,
            email: email,
          })
        });
  
        if (response.ok) {
          // Sucesso no cadastro
          console.log('Cliente cadastrado com sucesso!');
        } else {
          // Trate o erro se houver
          console.error('Erro ao cadastrar cliente');
        }
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
      }
    });
  });

  // fornecedor 
  
  document.addEventListener('DOMContentLoaded', () => {
    const modalFornecedor = document.getElementById('modalFornecedor');
    const openModalFornecedorButton = document.getElementById('openModalFornecedor');
    const closeModalFornecedorButton = document.getElementById('closeModalFornecedor');
    const cadastrarFornecedorForm = document.getElementById('cadastroFornecedorForm');
  
    openModalFornecedorButton.addEventListener('click', () => {
      modalFornecedor.style.display = 'flex';
    });
  
    closeModalFornecedorButton.addEventListener('click', () => {
      modalFornecedor.style.display = 'none';
    });
  
    cadastrarFornecedorForm.addEventListener('submit', async (event) => {
      event.preventDefault();

            const nomeFornecedor = document.getElementById('nome_Fornecedor').value;
            const produto = document.getElementById('produto_Fornecido').value;
            const telefoneFornecedor = document.getElementById('telefone_Fornecedor').value;
            const Endereço_Fornecedor = document.getElementById('Endereço_Fornecedor').value;
      
        
            try {
              const response = await fetch('/cadastro-fornecedor', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  nomeFornecedor: nomeFornecedor,
                  produto: produto,
                  telefoneFornecedor: telefoneFornecedor,
                  Endereço_Fornecedor:Endereço_Fornecedor,
                })
              });
        
              if (response.ok) {
                console.log('Fornecedor cadastrado com sucesso!');
              } else {
                console.error('Erro ao cadastrar fornecedor');
              }
            } catch (error) {
              console.error('Erro ao enviar requisição:', error);
            }
          });
        });

        // MECANICO BD 
        
        document.addEventListener('DOMContentLoaded', () => {
          const mechanicForm = document.getElementById('mechanicForm');
        
          mechanicForm.addEventListener('submit', async (event) => {
            event.preventDefault();
        
            const nome = document.getElementById('Nome').value;
            const sobrenome = document.getElementById('Sobrenome').value;
            const telefone = document.getElementById('Telefone').value;
            const email = document.getElementById('Email').value;
        
            try {
              const response = await fetch('/cadastro-Mecanico', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  Nome: nome,
                  Sobrenome: sobrenome,
                  Telefone: telefone,
                  Email: email
                })
              });
        
              if (response.ok) {
                console.log('Mecânico cadastrado com sucesso!');
              } else {
                console.error('Erro ao cadastrar mecânico');
              }
            } catch (error) {
              console.error('Erro ao enviar requisição:', error);
            }
          });
        });
        
        // BD CARROS 

//        document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('DOMContentLoaded', () => {
    const openModalCarrosButton = document.getElementById('openModalCarros');
    const modalCarros = document.getElementById('modalCarros');
    const closeModalCarrosButton = document.getElementById('closeModalCarros');
    const cadastrarCarroForm = document.getElementById('cadastroCarroForm');
    const selectClientButton = document.getElementById('selectClient');
    const modalClientes = document.getElementById('modalClientes');
    const closeModalClientesButton = document.getElementById('closeModalClientes');
    const clientsList = document.getElementById('clienteSelecionado'); // Lista de clientes no formulário de carro
  
    openModalCarrosButton.addEventListener('click', () => {
      modalCarros.style.display = 'flex';
    });
  
    closeModalCarrosButton.addEventListener('click', () => {
      modalCarros.style.display = 'none';
    });
  
    cadastrarCarroForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const marca = document.getElementById('marca').value;
      const modelo = document.getElementById('modelo').value;
      const ano = document.getElementById('ano').value;
      const placa = document.getElementById('placa').value;
      const km = document.getElementById('km').value;
      const motor = document.getElementById('motor').value;
      const clienteSelecionadoId = document.getElementById('clienteSelecionado').value;
  
      try {
        const response = await fetch('/cadastrar-carro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            marca,
            modelo,
            ano,
            placa,
            km,
            motor,
            pessoa_id: clienteSelecionadoId
          })
        });
  
        if (response.ok) {
          console.log('Carro cadastrado com sucesso!');
          modalCarros.style.display = 'none'; // Fechar o popup após o cadastro
        } else {
          console.error('Erro ao cadastrar carro');
        }
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
      }
    });
  
    selectClientButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/cadastro', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
          const data = await response.json();
  
          clientsList.innerHTML = '';
  
          data.forEach(client => {
            const option = document.createElement('option');
            option.value = client.cliente_id;
            option.text = `${client.primeiro_nome} ${client.segundo_nome} - ${client.email}`;
            clientsList.appendChild(option);
          });
  
          modalClientes.style.display = 'flex';
        } else {
          console.error('Erro ao obter os dados dos clientes');
        }
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
      }
    });
  
    closeModalClientesButton.addEventListener('click', () => {
      modalClientes.style.display = 'none';
    });
  
    closeModalCarrosButton.addEventListener('click', () => {
      modalCarros.style.display = 'none';
    });
  });
  
// PEÇAS BD E OPENMODAL


  document.addEventListener('DOMContentLoaded', () => {
    const modalPeças = document.getElementById('modalPeças');
    const openModalPeçasButton = document.getElementById('openModalPeças');
    const closeModalPeçasButton = document.getElementById('closeModalPeças');
    const cadastroPeçasForm = document.getElementById('cadastroPeçasForm');
  
    openModalPeçasButton.addEventListener('click', () => {
      modalPeças.style.display = 'flex';
    });
  
    closeModalPeçasButton.addEventListener('click', () => {
      modalPeças.style.display = 'none';
    });
  
    cadastroPeçasForm.addEventListener('submit', async (event) => {
      event.preventDefault();

            const Nome_peça = document.getElementById('Nome_peça').value;
            const valor = document.getElementById('valor').value;
            const Referência = document.getElementById('Referência').value;
      
        
            try {
              const response = await fetch('/cadastro-Pecas', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  Nome_peça,
                  valor,
                  Referência,
                })
              });
        
              if (response.ok) {
                console.log('Peça cadastrada com sucesso!');
              } else {
                console.error('Erro ao cadastrar Peça');
              }
            } catch (error) {
              console.error('Erro ao enviar requisição:', error);
            }
          });
        });

        const openModalBtn = document.getElementById('openModal');
        const popupContainer = document.getElementById('popupContainer');
        const montarOrcamentoBtn = document.getElementById('montarOrcamentoBtn');
        const consultarOrcamentoBtn = document.getElementById('consultarOrcamentoBtn');
        const fecharPopupBtn = document.getElementById('fecharPopupBtn');
        
        // Adiciona evento de clique para abrir o popup
        openModalBtn.addEventListener('click', () => {
            popupContainer.style.display = 'flex';
        });
        
        // Adiciona evento de clique para fechar o popup (usando o botão "Fechar")
        fecharPopupBtn.addEventListener('click', () => {
            popupContainer.style.display = 'none';
        });
        
        // Adiciona evento de clique para redirecionar ao clicar em "Montar Orçamento"
        montarOrcamentoBtn.addEventListener('click', () => {
            window.location.href = 'orçamento.html';
        });
        
        // Adiciona evento de clique para mostrar a lista de orçamentos ao clicar em "Consultar Orçamento"
        consultarOrcamentoBtn.addEventListener('click', () => {
            // Coloque aqui a lógica para mostrar a lista de orçamentos e implementar a filtragem por placa e nome do cliente
            // Por exemplo, exibição de uma tabela com os orçamentos e caixas de filtro
            // Se estiver usando JavaScript ou frameworks, utilize para manipular o DOM e mostrar os dados.
        });



