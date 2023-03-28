$(document).ready(function() {
    // Seleciona o botão "Entrar" do Modal
    var entrarBtn = $('#entrar-btn');
  
    // Adiciona o evento de clique ao botão "Entrar"
    entrarBtn.on('click', function() {
      // Pega o valor do campo de email
      var email = $('#inputEmail').val();
  
      // Verifica se o email contém o caractere "@"
      if (email.includes('@')) {
        // Redireciona para a página arearestrita.html
        window.location.href = 'arearestrita.html';
      } else {
        // Mostra uma mensagem de erro
        alert('Digite um Email válido!');
      }
    });
  });
  