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
    document.getElementById('displayUsername').textContent = `Welcome, ${username}!`;    
    const profile = document.getElementById('profile');    
    const view = document.getElementById('view');    
    const modify=document.getElementById('modify');    
    view.addEventListener('click',()=>{        
      displayAllDetails(username);     
  });    
      profile.addEventListener('click', () => {
      displayUserProfile(username);     
  });      
      modify.addEventListener('click',()=>{        
      updateDetails(username);     
  }); 
});

function displayUserProfile(username) {
    const profileContainer = document.getElementById('profile-container');  
    const modal = document.getElementById("userModifyModal");
    modal.style.display = 'none';
    if (username) {
        fetch('https://dummyjson.com/users')
            .then(response => response.json())
            .then(data => {
                const user = data.users.find(user => user.username === username);
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
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                profileContainer.innerHTML = '<p>Failed to load user profile.</p>';
            });
    }
}
function displayAllDetails(username) {
    const profileContainer = document.getElementById('profile-container');  
    const modal = document.getElementById("userModifyModal");
    modal.style.display = 'none';
    if (username) {
        fetch('https://dummyjson.com/users')
            .then(response => response.json())
            .then(data => {
                const user = data.users.find(user => user.username === username);
                if (user) {
                    const { firstName, lastName, age, gender, email, phone, ...additionalInfo } = user;
                    profileContainer.innerHTML = `
                    <h2>${firstName} ${lastName}</h2>
                    <p>Age: ${age}</p>
                    <p>Gender: ${gender}</p>
                    <p>Email: ${email}</p>
                    <p>Phone: ${phone}</p>
                  `;
                  for (const [key, value] of Object.entries(additionalInfo)) {
                    const infoElement = document.createElement('p');
                    infoElement.textContent = `${key}: ${JSON.stringify(value)}`;
                    profileContainer.appendChild(infoElement);
                  }
                }
                else {
                    console.error('User not found');
                  }
                }) 
                .catch(error => console.error('Error fetching user data:', error));      
            }      
        } 
function updateDetails(username) {
        const profileContainer = document.getElementById('profile-container');
        profileContainer.style.display='none';
        const modal = document.getElementById("userModifyModal");
        const nameField = document.getElementById("username");
        const emailField = document.getElementById("email");
        const phoneField = document.getElementById("phoneno");
        const passwordField = document.getElementById("password");
        nameField.value = username;
        modal.style.display = 'block';
        fetch('https://dummyjson.com/users')
            .then(response => response.json())
            .then(data => {
                 const user = data.users.find(user => user.username === username);
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
                })
                .catch(error => console.error('Error fetching users:', error));
        }
        
        