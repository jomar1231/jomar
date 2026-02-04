function toggleMenu() {
        const menu = document.querySelector('.navbar-menu');
        const toggleButton = document.querySelector('.navbar-toggle');
        menu.classList.toggle('active');
        toggleButton.classList.toggle('active');
    }