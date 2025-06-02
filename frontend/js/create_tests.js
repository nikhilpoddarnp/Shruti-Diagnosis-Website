import { checkJWT, getBaseUri } from './utils.js';

document.getElementById('createTestForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData();
    const imageFile = document.getElementById('image').files[0];
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const discount = document.getElementById('discount').value;
    const isActive = document.getElementById('isActive').checked;

    
    formData.append('image', imageFile);
    const uploadImageUri = getBaseUri() + '/api/v1/image/home/upload';
    fetch(uploadImageUri, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.imagePath) {
            const imageUrl = data.imagePath;  

            const testData = {
                title: title,
                description: description,
                price: price,
                discount: discount,
                isActive: isActive,
                image: imageUrl
            };
            
            const loginUserId =  localStorage.getItem('loginUserId');
            const fetchTestUri = getBaseUri() + '/api/v1/tests/' + loginUserId;
            return fetch(fetchTestUri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testData)
            });
        } else {
            throw new Error('Image upload failed');
        }
    })
    .then(response => response.json())
    .then(testData => {
        
        if (testData.id) {
           
            window.location.href = "../html/display_tests.html"; 
        } else {
            alert('Failed to create test');
        }
    })
    .catch(error => {
        alert('An error occurred: ' + error.message);
    });
});



checkJWT();