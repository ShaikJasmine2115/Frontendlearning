window.onload = function() {
    if (!sessionStorage.getItem("loggedIn")) {
            window.location.href = "ums.html"; 
    }
};
function showLogout() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('logoutDiv').style.display = 'block';
}

function logout() {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "ums.html";
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('logoutDiv').style.display = 'none';
}
function closeModifyUserModal() {
    const modal = document.getElementById("userModifyModal");
    modal.style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {  
    const username = sessionStorage.getItem('userName'); 
    const userdata= sessionStorage.getItem("userData");    
    const user=JSON.parse(userdata);
    document.getElementById('displayUsername').textContent = `Welcome, ${username}!`;  
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const profileList = document.getElementById('profile-list');  
    const profile = document.getElementById('profile');    
    const view = document.getElementById('view');    
    const modify=document.getElementById('modify');  
    const logout=document.getElementById('logout-button');

    displayuserimage(user,hamburgerMenu);
      hamburgerMenu.addEventListener('click', function () {
        profileList.style.display = profileList.style.display === 'none' ? 'block' : 'none';
    });
    profile.addEventListener('click', () => {
        displayUserProfile(user);     
    });  
      view.addEventListener('click',()=>{        
      displayAllDetails(user);     
    });             
      modify.addEventListener('click',()=>{        
      updateDetails(user);     
     }); 
      logout.addEventListener('click',()=>{
      showLogout();
     });
});
function displayuserimage(user,hamburgerMenu){ 
    const userImage = user.image;
    const profileImageElement = document.createElement('img');
    profileImageElement.src = userImage;
    profileImageElement.alt = 'User Icon';
    profileImageElement.className = 'user-icon';
    hamburgerMenu.prepend(profileImageElement);                    
}
function displayUserProfile(user) {
    const profileContainer = document.getElementById('profile-container');  
    const modal = document.getElementById("userModifyModal");
    modal.style.display = 'none';
    if (user) {       
        const { firstName, lastName, age, gender, email, phone, image } = user;
        profileContainer.style.display = 'block';
        profileContainer.innerHTML = `
            <img src="${image}" alt="${firstName} ${lastName}">
            <h2>${firstName} ${lastName}</h2>
            <p>Age: ${age}</p>
            <p>Gender: ${gender}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
        `;
    } else {
        profileContainer.innerHTML = '<p>User not found.</p>';
    }
}
function displayAllDetails(user) {
    sessionStorage.setItem("userData", JSON.stringify(user));
    window.open("viewpage.html");    
        } 
function updateDetails(user) {
        const profileContainer = document.getElementById('profile-container');
        profileContainer.style.display='none';
        const modal = document.getElementById("userModifyModal");
        const nameField = document.getElementById("username");
        const emailField = document.getElementById("email");
        const phoneField = document.getElementById("phoneno");
        const passwordField = document.getElementById("password");
        nameField.value = user.username;
        modal.style.display = 'block';
        if (user) {
            emailField.value = user.email || '';
            phoneField.value = user.phone || '';
            passwordField.value = user.password || '';
            const modifyUserForm = document.getElementById("modifyUserForm");
            modifyUserForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const updatedData = {
                    username: user.username,
                    email: emailField.value,
                    phone: phoneField.value,
                    password: passwordField.value,
                };
                const updateUrl = `https://dummyjson.com/users/${user.id}`;
                fetch(updateUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                })
                    .then(res => res.json())
                    .then(updatedUser => {
                        const updateDialog = document.getElementById('update-dialog');
                        updateDialog.style.display = 'block';
                        setTimeout(() => {
                            updateDialog.style.opacity = '0';
                            updateDialog.addEventListener('transitionend', () => {
                                updateDialog.style.display = 'none';
                            }, { once: true });
                        }, 2000);
                        console.log('User updated successfully:', updatedUser);
                        modal.style.display = 'none'; 
                    })
                    .catch(error => {
                        console.error('Error updating user:', error);
                    });
            });
        } else {
            console.error('User not found');
        }
    }
        
        