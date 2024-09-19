const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const pdf = require('html-pdf');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');


const app = express();


// Configurando o body-parser para análise de formulário
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Conexão com o banco de dados MySQL usando Sequelize
const sequelize = new Sequelize('oficina', 'root', 'Dias1501', {
  dialect: 'mysql',
  host: 'localhost',
});

// Modelo para os funcionários
const Funcionarios = sequelize.define('funcionarios', {
  primeiro_Nome: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'primeiro_Nome',
  },
  ultimo_Nome: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'ultimo_Nome', // Especifique o nome correto da coluna no banco de dados
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'telefone', // Especifique o nome correto da coluna no banco de dados
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'email', // Especifique o nome correto da coluna no banco de dados
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'senha', // Especifique o nome correto da coluna no banco de dados
  },
});

const Cliente = sequelize.define('Clientes', {
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  primeiro_nome: {
    type: DataTypes.STRING(45),
    allowNull: true, // Permitir valores nulos
  },
  segundo_nome: {
    type: DataTypes.STRING(45),
    allowNull: true, // Permitir valores nulos
  },
  celular: {
    type: DataTypes.STRING(90),
    allowNull: true, // Permitir valores nulos
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true, // Permitir valores nulos
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

const Fornecedor = sequelize.define('fornecedors', {
  Fornecedor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Nome_fornecedor: {
    type: DataTypes.STRING(45),
    allowNull: true, // Permitir valores nulos
  },
  Endereço_Fornecedor: {
    type: DataTypes.STRING(90),
    allowNull: true, // Permitir valores nulos
  },
  Telefone_fornecedor: {
    type: DataTypes.STRING(90),
    allowNull: true, // Permitir valores nulos
  },
  produto_Fornecido: {
    type: DataTypes.STRING(100),
    allowNull: true, // Permitir valores nulos
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
   
  
});
const Mecanicos = sequelize.define('mecanicos', {
  id_mecanico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Nome: {
    type: DataTypes.STRING(45),
    allowNull: true, // Permitir valores nulos
  },
  Sobrenome: {
    type: DataTypes.STRING(90),
    allowNull: true, // Permitir valores nulos
  },
  Telefone: {
    type: DataTypes.STRING(90),
    allowNull: true, // Permitir valores nulos
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: true, // Permitir valores nulos
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'createdAt' // Verifique o nome correto da coluna no banco de dados
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'updatedAt' // Verifique o nome correto da coluna no banco de dados
  },
});


const Veiculo = sequelize.define('veiculos', {
  veiculo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  marca: {
    type: DataTypes.STRING(45),
    allowNull: true, // Permitir valores nulos
  },
  placa: {
    type: DataTypes.STRING(45),
    allowNull: true, // Permitir valores nulos
  },
  modelo: {
    type: DataTypes.STRING(45),
    allowNull: true, // Permitir valores nulos
  },
  ano: {
    type: DataTypes.STRING(45),
    allowNull: true, // Permitir valores nulos
  },
  km: {
    type: DataTypes.STRING(45),
    allowNull: true, // Permitir valores nulos
  },
  motor: {
    type: DataTypes.STRING(45),
    allowNull: true, // Permitir valores nulos
  },
  pessoa_id: {
    type: DataTypes.STRING(45),
    allowNull: true, // Permitir valores nulos
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'createdAt' // Verifique o nome correto da coluna no banco de dados
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'updatedAt' // Verifique o nome correto da coluna no banco de dados
  },
});


const Peças = sequelize.define('peças', {
  peças_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Nome_peça: {
    type: DataTypes.STRING(45),
    allowNull: true, // Permitir valores nulos
  },
  valor: {
    type: DataTypes.STRING(90),
    allowNull: true, // Permitir valores nulos
  },
  Referência: {
    type: DataTypes.STRING(90),
    allowNull: true, // Permitir valores nulos
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});



// Sincronização do modelo com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para lidar com os dados do formulário de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se o funcionário com as credenciais fornecidas existe no banco de dados
    const funcionario = await Funcionarios.findOne({ where: { email, senha } });

    if (funcionario) {
      // Se as credenciais estiverem corretas, redireciona para alguma página
      res.redirect('/cadastro.html');
    } else {
      // Caso as credenciais estejam incorretas, redireciona de volta para o formulário de login
      res.send('Login ou senha inválido!');
    }
  } catch (error) {
    console.error('Erro durante a autenticação:', error);
    res.status(500).send('Erro durante a autenticação');
  }
});

// Rota para lidar com os dados do formulário de cadastro
app.post('/inscrever', async (req, res) => {
  const { primeiro_Nome, ultimo_Nome, telefone, email, senha } = req.body;

  const telefoneFormatado = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

  try {
    const novoUsuario = await Funcionarios.create({
      primeiro_Nome,
      ultimo_Nome,
      telefone: telefoneFormatado,
      email,
      senha,
    });

    res.redirect('/index.html');
  } catch (error) {
    console.error('Erro durante o cadastro:', error);
    res.status(500).send('Erro durante o cadastro');
  }
});


//CLIENTES


app.post('/cadastro', async (req, res) => {
  console.log(req.body);
  const { primeiro_Nome, segundo_Nome, celular, email } = req.body;

  const telefoneFormatado = celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

  try {
    // Cria um novo cliente no banco de dados
    const novoCliente = await Cliente.create({
      primeiro_nome: primeiro_Nome,
      segundo_nome: segundo_Nome,
      celular: telefoneFormatado,
      email: email,
    });

    res.status(200).send('Cliente cadastrado com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    res.status(500).send('Erro ao cadastrar cliente');
  }
});

// FORNECEDOR

app.post('/cadastro-fornecedor', async (req, res) => {
  const { nomeFornecedor, telefoneFornecedor, Endereço_Fornecedor, produto } = req.body;

  const tel = telefoneFornecedor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

  try {
    const novoFornecedor = await Fornecedor.create({
      Nome_fornecedor: nomeFornecedor,
      Telefone_fornecedor: tel,
      produto_Fornecido: produto,
      Endereço_Fornecedor: Endereço_Fornecedor,
    });

    res.status(200).send('Fornecedor cadastrado com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar fornecedor:', error);
    res.status(500).send('Erro ao cadastrar fornecedor');
  }
});


//MECÂNICO 

app.post('/cadastro-Mecanico', async (req, res) => {
  const { Nome, Sobrenome, Telefone, Email } = req.body;

  const tel = Telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

  try {
    const novoMecanico = await Mecanicos.create({
      Nome: Nome,
      Sobrenome: Sobrenome,
      Telefone: tel,
      Email: Email,
    });

    res.status(200).send('Fornecedor cadastrado com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar fornecedor:', error);
    res.status(500).send('Erro ao cadastrar fornecedor');
  }
});


// CADASTRO CARRO


app.post('/cadastrar-carro', async (req, res) => {
  const { veiculo_id, marca, placa, modelo, ano, km, motor, pessoa_id } = req.body;

  console.log('Dados recebidos:', { veiculo_id, marca, placa, modelo, ano, km, motor, pessoa_id });

  try {
    const novoCarro = await Veiculo.create({
      veiculo_id:veiculo_id,
      marca:marca,
      placa:placa,
      modelo:modelo,
      ano:ano,
      km:km,
      motor:motor,
      pessoa_id:pessoa_id,
    });

    res.redirect('/index.html');
  } catch (error) {
    console.error('Erro durante o cadastro:', error);
    res.status(500).send('Erro durante o cadastro');
  }
});

// Rota para obter a lista de clientes
app.get('/cadastro', async (req, res) => {
  try {
    // Consulta ao banco de dados para obter os clientes
    const clientes = await Cliente.findAll(); // Supondo que "Cliente" é o modelo do seu cliente

    res.json(clientes); // Envia a lista de clientes como resposta
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).send('Erro ao buscar clientes');
  }
});

// PEÇAS

app.post('/cadastro-Pecas', async (req, res) => {
  const { Nome_peça, valor, Referência,} = req.body;


  try {
    const novaPeça = await Peças.create({
      Nome_peça: Nome_peça,
      valor: valor,
      Referência: Referência,
    });

    res.status(200).send('peça cadastrada com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar peça:', error);
    res.status(500).send('Erro ao cadastrar peça');
  }
});




// orçamento

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).send('Erro ao buscar clientes');
  }
});

app.get('/carros', async (req, res) => {
  try {
    const carros = await Veiculo.findAll();
    res.json(carros);
  } catch (error) {
    console.error('Erro ao buscar carros:', error);
    res.status(500).send('Erro ao buscar carros');
  }
});

app.get('/peças', async (req, res) => {
  try {
    const pecas = await Peças.findAll();
    res.json(pecas);
  } catch (error) {
    console.error('Erro ao buscar peças:', error);
    res.status(500).send('Erro ao buscar peças');
  }
});




// pdf

app.post('/gerar-pdf', async (req, res) => {
  try {
    console.log('Recebido POST para gerar o PDF');
    const {
      cliente,
      telefone,
      carro,
      placa,
      marca,
      motor,
      KM,
      ano,
      pecas,
      maoDeObra,
      valorTotal
    } = req.body;
    // Extrair os dados corretamente do objeto cliente
    const clienteID = cliente.id;
    const clienteNome = cliente.nome;
    // Obtendo os dados do cliente



    // Crie um objeto com os detalhes do carro
    const carroSelecionado = await Veiculo.findByPk(carro);

    //converter imagem 
    const imagePath = 'C:/Users/Dias/Documents/PROJETOS REAIS/PROJETOS REAIS/OFICINA/IMAGES/teste.png';
    const imageBase64 = fs.readFileSync(imagePath, 'base64');
    const imageSrc = `data:image/png;base64,${imageBase64}`;  
    const backgroundImageStyle = `background-image: url('${imageSrc}');`;

    // data e hora pdf

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

    //criar pdf 

    async function criarESalvarPDF(caminhoArquivo, nomeArquivo, conteudoHTML) {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
    
      // Converta o conteúdo HTML para PDF
      const font = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
      const text = page.drawText(conteudoHTML, { font });
    
      // Salve o PDF
      const pdfBytes = await pdfDoc.save();
      const caminhoCompleto = `${caminhoArquivo}/${nomeArquivo}.pdf`;
    
      fs.writeFileSync(caminhoCompleto, pdfBytes);
      console.log(`PDF salvo em: ${caminhoCompleto}`);
    }

    // Exemplo de uso
const caminhoEscolhido = '/caminho/do/seu/arquivo';
const nomeDoArquivo = 'orcamento';


    // Lógica para criar o HTML com os dados recebidos do formulário
    const htmlContent = `
    <html>
    <head>
    <style>
    body {
      overflow: hidden;
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 0;
    }

    h1 {
      text-align: center;
      margin-bottom: 20px;
      color: #333;
    }

    #logo {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 100px;
      height: 100px;
    }

    strong {
      color: #555;
      display: block; /* Adicionado para garantir que cada strong ocupe uma linha inteira */
      margin-bottom: 10px; /* Adicionado para dar espaço entre os strongs */
    }

    .section {
      border: 1px solid #ddd;
      padding: 10px;
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 5px;
    }

    .footer {
      justify-content: flex-end;
      position: absolute;
      bottom: 20px;
      left: 20px;
      display: flex;
      font-size: 12px;
    }

    .footer h2 {
      display: inline;
      justify-content: flex-end;
      margin-right: 10px;
      color: #777;
    }
  </style>
    </head>
    <body>
      <img id="logo" src="${imageSrc}" alt="Logo"> 
      
      
      <h1>Detalhes do Orçamento</h1>
      <div class="section">
      <strong>Cliente: ${clienteNome}</strong>
      <strong>Telefone: ${telefone}</strong>
      </div>

      <div class="section">
      <strong>Carro: ${carroSelecionado.modelo}</strong>
      <strong>Placa: ${placa}</strong>
      <strong>Marca: ${marca}</strong>
      <strong>Motor: ${motor}</strong>
      <strong>KM: ${KM}</strong>
      <strong>Ano: ${ano}</strong>
      </div>

      <div class="section">
      ${pecas.map(peca => `
      <strong>Peça: ${peca.nome}</strong>
      <strong>Referência: ${peca.referencia}</strong>
      <strong>Valor da Peça: ${peca.valor}</strong>
    `).join('')}
    </div>

    <div class="section">
      <strong>Mão de Obra: ${maoDeObra}</strong>
      <strong>Valor Total: ${valorTotal}</strong>
    </div>

      <div class="footer">
      <h2>Data: ${formattedDate}</h2>
      <h2>Hora: ${formattedTime}</h2>
      <h1>Aprovado________________________________Sim( )  Não( )
    </div>
    </body>
    </html>
    `;

    const desktopPath = path.join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'], 'Desktop');
    const filePath = path.join(desktopPath, 'orcamento.pdf');

pdf.create(htmlContent).toFile(filePath, (err, result) => {
  if (err) {
    console.error('Erro ao gerar o PDF:', err);
    // Manipulação de erro aqui
  } else {
    console.log('PDF gerado com sucesso:', result);
    // Envie o PDF para download ou faça qualquer outra coisa aqui
  }
});
  } catch (error) {
    console.error('Erro durante a geração do PDF:', error);
    res.status(500).send('Erro durante a geração do PDF');
  }
});

const PORT = 8082; // Define a porta como 8082

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});