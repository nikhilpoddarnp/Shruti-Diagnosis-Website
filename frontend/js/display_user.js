import { checkJWT, getBaseUri } from './utils.js';


async function fetchUsers() {
    try {
        const fetchUsersUri = getBaseUri() + '/api/v1/users';
        const response = await fetch(fetchUsersUri);
        
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
      
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function display(){
    const users = await fetchUsers();
    renderUserTable(users);
} 
  
function renderUserTable(users) {
  const tableBody = document.querySelector("#users-table tbody");
  tableBody.innerHTML = ''; 
   
  
  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.setAttribute('data-id', user.id);
      
    const idCell = document.createElement('td');
    idCell.textContent = index + 1;
    row.appendChild(idCell);
  
      
    const nameCell = document.createElement('td');
    nameCell.innerHTML = `<span class="editable" data-field="name" onclick="userDetails('${user.id}')">${user.name}</span>`;
    row.appendChild(nameCell);
  
      
    const emailCell = document.createElement('td');
    emailCell.innerHTML = `<span class="editable" data-field="email" onclick="userDetails('${user.id}')">${user.email}</span>`;
    row.appendChild(emailCell);
  
      
    const phoneCell = document.createElement('td');
    phoneCell.innerHTML = `<span class="editable" data-field="mobileNo" onclick="userDetails('${user.id}')">${user.mobileNo}</span>`;
    row.appendChild(phoneCell);
  
    const roleCell = document.createElement('td');
    roleCell.innerHTML = `<span class="editable" data-field="role" onclick="userDetails('${user.id}')">${user.role}</span>`;
    row.appendChild(roleCell);
      
    const actionCell = document.createElement('td');
    actionCell.innerHTML = `
      <button class="edit" onclick="editUser('${user.id}')">&#9998;</button>
      <button class="delete" onclick="deleteUser('${user.id}')">&#10060;</button>
    `;
    row.appendChild(actionCell);
  
    tableBody.appendChild(row);
  });
}

async function editUser(id) {
    checkJWT();
    const row = document.querySelector(`#users-table tbody tr[data-id="${id}"]`);
    const user = await getUserById(id);

    row.querySelectorAll('.editable').forEach((span) => {
      span.onclick = null;
      const field = span.dataset.field;
      const value = user[field];
      if(field !== 'email' && field !== 'role'){
        span.innerHTML = `
            <input type="text" value="${value}" data-field="${field}">
        `;
      }
     
    });
  
    const actionCell = row.querySelector('td:last-child');
    actionCell.innerHTML = `
      <button class="save" onclick="updateUser('${id}')">Save</button>
      <button class="cancel" onclick="cancelEdit('${id}')">Cancel</button>
    `;
}

async function getUserById(id) {
    const fetchuserByIdUri = getBaseUri() + '/api/v1/users/' + id;
    const response = await fetch(fetchuserByIdUri);
    const user = await response.json();
    return user;
}

async function updateUser(id) {
      checkJWT();
      const row = document.querySelector(`#users-table tbody tr[data-id="${id}"]`);
      const user = getUserById(id);  
    
      row.querySelectorAll('input').forEach((input) => {
        const field = input.dataset.field;
        user[field] = input.value;
      });
    
      const updateUserByIdUri = getBaseUri() + '/api/v1/users/' + id;
      const response = await fetch(updateUserByIdUri, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
    
      
      const updatedUser = await response.json();
    
      
      window.location.href = "../html/display_users.html";
}
  
async function deleteUser(id) {
    const deleteUserByIdUri = getBaseUri() + '/api/v1/users/' + id;
    await fetch(deleteUserByIdUri, {
      method: 'DELETE',
    });
  
    window.location.href = "../html/display_users.html";
    
}

function cancelEdit(id) {
    window.location.href = "../html/display_users.html";
}
  
async function  filterTable() {
    checkJWT();
    const emaiPhoneFilter = document.getElementById('emaiPhoneFilter').value.toLowerCase();
    
    let users = await fetchUsers();
    
    if(emaiPhoneFilter && emaiPhoneFilter !== ''){
        users = users.filter(
            user => user.email.toLowerCase().includes(emaiPhoneFilter.toLowerCase()) || 
            String(user.mobileNo).includes(emaiPhoneFilter)
        );
    }
    
    renderUserTable(users);
}

function userDetails(id){
    localStorage.setItem("userId", id);
    window.location.href = "../html/user_details.html";
}

window.fetchUsers = fetchUsers;
window.renderUserTable = renderUserTable;
window.editUser = editUser;
window.getUserById = getUserById;
window.updateUser = updateUser;
window.deleteUser = deleteUser;
window.cancelEdit = cancelEdit;
window.display = display;
window.filterTable = filterTable;
window.userDetails = userDetails;


window.onload  = function() { 
    checkJWT();
    display();
}