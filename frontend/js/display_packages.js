import { checkJWT, getBaseUri } from './utils.js';


async function fetchPackages() {
    checkJWT();
    const packageApiUrl = getBaseUri() + '/api/v1/packages';
    const packages = await fetch(packageApiUrl)
    .then(response => response.json())
    .catch(error => console.error('Error fetching data:', error));
    return packages;
}

function renderTable(packages) {
    const tableBody = document.querySelector('#packageTable tbody');
    tableBody.innerHTML = ''; 

    packages.forEach((pkg, index) => {
        const baseUri = getBaseUri();
        const imageUri = baseUri + "/api/v1/image/" + pkg.image;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td onclick="viewPackage('${pkg.id}')">${index + 1}</td>
            <td onclick="viewPackage('${pkg.id}')">${pkg.title}</td>
            <td onclick="viewPackage('${pkg.id}')">${pkg.description}</td>
            <td onclick="viewPackage('${pkg.id}')">${pkg.isActive ? 'Active' : 'Inactive'}</td>
            <td onclick="viewPackage('${pkg.id}')">₹${pkg.price}</td>
            <td onclick="viewPackage('${pkg.id}')">${pkg.discount}%</td>
            <td onclick="viewPackage('${pkg.id}')"><img src="${imageUri}" alt="${pkg.title}" width="50" height="50"></td> 
            <td><button class="delete" onclick="deletePackage('${pkg.id}')">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

async function filterTable() {
    checkJWT();
    const titleFilter = document.getElementById('titleFilter').value.toLowerCase();
    const isActiveFilter = document.getElementById('isActiveFilter').checked;

    let packages = await fetchPackages();
    packages = packages.filter(pkg => pkg.isActive === isActiveFilter);
    
    if(titleFilter && titleFilter !== ''){
        packages = packages.filter(pkg => pkg.title.toLowerCase().includes(titleFilter.toLowerCase()));
    }

    renderTable(packages);
}


function viewPackage(id) {
    checkJWT();
    localStorage.setItem('packageId', id);
    window.location.href = "../html/package_details.html"; 
}


function deletePackage(id) {
    checkJWT();
    fetch(packageApiUrl + "/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        
        window.location.href = "../html/display_packages.html";
    })
    .catch(error => {
        console.error('Error:', error);
    });
   
}

window.fetchPackages = fetchPackages;
window.renderTable = renderTable;
window.filterTable = filterTable;
window.viewPackage = viewPackage;
window.deletePackage = deletePackage;

filterTable();