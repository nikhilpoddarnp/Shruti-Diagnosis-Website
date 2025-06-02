import { checkJWT, getBaseUri } from './utils.js';

const apiEndpoint = getBaseUri() + '/api/v1/request-call'; 

async function fetchRequestCalls() {
    checkJWT();
    const response = await fetch(apiEndpoint); 
    const data = await response.json();
    return data;
}
  
  
function renderTable(calls) {
  const tableBody = document.querySelector("#requestCallTable tbody");
  tableBody.innerHTML = ''; 
   
  
  calls.forEach((call, index) => {
    const row = document.createElement('tr');
    row.setAttribute('data-id', call.id);
      
    const idCell = document.createElement('td');
    idCell.textContent = index + 1;
    row.appendChild(idCell);
  
      
    const nameCell = document.createElement('td');
    nameCell.innerHTML = `<span class="editable" data-field="name">${call.name}</span>`;
    row.appendChild(nameCell);
  
      
    const mobileCell = document.createElement('td');
    mobileCell.innerHTML = `<span class="editable" data-field="mobileNo">${call.mobileNo}</span>`;
    row.appendChild(mobileCell);
  
    const commentCell = document.createElement('td');
    commentCell.innerHTML = `<span class="editable" data-field="comment">${call.comment}</span>`;
    row.appendChild(commentCell);
  
      
    const statusCell = document.createElement('td');
    statusCell.innerHTML = `<span class="editable" data-field="status">
        ${call.status === 'OPEN' ? 'Open' : 'Connected'}
    </span>`;
    row.appendChild(statusCell);
  
      
    const actionCell = document.createElement('td');
    actionCell.innerHTML = `
      <button class="edit" onclick="editRequestCall('${call.id}')">Edit</button>
    `;
    row.appendChild(actionCell);
  
    tableBody.appendChild(row);
  });
}
  
  
  async function editRequestCall(id) {
    checkJWT();
    const row = document.querySelector(`#requestCallTable tbody tr[data-id="${id}"]`);
    const call = await getRequestCallById(id);
    row.querySelectorAll('.editable').forEach((span) => {
      const field = span.dataset.field;
      const value = call[field];
      if(field === 'status' ){
        span.innerHTML = `
            <select id="status-${id}">
                <option value="OPEN" ${value === 'OPEN' ? 'selected' : ''}>Open</option>
                <option value="CONNECTED" ${value === 'CONNECTED' ? 'selected' : ''}>Connected</option>
            </select>
        `
      } else  {
        span.innerHTML = `<input type="text" value="${value}" data-field="${field}">`;
      }
      
    });
  
    const actionCell = row.querySelector('td:last-child');
    actionCell.innerHTML = `
      <button class="save" onclick="updateRequestCall('${id}')">Save</button>
      <button class="cancel" onclick="cancelEdit('${id}')">Cancel</button>
    `;
  }
  
 
  async function updateRequestCall(id) {
    checkJWT();
    const row = document.querySelector(`#requestCallTable tbody tr[data-id="${id}"]`);
    const call = getRequestCallById(id);  
  
    row.querySelectorAll('input').forEach((input) => {
      const field = input.dataset.field;
      call[field] = input.value;
    });

    const status = document.getElementById('status-' + id).value;
   
    call.status = status;
    
    const response = await fetch(apiEndpoint + "/" + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(call)
    });

    const updatedTest = await response.json();
    
    
    window.location.href = "../html/display_request_call.html";
  }
  
  
  function cancelEdit(id) {
    window.location.href = "../html/display_request_call.html";
  }
  
  
  async function getRequestCallById(id) {
    const response = await fetch(apiEndpoint + "/" + id);
    const call = await response.json();
    return call;
  }

  async function  filterTable() {
    checkJWT();
    const statusFilter = document.getElementById('statusFilter').value.toLowerCase();
    let requestCalls = await fetchRequestCalls();
    if(statusFilter && statusFilter !== '' && statusFilter !== 'all'){
        requestCalls = requestCalls.filter(requestCall => requestCall.status.toLowerCase().includes(statusFilter.toLowerCase()));
    }
    
    renderTable(requestCalls);
  }
  

  window.fetchRequestCalls = fetchRequestCalls;
  window.renderTable = renderTable;
  window.editRequestCall = editRequestCall;
  window.updateRequestCall = updateRequestCall;
  window.cancelEdit = cancelEdit;
  window.getRequestCallById = getRequestCallById;
  window.filterTable = filterTable;



  filterTable();
  