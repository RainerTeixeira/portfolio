const chk = document.getElementById('chk');
const isDarkMode = localStorage.getItem('darkMode');

// verifica se o modo escuro foi definido anteriormente
if (isDarkMode === 'true') {
  document.body.classList.add('dark');
  chk.checked = true;
}

chk.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  // salva o status do modo escuro no localStorage
  localStorage.setItem('darkMode', chk.checked);
});



