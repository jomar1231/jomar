async function register() {
  const firstname = document.getElementById('firstName').value;
  const lastname = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const response = await fetch("http://localhost:3006/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        firstname,
        lastname,
        email,
        password 

      })
    });    

    const data = await response.json();   

    if (response.ok) {
      alert("Registered successfully!");
      window.location.href = '/coffee-login.html';
    } else {
      alert(data.message || "Registration failed");
    }

  } catch (err) {
    alert("Network error. Is your server running?");
    console.error(err);
  }
}

// Password strength checker
const passwordInput = document.getElementById('password');
const strengthIndicator = document.getElementById('passwordStrength');

passwordInput.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    strengthIndicator.className = 'password-strength';
    if (strength >= 1) strengthIndicator.classList.add('weak');
    if (strength >= 3) strengthIndicator.classList.add('medium');
    if (strength >= 4) strengthIndicator.classList.add('strong');
});

// Enable/disable register button based on terms checkbox
const termsCheckbox = document.getElementById('terms');

termsCheckbox.addEventListener('change', function() {
    registerBtn.disabled = !this.checked;
});

// Add smooth hover effect on input focus
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], select');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Register button click effect
registerBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (!this.disabled) {
        this.innerHTML = 'Brewing your account...';
        setTimeout(() => {
            this.innerHTML = 'Create Account';
        }, 2000);
    }
});