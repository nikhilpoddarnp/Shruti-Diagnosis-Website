import { checkJWT, getUserId, getBaseUri } from './utils.js';

async function getUser(){
    let userId = getUserId();
    const fetchUserByIduri = getBaseUri() + '/api/v1/users/' + userId;
    const response = await fetch(fetchUserByIduri);
        
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    const data = await response.json();
    return data;
}

document.getElementById('updateUserForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const mobile = document.getElementById('mobile').value;


    async function updateUser(){
       
        const userData = {
            name: name,
            email: email,
            password: password,
            role: role,
            mobileNo: mobile,
        };
        
        const userId = getUserId();

        try {
            const updateUserUri = getBaseUri + '/api/v1/users/' + userId;
            const response = await fetch(updateUserUri, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            const userData_1 = await response.json();
            
            if (userData_1.id) {
                
                window.location.href = "../html/user_details.html";
            } else {
                alert('Failed to update user');
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    }

    updateUser();
});


document.getElementById('cancelButton').addEventListener('click', function() {
    window.location.href = "../html/user_details.html"; 
});

async function fillExistingDetails(){
    const userData = await getUser();

    document.getElementById('name').value = userData.name;
    document.getElementById('email').value = userData.email;
    document.getElementById('password').value = userData.password;
    document.getElementById('role').value = userData.role;
    document.getElementById('mobile').value = userData.mobileNo;    

}

checkJWT();
fillExistingDetails();