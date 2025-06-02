import { checkJWT, getBaseUri } from './utils.js';

async function fetchUserDetails() {
    try {
        const loginRole = localStorage.getItem('loginRole');
        let userId = '';
        if(loginRole === 'ADMIN'){
            userId = localStorage.getItem('userId');
        } 
        if(userId === undefined || userId === ''){
            userId = localStorage.getItem('loginUserId');
        }
        const fetchUserByIdUri = getBaseUri() + '/api/v1/users/' + userId;
        const response = await fetch(fetchUserByIdUri, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        updateUserDetailsUI(data);
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}

function updateUserDetailsUI(userData) {
    document.getElementById('userName').innerText = userData.name;
    document.getElementById('userEmail').innerText = userData.email;
    document.getElementById('userMobile').innerText = userData.mobileNo;
}

function hideUpdatePassword(){
    document.getElementById('updatePasswordForm').style.display='none'
}
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear();
    alert('You have been logged out.');
    window.location.href = '../html/index.html';
});


window.addEventListener('load', function() {
    checkJWT();
    fetchUserDetails();
    hideUpdatePassword();
});


