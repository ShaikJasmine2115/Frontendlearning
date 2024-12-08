
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); 
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value.toString();
    const errorMessage = document.getElementById('error-message');
    const users = {
        "jane": { password: "5001", name: "Jane Smith" },
        "john": { password: "5002", name: "John Doe" },
        "jas":{password:"2003",name: "Jasmine Shaik" }
    };

    if (users[userId] && users[userId].password === password) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("userName", users[userId].name); 
        window.location.href = "casestudyemp.html"; 
    } else {
        errorMessage.innerHTML = `
        <p style="color: red; font-size: 14px; text-align: center;">Wrong username or password.</p>
        <button onclick="resetForm()" style="display: block; margin: 10px auto;">Try Again</button>`;
    }
});

function resetForm() {
    document.getElementById('loginForm').reset();
    document.getElementById('error-message').innerHTML = '';
}
