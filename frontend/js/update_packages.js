import { checkJWT, getBaseUri } from './utils.js';

document.getElementById('updatePackageForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const imageFile = document.getElementById('image').files[0];
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const discount = document.getElementById('discount').value;
    const isActive = document.getElementById('isActive').checked;

    function saveImage(){
        if(!imageFile){
            return "";
        }
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadImageUri = getBaseUri + '/api/v1/image/home/upload';
        const responseJson = fetch(uploadImageUri, {
            method: 'put',
            body: formData
        }).then(response => response.json()).catch(error => {
            alert('An error occurred: ' + error.message);
        });

        return responseJson.imagePath;
    }

    async function updatePackage(){
        const imagePath = saveImage();
        const packageData = {
            title: title,
            description: description,
            price: price,
            discount: discount,
            isActive: isActive,
        };
        if(imagePath !== ''){
            packageData.image = imagePath;
        }
        const packageId = localStorage.getItem('packageId');

        try {
            const updatePackageuri = getBaseUri() + '/api/v1/packages/' + packageId;
            const response = await fetch(updatePackageuri, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(packageData)
            });
            const packageData_1 = await response.json();
            
            if (packageData_1.id) {
                
                window.location.href = "../html/package_details.html";
            } else {
                alert('Failed to create package');
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    }

    updatePackage();
});


document.getElementById('cancelButton').addEventListener('click', function() {
    window.location.href = "../html/package_details.html"; 
});

function fillExistingDetails(){
    const packageDetails = localStorage.getItem("package_details");
    const packageDetailJson = JSON.parse(packageDetails);
    

    document.getElementById('title').value = packageDetailJson.title;
    document.getElementById('description').value = packageDetailJson.description;
    document.getElementById('price').value = packageDetailJson.price;
    document.getElementById('discount').value = packageDetailJson.discount;
    document.getElementById('isActive').checked = packageDetailJson.isActive;
    

}

checkJWT();
fillExistingDetails();