import { checkJWT, getBaseUri } from './utils.js';



const loginRole = localStorage.getItem('loginRole'); 
const packageId = localStorage.getItem('packageId');

let testsInPackage = []; 
let packageDetails = {};

async function fetchPackage(){
    const fetchPackageByIdUri = getBaseUri() + '/api/v1/packages/'  + packageId;
    const response = await fetch(fetchPackageByIdUri);
    const data = await response.json();
    packageDetails = data.packageData;
    testsInPackage = data.tests;
}

document.getElementById('add-test-btn').addEventListener('click', () => {
    document.getElementById('search-modal').style.display = 'flex';
});


window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('search-modal')) {
        document.getElementById('search-modal').style.display = 'none';
    }
});


async function searchTests(query) {
    const searchTestUri = getBaseUri() + '/api/v1/tests/search?title=' + query;
    const response = await fetch(searchTestUri);
    const data = await response.json();
    return data; 
}


document.getElementById('search-btn').addEventListener('click', async () => {
    const searchQuery = document.getElementById('search-input').value;
    const tests = await searchTests(searchQuery);
  
    displaySearchResults(tests);
});


function displaySearchResults(tests) {
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = ''; 
    tests.forEach(test => {
        const listTest = document.createElement('li');
        listTest.textContent = test.title;
        listTest.addEventListener('click', () => addTestToPackage(test));
        searchResultsContainer.appendChild(listTest);
    });
}

async function addTestToPackage(test) {
    const addTestToPackageUri = getBaseUri() + '/api/v1/packages/' + packageId + '/tests/' + test.id
    const response = await fetch(addTestToPackageUri, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ })
    });

    if (response.ok) {
        testsInPackage.push(test);
        document.getElementById('search-modal').style.display = 'none';
        renderTests();
    } else {
        alert('Failed to add test');
    }
}


async function removeTestFromPackage(index) {
    const testId = testsInPackage[index].id;
    const removeTestFromPackageUri = getBaseUri() + '/api/v1/packages/' + packageId + '/tests/' + testId; 
    const response = await fetch(removeTestFromPackageUri, {
        method: 'DELETE',
    });

    if (response.ok) {
        testsInPackage.splice(index, 1);
        renderTests();
    } else {
        alert('Failed to remove test');
    }
}


function renderTests() {
    const testsList = document.getElementById('tests-list');
    testsList.innerHTML = ''; 

    testsInPackage.forEach((test, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${test.title}</td>
            <td>${test.description}</td>
            <td>₹${test.price}</td>
            <td>${test.discount}%</td>
            <td class="action_test_value" style="display: none;">
               <button onclick="removeTestFromPackage(${index})">Delete</button>
            </td>
        `;
        testsList.appendChild(row);
    });
    
    if (loginRole === 'ADMIN') {
        const actionCells = document.querySelectorAll('.action_test_value');
        actionCells.forEach(actionCell => {
            actionCell.style.display = 'block';  
        });

        const discountCells = document.querySelectorAll('.action_test_header');
        discountCells.forEach(discountCell => {
            discountCell.style.display = 'block';  
        });
    }

}


async function initPackageDetails() {
    await fetchPackage();
    const totalPrice = packageDetails.price - (packageDetails.price * packageDetails.discount)/100;

    const packageDetailsDoc = document.getElementById('package_detail_container');
    packageDetailsDoc.innerHTML = `
        <p class="package-title"><strong>Title:</strong> ${packageDetails.title} </p>
        <p class="package-description"><strong>Description: </strong> ${packageDetails.description}</p>
        <p class="package-price"><strong>Price: </strong> ${packageDetails.price}</p>
        <p class="package-discount"><strong>Discount: </strong> ${packageDetails.discount}%</p>
        <p class="total-price"><strong>Total Price: </strong>${totalPrice}</p>
    `; 
    
    if (loginRole === 'ADMIN') {
        document.getElementById('edit-package-btn').style.display = 'inline'; 
        document.getElementById('add-test-btn').style.display = 'inline'; 
    }
    
    renderTests();
}

document.getElementById('edit-package-btn').addEventListener('click', () => {
    localStorage.setItem("package_details", JSON.stringify(packageDetails));
    window.location.href = "../html/update_packages.html"; 
});


window.fetchPackage = fetchPackage;
window.searchTests = searchTests;
window.displaySearchResults = displaySearchResults;
window.addTestToPackage = addTestToPackage;
window.removeTestFromPackage = removeTestFromPackage;
window.renderTests = renderTests;
window.initPackageDetails = initPackageDetails;

checkJWT();
initPackageDetails();
