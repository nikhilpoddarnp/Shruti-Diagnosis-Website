import { checkJWT, getBaseUri } from './utils.js';

async function fetchTests() {
    checkJWT();
    const fetchTestUri = getBaseUri() + '/api/v1/tests';
    const response = await fetch(fetchTestUri); 
    const data = await response.json();
    return data;
}
  
  
function renderTable(tests) {
  const tableBody = document.querySelector("#testTable tbody");
  tableBody.innerHTML = ''; 
   
  
  tests.forEach((test, index) => {
    const row = document.createElement('tr');
    row.setAttribute('data-id', test.id);
      
    const idCell = document.createElement('td');
    idCell.textContent = index + 1;
    row.appendChild(idCell);
  
      
    const titleCell = document.createElement('td');
    titleCell.innerHTML = `<span class="editable" data-field="title">${test.title}</span>`;
    row.appendChild(titleCell);
  
      
    const descriptionCell = document.createElement('td');
    descriptionCell.innerHTML = `<span class="editable" data-field="description">${test.description}</span>`;
    row.appendChild(descriptionCell);
  
    const activeCell = document.createElement('td');
    activeCell.innerHTML = `<span class="editable" data-field="isActive">${test.isActive ? 'Active' : 'Inactive'}</span>`;
    row.appendChild(activeCell);
  
      
    const priceCell = document.createElement('td');
    priceCell.innerHTML = `<span class="editable" data-field="price">₹${test.price}</span>`;
    row.appendChild(priceCell);
  
    const discountCell = document.createElement('td');
    discountCell.innerHTML = `<span class="editable" data-field="discount">${test.discount}%</span>`;
    row.appendChild(discountCell);
  
    
    const baseUri = getBaseUri();
    const imageUri = baseUri + "/api/v1/image/" + test.image;

    const imageCell = document.createElement('td');
    const image = document.createElement('img');
    image.src = imageUri;
    image.alt = test.title;
    image.width = 50;
    image.height = 50;
    imageCell.appendChild(image);
    row.appendChild(imageCell);
  
      
    const actionCell = document.createElement('td');
    actionCell.innerHTML = `
      <button class="edit" onclick="editTest('${test.id}')">Edit</button>
      <button class="delete" onclick="deleteTest('${test.id}')">Delete</button>
    `;
    row.appendChild(actionCell);
  
    tableBody.appendChild(row);
  });
}
  
  
  async function editTest(id) {
    checkJWT();
    const row = document.querySelector(`#testTable tbody tr[data-id="${id}"]`);
    const test = await getTestById(id);
    row.querySelectorAll('.editable').forEach((span) => {
      const field = span.dataset.field;
      const value = test[field];
  
      span.innerHTML = `
        <input type="text" value="${value}" data-field="${field}">
      `;
    });
  
    const actionCell = row.querySelector('td:last-child');
    actionCell.innerHTML = `
      <button class="save" onclick="updateTest('${id}')">Save</button>
      <button class="cancel" onclick="cancelEdit('${id}')">Cancel</button>
    `;
  }
  
 
  async function updateTest(id) {
    checkJWT();
    const row = document.querySelector(`#testTable tbody tr[data-id="${id}"]`);
    const test = getTestById(id);  
  
    row.querySelectorAll('input').forEach((input) => {
      const field = input.dataset.field;
      test[field] = input.value;
    });
  
    const updateTestUri = getBaseUri() + '/api/v1/tests/' + id;
    const response = await fetch(updateTestUri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(test)
    });
    
    
    const updatedTest = await response.json();
  
    
    window.location.href = "../html/display_tests.html";
  }
  
  
  function cancelEdit(id) {
    window.location.href = "../html/display_tests.html";
  }
  
  async function deleteTest(id) {
    const deleteTestUri = getBaseUri() + '/api/v1/tests/' + id;
    await fetch(deleteTestUri, {
      method: 'DELETE',
    });
  
    window.location.href = "../html/display_tests.html";
    
  }
  
  
  async function getTestById(id) {
    const fetchTestByIdUri = getBaseUri() + '/api/v1/tests/' + id;
    const response = await fetch(fetchTestByIdUri);
    const test = await response.json();
    return test;
  }

  async function  filterTable() {
    checkJWT();
    const titleFilter = document.getElementById('titleFilter').value.toLowerCase();
    const isActiveFilter = document.getElementById('isActiveFilter').checked;
    
    let tests = await fetchTests();
    tests = tests.filter(test => test.isActive === isActiveFilter);
        
    if(titleFilter && titleFilter !== ''){
        tests = tests.filter(test => test.title.toLowerCase().includes(titleFilter.toLowerCase()));
    }
    
    renderTable(tests);
  }
  

  window.fetchTests = fetchTests;
  window.renderTable = renderTable;
  window.editTest = editTest;
  window.updateTest = updateTest;
  window.cancelEdit = cancelEdit;
  window.deleteTest = deleteTest;
  window.getTestById = getTestById;
  window.filterTable = filterTable;


  filterTable();
  