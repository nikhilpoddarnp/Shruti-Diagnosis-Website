import { checkJWT, getBaseUri } from './utils.js';


document.getElementById('createPackageForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData();
    const imageFile = document.getElementById('image').files[0];
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const discount = document.getElementById('discount').value;
    const isActive = document.getElementById('isActive').checked;

    
    formData.append('image', imageFile);

    const uploadImage = getBaseUri() + '/api/v1/image/home/upload';

    fetch(uploadImage, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.imagePath) {
            const imageUrl = data.imagePath;  

            const packageData = {
                title: title,
                description: description,
                price: price,
                discount: discount,
                isActive: isActive,
                image: imageUrl
            };
            
            const loginUserId =  localStorage.getItem('loginUserId');
            const fetchPackagesUri = getBaseUri() + '/api/v1/packages/' + loginUserId;
            return fetch(fetchPackagesUri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(packageData)
            });
        } else {
            throw new Error('Image upload failed');
        }
    })
    .then(response => response.json())
    .then(packageData => {
        
        if (packageData.id) {
            
            window.location.href = "../html/display_packages.html"; 
        } else {
            alert('Failed to create package');
        }
    })
    .catch(error => {
        alert('An error occurred: ' + error.message);
    });
});


checkJWT();