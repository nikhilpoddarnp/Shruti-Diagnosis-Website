import { checkJWT, getBaseUri } from './utils.js';


function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const mobile = document.getElementById('mobile').value.trim();
    const errorMessage = document.getElementById('error-message');

    errorMessage.innerHTML = '';

    if (!name || !email || !password || !role || !mobile) {
        errorMessage.innerHTML = 'All fields are required!';
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        errorMessage.innerHTML = 'Please enter a valid email address.';
        return false;
    }

    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(mobile)) {
        errorMessage.innerHTML = 'Please enter a valid 10-digit mobile number.';
        return false;
    }

    const userData = {
        name: name,
        email: email,
        password: password,
        role: role,
        mobileNo: mobile
    };

    
    createUser(userData);

    return true;
}

function createUser(userData) {

    const apiUrl = getBaseUri() + '/api/v1/users';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        
        document.getElementById('addUserForm').reset(); 
        window.location.href = "../html/display_users.html"; 
    })
    .catch(error => {
        document.getElementById('error-message').innerHTML = 'Error adding user. Please try again.';
        console.error('Error:', error);
    });
}

window.validateForm = validateForm;
window.createUser = createUser;

checkJWT();