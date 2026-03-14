async function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if(!email || !password) {
        alert("Please enter email and password");
        return;
    }
    
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.disabled = true;
    loginBtn.innerHTML = 'Login...';
    
    try{
        const response = await fetch("http://localhost:3006/api/login",{
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();

        if(response.ok){
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert("LOGIN SUCCESSFULLY");
            window.location.href = "/shopMarket.html";
        }else{
            alert(data.message || "ACCESS DENIED");
            loginBtn.disabled = false;
            loginBtn.innerHTML = 'Sign In';
        }
    }catch(err){
        alert("Network error: Please check your connection");
        console.error(err);
        loginBtn.disabled = false;
        loginBtn.innerHTML = 'Sign In';
    }
}


const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});


// Button click handler - calls login function
const loginBtn = document.querySelector('.login-btn');
if(loginBtn) {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        login();
    });
}