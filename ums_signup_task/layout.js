// document.getElementById('register-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('register-username').value;
//     const email = document.getElementById('register-email').value;
//     const password = document.getElementById('register-password').value;
//     registerUser(username, email, password);
// });
// function closeSidebar() {
//     document.querySelector('.container').style.gridTemplateColumns = '1fr 1fr'; // Set both columns to 1fr when sidebar is closed
// }
function closeSidebar() {
    document.querySelector('.container').style.gridTemplateColumns = '1fr 1fr';  // Adjust grid layout
    document.querySelector('.sidebar').style.display = 'none';  // Hide the sidebar
}
function openSidebar() {
    document.querySelector('.container').style.gridTemplateColumns = '250px 1fr'; // Restore original layout when sidebar is open
}
