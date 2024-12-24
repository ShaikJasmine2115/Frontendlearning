document.getElementById('login-toggle').addEventListener('click', function() {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('register-form').classList.remove('active');
});

document.getElementById('register-toggle').addEventListener('click', function() {
    document.getElementById('register-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    authenticateUser(username, password);
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    registerUser(username, email, password);
});

function authenticateUser(username, password) {
    const errorMessage = document.getElementById('error-message');
    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.username === username && user.password === password);
            if (user) {
                    sessionStorage.setItem("loggedIn", "true");
                    sessionStorage.setItem("userName", username); 
                    window.location.href = "index.html";    
            } else {
                document.getElementById('login').style.display = 'none';
                errorMessage.innerHTML = `<p>Wrong username or password.</p>
                <button onclick="resetForm()" style="display: block; margin: 10px auto;">Try Again</button>`;
            }
        })
         .catch(error => console.error('Error:', error));
}

function resetForm() {
    document.getElementById('login').style.display = 'block';
     document.getElementById('login-form').reset();
     document.getElementById('error-message').innerHTML = '';
}
function registerUser(username, email, password) {
    console.log("registered1");
    fetch('https://dummyjson.com/users/2', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then(response => response.json())
        .then(data => {
            alert('Registration successful');
            console.log("registered2");
        })
        .catch(error => console.error('Error:', error));
}
