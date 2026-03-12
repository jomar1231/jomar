// Add smooth hover effect on input focus
const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Add click effect to login button
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    this.innerHTML = 'Brewing...';
    setTimeout(() => {
        this.innerHTML = 'Sign In';
    }, 2000);
});