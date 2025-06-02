import { getBaseUri } from './utils.js';

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    loginUser(email, password);
});

async function loginUser(email, password) {
    try {
        const loginUri = getBaseUri() + "/api/v1/auth/login";
        const response = await fetch(loginUri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

       
        if (response.ok) {
            const data = await response.json();
            const jwtToken = data.token; 
            const payload = parseJWT(jwtToken);
            
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('loginUserId', payload.userId);
            localStorage.setItem('loginRole', payload.role);
            window.location.href = "../html/index.html"; 
        } else {
            const error = await response.json();
            alert(`Login failed: ${error.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login');
    }
}

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const mobileNo = document.getElementById('mobile-number').value;

    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    registerUser(name, email, password, mobileNo);
});

async function registerUser(name, email, password, mobileNo) {
    try {
        const registerUserUri = getBaseUri() + '/api/v1/users';
        const response = await fetch(registerUserUri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                mobileNo: mobileNo
            })
        });
       
        if (response.ok) {
            const data = await response.json(); 
            alert('Registration successful! Please log in.');
           
        } else {
            const error = await response.json();
            alert(`Registration failed: ${error.message}`);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration');
    }
}



function parseJWT(jwt) {
    
    const parts = jwt.split('.');
  
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }
  
    const payload = JSON.parse(atob(parts[1]));
  
    return payload;

}

function forgotPasswordEnabled(){
    document.getElementById('forgot-password-modal').style.display = 'flex';
}

document.getElementById('submit-btn').addEventListener('click', async () => {
    const email = document.getElementById('email-input').value;
    console.log(email);
    try {
        const emailUri = getBaseUri() + '/api/v1/email/' + email;
        const response = await fetch(emailUri);
       
        if (response.ok) {
            alert('Please check email & login with new password');
            window.location.href = "../html/login_registration.html"; 
        } else {
            const error = await response.json();
            alert(`Failed: ${error.message}`);
            window.location.href = "../html/login_registration.html"; 
        }
    } catch (error) {
        console.error('Error during forgot password:', error);
        alert('Something goes worng');
        window.location.href = "../html/login_registration.html"; 
    }

});


window.loginUser = loginUser;
window.registerUser = registerUser;
window.parseJWT = parseJWT;
window.forgotPasswordEnabled = forgotPasswordEnabled;
