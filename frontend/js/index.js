import { getBaseUri } from './utils.js';

let packageData = [];
let testData = [];
let packageCurrentIndex = 0;
let testCurrentIndex = 0;

function fetchData(apiUrl, callback) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error fetching data:', error));
}

function renderPackages(startIndex, data) {
    const topPackagesContainer = document.querySelector('.top-packages');
    const bottomPackagesContainer = document.querySelector('.bottom-packages');

    topPackagesContainer.innerHTML = '';
    bottomPackagesContainer.innerHTML = '';

    for (let i = startIndex; i < startIndex + 4 && i < data.length; i++) {
        const packageSlide = createPackageElement(data[i]);
        topPackagesContainer.appendChild(packageSlide);
    }

    for (let i = startIndex + 4; i < startIndex + 8 && i < data.length; i++) {
        const packageSlide = createPackageElement(data[i]);
        bottomPackagesContainer.appendChild(packageSlide);
    }

    document.querySelector('.package-prev').disabled = startIndex === 0;
    document.querySelector('.package-next').disabled = startIndex + 8 >= data.length;
}

function renderTests(startIndex, data) {
    const topTestsContainer = document.querySelector('.top-tests');
    const bottomTestsContainer = document.querySelector('.bottom-tests');

    topTestsContainer.innerHTML = '';
    bottomTestsContainer.innerHTML = '';

    for (let i = startIndex; i < startIndex + 4 && i < data.length; i++) {
        const testSlide = createTestElement(data[i]);
        topTestsContainer.appendChild(testSlide);
    }

    for (let i = startIndex + 4; i < startIndex + 8 && i < data.length; i++) {
        const testSlide = createTestElement(data[i]);
        bottomTestsContainer.appendChild(testSlide);
    }

    document.querySelector('.test-prev').disabled = startIndex === 0;
    document.querySelector('.test-next').disabled = startIndex + 8 >= data.length;
}

function createPackageElement(pkg) {
    const baseUri = getBaseUri();
    const imageUri = baseUri + "/api/v1/image/" + pkg.image;
    const packageSlide = document.createElement('div');
    packageSlide.classList.add('package');
    packageSlide.innerHTML = `
        <div onclick="savePackageId('${pkg.id}')"> 
          <img src="${imageUri}" alt="${pkg.title}">
          <h3>${pkg.title}</h3>
          <p>${pkg.description}</p>
          <div class="price">₹${pkg.price}</div>
        </div>
    `;
    return packageSlide;
}

function createTestElement(test) {
    const baseUri = getBaseUri();
    const imageUri = baseUri + "/api/v1/image/" + test.image;

    const testSlide = document.createElement('div');
    testSlide.classList.add('test');
    testSlide.innerHTML = `
        <div onclick="saveTestId('${test.id}')"> 
          <img src="${imageUri}" alt="${test.title}">
          <h3>${test.title}</h3>
          <p>${test.description}</p>
          <div class="price">₹${test.price}</div>
        </div>
    `;
    return testSlide;
}

function move(direction, type) {
    const data = type === 'package' ? packageData : testData;
    const currentIndex = type === 'package' ? packageCurrentIndex : testCurrentIndex;

    let newIndex = currentIndex + direction * 8;
    if (newIndex >= 0 && newIndex < data.length) {
        if (type === 'package') {
            packageCurrentIndex = newIndex;
            renderPackages(packageCurrentIndex, data);
        } else {
            testCurrentIndex = newIndex;
            renderTests(testCurrentIndex, data);
        }
    }
}

function fetchPackage(){
    const uri = getBaseUri() + '/api/v1/packages/active';
    fetchData(uri, (data) => {
        packageData = data;
        renderPackages(packageCurrentIndex, packageData);
    });
}


function fetchTest(){
    const uri = getBaseUri() + '/api/v1/tests/active';
    fetchData(uri, (data) => {
        testData = data;
        renderTests(testCurrentIndex, testData);
    });
}

document.querySelector('.package-prev').addEventListener('click', () => move(-1, 'package'));
document.querySelector('.package-next').addEventListener('click', () => move(1, 'package'));

document.querySelector('.test-prev').addEventListener('click', () => move(-1, 'test'));
document.querySelector('.test-next').addEventListener('click', () => move(1, 'test'));


function savePackageId(packageId){
    
    localStorage.setItem('packageId', packageId);
    window.location.href = "../html/package_details.html"; 
  // Page
}

function saveTestId(testId){
  localStorage.setItem('testId', testId);
}


document.getElementById("requestCallForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;

    const requestData = {
        name: name,
        mobileNo: mobile
    };

    const requestCallUri = getBaseUri() + '/api/v1/request-call';
    fetch(requestCallUri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            window.location.href = "../html/index.html"; 
        } else {
            alert("Something went wrong. Please try again.");
        }
    })
    .catch(error => {
        alert("Error: " + error.message);
    });
});

window.addEventListener('load', function() {
    fetchPackage();
    fetchTest();
});