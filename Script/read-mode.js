function toggleReadMode() {
    if (document.body.classList.contains('read-mode')) {
        document.body.classList.remove('read-mode');
    } else {
        document.body.classList.add('read-mode');
    }
}
