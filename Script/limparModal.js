$('#loginModal').on('hidden.bs.modal', function (e) {
    // limpa o formulário quando o modal for fechado
    $('form').trigger('reset');
  });
  