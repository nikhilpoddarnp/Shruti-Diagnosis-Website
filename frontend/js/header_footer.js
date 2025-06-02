import { getBaseUri } from './utils.js';

async function headerLoading() {
    await fetch('../html/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            parseJWT(localStorage.getItem('token'));
            const loginRole = localStorage.getItem('loginRole');
            if(loginRole === null){
                document.getElementById("appointments").style.display = "none"
            }
            if (loginRole === 'ADMIN') {
                document.getElementById("display_users").style.display = "block";
                document.getElementById("packages_container").style.display = "block";
                document.getElementById("tests-container").style.display = "block";
                document.getElementById("requested_call").style.display = "block";
                document.getElementById("appointments").style.display = "block";
            } else if(loginRole === 'USER') {
                document.getElementById("user_profile").style.display = "block";
            }

        })
        .catch(error => console.error('Error loading header:', error));
    
}

async function footerLoading() {
    getBaseUri();
    const apiUrl = getBaseUri() + '/api/v1/contact'; 

    await fetch('../html/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    await fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('phone').textContent = `Phone: ${data.phone}`;
            document.getElementById('email').textContent = `Email: ${data.email}`;
            document.getElementById('address').textContent = `Address: ${data.address}`;
        })
        .catch(error => {
            console.error('Error fetching contact details:', error);
            document.getElementById('contact-info').innerHTML = `<p>Failed to load contact details.</p>`;
        });
    
}

function isTokenExparired(payload){
    const expirationTime = payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return expirationTime < currentTime;
}

function parseJWT(jwt) {
    try{
        const parts = jwt.split('.');
  
        if (parts.length !== 3) {
          throw new Error("Invalid JWT format");
        }
      
        const payload = JSON.parse(atob(parts[1]));
       
        const tokenExparired = isTokenExparired(payload);
        if(tokenExparired){
            localStorage.clear();
            document.getElementById("logout").style.display = "none";
            return "Token_Expaired"
        }
        document.getElementById("login-registration").style.display = "none";
        return payload;
    } catch(error){
        document.getElementById("logout").style.display = "none";
        localStorage.clear();
        return "Token_Expaired"
    }
}

function logout(){
    localStorage.clear();
    document.getElementById("logout").style.display = "none";
    document.getElementById("login-registration").style.display = "block";
    window.location.href = "../html/index.html"; 
}

window.headerLoading = headerLoading;
window.footerLoading = footerLoading;
window.isTokenExparired = isTokenExparired;
window.parseJWT = parseJWT;
window.logout = logout;

window.addEventListener('load', function() {
    headerLoading();
    footerLoading();
});