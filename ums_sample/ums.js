document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById('login-form').classList.add('active');
    document.getElementById('register-form').classList.remove('active');
})

document.getElementById('register-toggle').addEventListener('click', function() {
    document.getElementById('register-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-toggle').style.display = 'none';
    document.getElementById('login-link').style.display='block';
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    authenticateUser(username, password);
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const userfirstname = document.getElementById('register-userfirstname').value;
    const userlastname = document.getElementById('register-userlastname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    registerUser(userfirstname,userlastname, email, password);
});
function loginlink(){
    document.getElementById('login-form').classList.add('active');
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('login-link').style.display='none';
    document.getElementById('register-toggle').style.display = 'block';
}
function authenticateUser(username, password) {
    const errorMessage = document.getElementById('error-message');
    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.username === username && user.password === password);
            if (user) {
                    sessionStorage.setItem("loggedIn", "true");
                    sessionStorage.setItem("userName", username); 
                    sessionStorage.setItem("userData", JSON.stringify(user));
                    window.location.href = "postlogin.html";    
            } else {
                document.getElementById('login').style.display = 'none';
                errorMessage.innerHTML = `<p>Wrong username or password.</p>
                <button onclick="resetloginForm()" style="display: block; margin: 10px auto;">Try Again</button>`;
            }
        })
         .catch(error => console.error('Error:', error));
}

function resetloginForm() {
    document.getElementById('login').style.display = 'block';
     document.getElementById('login-form').reset();
     document.getElementById('error-message').innerHTML = '';
}
function registerUser(userfirstname,userlastname, email, password) {
    const errorMessage = document.getElementById('error-message');
    
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      document.getElementById('register').style.display = 'none';
      errorMessage.innerHTML = `<p>Please enter a valid email address.</p>
                <button id="tryagain" onclick="resetregForm()" style="display: block; margin: 10px auto;">Try Again</button>`;
    }
    else{
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("userfirstname", userfirstname);
        sessionStorage.setItem("userlastname", userlastname);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);          
        window.location.href = "postlogin.html";
    }
}
function resetregForm() {
    document.getElementById('register').style.display = 'block';
     document.getElementById('register-form').reset();
     document.getElementById('error-message').innerHTML = '';
}