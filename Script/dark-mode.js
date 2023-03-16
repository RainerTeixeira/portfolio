/*function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }*/


 
 
 const chk = document.getElementById('chk')

 chk.addEventListener('change', () => {
   document.body.classList.toggle('dark-mode')
 })