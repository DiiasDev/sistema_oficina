document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário (recarregar a página)

    console.log('Clicou no botão de Entrar!'); // Verifica se a função está sendo chamada

    // Aqui você pode adicionar sua lógica de login, enviar requisição para o servidor, etc.
    // Por exemplo, se estiver usando fetch para enviar dados para o servidor:
    const formData = new FormData(this);
    const response = await fetch('/index', {
        method: 'POST',
        body: formData
    });

    // Aqui você pode lidar com a resposta do servidor, redirecionar para outra página, exibir mensagens, etc.
    // Por exemplo, se deseja redirecionar para outra página após o login:
    if (response.ok) {
        window.location.href = '/cadastro.html'; // Redireciona para outra página após o login
    } else {
        // Lógica para lidar com o erro de login, exibir mensagem de erro, etc.
        console.error('Erro de login');
    }
});
