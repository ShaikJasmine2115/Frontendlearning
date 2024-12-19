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
    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.username === username && user.password === password);
            if (user) {
                alert('Login successful');
                if (user.role === 'admin') {
                    console.log("admin");
                    // Grant access to admin features
                } else {
                    console.log("not admin");
                    // Grant access to user features
                }
                // Implement role-based access control here
            } else {
                alert('Invalid credentials');
            }
        })
        .catch(error => console.error('Error:', error));
}

function registerUser(username, email, password) {
    fetch('https://dummyjson.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then(response => response.json())
        .then(data => {
            alert('Registration successful');
            // Implement role-based access control here
        })
        .catch(error => console.error('Error:', error));
}
