document.addEventListener('DOMContentLoaded',()=>{
  console.log("entered");
});
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const email = document.getElementById('register-email').value;
    const userfirstname = document.getElementById('register-userfirstname').value;
    const userlastname = document.getElementById('register-userlastname').value;
    const password = document.getElementById('register-password').value;
    const errorMessage = document.getElementById('error-message');
    
    
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      event.preventDefault(); 
      document.getElementById('register').style.display = 'none';
      errorMessage.innerHTML = `<p>Please enter a valid email address.</p>
                <button id="tryagain" onclick="resetForm()" style="display: block; margin: 10px auto;">Try Again</button>`;
    }
    else{
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("userfirstname", userfirstname);
        sessionStorage.setItem("userlastname", userlastname);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);          
        window.location.href = "postlogin.html";
    }
    
    // registerUser(userfirstname,userlastname, email, password);
});
function resetForm() {
     document.getElementById('register-form').reset();
     document.getElementById('error-message').innerHTML = '';
     document.getElementById('register').style.display = 'block';
}
// function closeSidebar() {
//     document.querySelector('.container').style.gridTemplateColumns = '1fr 1fr';  // Adjust grid layout
//     document.querySelector('.sidebar').style.display = 'none';  // Hide the sidebar
// }
//     
// 
// function openSidebar() {
//     document.querySelector('.container').style.gridTemplateColumns = '250px 1fr'; // Restore original layout when sidebar is open
// }

  