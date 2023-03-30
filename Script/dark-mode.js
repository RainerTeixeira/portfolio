const chk = document.getElementById('chk');
let isSystemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let isUserDarkMode = JSON.parse(localStorage.getItem('darkMode'));

if (isSystemDarkMode && (isUserDarkMode === null || isUserDarkMode)) {
  document.body.classList.add('dark');
  chk.checked = true;
} else if (isUserDarkMode) {
  document.body.classList.add('dark');
  chk.checked = true;
}

chk.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', chk.checked);
  isUserDarkMode = chk.checked;
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  isSystemDarkMode = e.matches;
  if (isSystemDarkMode && (isUserDarkMode === null || isUserDarkMode)) {
    document.body.classList.add('dark');
    chk.checked = true;
  } else if (!isSystemDarkMode && isUserDarkMode) {
    document.body.classList.add('dark');
    chk.checked = true;
  } else {
    document.body.classList.remove('dark');
    chk.checked = false;
  }
});
