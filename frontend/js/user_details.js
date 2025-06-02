import { checkJWT, getUserId, getBaseUri } from './utils.js';

let appointmentDatas = [];
const loginUserRole = localStorage.getItem('loginRole');

async function getUser(){
    let userId = getUserId();
    const fetchUserByIdUri = getBaseUri() + '/api/v1/users/' + userId;
    const response = await fetch(fetchUserByIdUri);
        
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    const data = await response.json();
    return data;
}

async function fetchAppointments() {
    try {
        const userId = getUserId();

        const token = localStorage.getItem('token');
        
        const headers = {
            'authorization': token
        };
        
        const fetchAppointmentsForUserUri = getBaseUri() + '/api/v1/appointments/users/' + userId;
        const response = await fetch(fetchAppointmentsForUserUri, {
            method: 'GET', 
            headers: headers 
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch appointments');
        }

        const data = await response.json();
        appointmentDatas = data;
        displayAppointments(data);
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

function displayAppointments(appointments) {
    const tableBody = document.getElementById('appointments-body');
    tableBody.innerHTML = '';

    appointments.sort((a, b) => {
        const dateA = new Date(a.appointmentDTM);
        const dateB = new Date(b.appointmentDTM);
        return dateB - dateA;
    });

    appointments.forEach((appointment, index) => {
        const reportUrl = getBaseUri() + "/api/v1/appointments/" + appointment.reportUrl + "/download-report";
        const localDTM = convertToLocalDTM(appointment.appointmentDTM);
        const statusOptions = ['OPEN', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
        
        const row = document.createElement('tr');
        const idTd = document.createElement('td');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${localDTM}</td>
            <td contenteditable="false" id="desc-${appointment.id}">${appointment.description}</td>
            <td>
                <select id="status-${appointment.id}" disabled>
                    ${statusOptions.map(status => {
                        if (loginUserRole === 'USER' && (status === 'CANCELLED' || status === 'OPEN') ) {
                           
                            return `<option value="${status}"  ${status === appointment.status ? 'selected' : ''}>${status}</option>`;
                        }
                        if(loginUserRole === 'ADMIN'){
                            return `<option value="${status}" ${status === appointment.status ? 'selected' : ''}>${status}</option>`;
                        }
                    }).join('')}
                </select>
            </td>
            <td>
                <!-- Report Column -->
                <!-- Report Column -->
                ${appointment.reportUrl ? 
                    `<a href="${reportUrl}" target="_blank">Download Report</a>` + 
                    (loginUserRole === 'ADMIN' ? 
                        `<button onclick="deleteReport('${appointment.id}')">Delete Report</button>` 
                        : '') 
                    : 
                    (loginUserRole === 'ADMIN' ? 
                        `<button onclick="uploadReport('${appointment.id}')">Upload Report</button>` 
                        : 
                        'No Report Available')
                }
            </td>
            <td>
                <button id="edit-${appointment.id}" onclick="enableEdit('${appointment.id}')">Edit</button>
                <button id="save-${appointment.id}" style="display:none;" onclick="updateAppointment('${appointment.id}')">Save</button>
                <button id="cancle-${appointment.id}" style="display:none;" onclick="cancleAppointment('${appointment.id}')">Cancle</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function enableEdit(appointmentId) {
    document.getElementById(`save-${appointmentId}`).style.display = 'inline';
    document.querySelector(`#desc-${appointmentId}`).setAttribute('contenteditable', 'true');
    document.getElementById(`status-${appointmentId}`).removeAttribute('disabled'); 
    document.querySelector(`#save-${appointmentId}`).setAttribute('onclick', `updateAppointment('${appointmentId}')`);
    document.querySelector(`#save-${appointmentId}`).textContent = 'Save'; 
    document.querySelector(`#edit-${appointmentId}`).style.display = 'none'; 
    document.querySelector(`#cancle-${appointmentId}`).setAttribute('onclick', `cancleAppointment('${appointmentId}')`);
    document.querySelector(`#cancle-${appointmentId}`).textContent = 'cancle'; 
}

function updateAppointment(appointmentId) {
    
    const description = document.getElementById(`desc-${appointmentId}`).innerText;
    const status = document.getElementById(`status-${appointmentId}`).value;

    const appointmentData = {
        description,
        status
    };

    
    const updateAppointmentUri = getBaseUri() + '/api/v1/appointments/' + appointmentId;
    fetch(updateAppointmentUri, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
    })
    .then(response => response.json())
    .then(updatedAppointment => {
        
        fetchAppointments();
    })
    .catch(error => {
        console.error('Error updating appointment:', error);
    });
}

function cancleAppointment(appointmentId) {
    fetchAppointments();
}

function filterAppointments() {
    const filterValue = document.getElementById('status-filter').value;
    let filteredAppointments;

    if (filterValue === 'ALL') {
        filteredAppointments = appointmentDatas;
    } else {
        filteredAppointments = appointmentDatas.filter(appointment => appointment.status === filterValue);
    }

    displayAppointments(filteredAppointments);
}

function convertToLocalDTM(isoDTM) {
    const date = new Date(isoDTM);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
    };

    const formattedDateTimeInIST = date.toLocaleString('en-IN', options);
    return formattedDateTimeInIST;
}


async function initUserDetails() {
    let user = await getUser();

    const packageDetailsDoc = document.getElementById('user_detail_container');
    packageDetailsDoc.innerHTML = `
        <p class="user-name"><strong>Name:</strong> ${user.name} </p>
        <p class="user-email"><strong>Email: </strong> ${user.email}</p>
        <p class="user-phone"><strong>Phone: </strong> ${user.mobileNo}</p>
        <p class="user-role"><strong>Role: </strong> ${user.role}</p>
    `; 
    
}

document.getElementById('edit-user-btn').addEventListener('click', () => {
    window.location.href = "../html/update_user.html"; 
});


function uploadReport(appointmentId) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/pdf';
    fileInput.onchange = async () => {
        const file = fileInput.files[0];
        if (file && file.type === 'application/pdf') {
            await uploadPdfToServer(file, appointmentId);
        } else {
            alert('Please upload a valid PDF file.');
            window.location.href = "../html/user_details.html";
        }
    };
    fileInput.click();
}

async function uploadPdfToServer(file, appointmentId) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('appointmentId', appointmentId);
    
    const updateReportUri = getBaseUri() + "/api/v1/appointments/" + appointmentId + "/upload-report";

    try {
        const response = await fetch(updateReportUri, {
            method: 'PUT',
            body: formData,
        });
        if (response.ok) {
            alert('Report uploaded successfully!');
            window.location.href = "../html/user_details.html";
        } else {
            alert('Failed to upload report');
            window.location.href = "../html/user_details.html";
        }
    } catch (error) {
        console.error('Error uploading report:', error);
        alert('Error uploading report.');
        window.location.href = "../html/user_details.html";
    }
}

function deleteReport(appointmentId){
    if (confirm("Are you sure you want to delete this report?")) {
        const deleteReportUri = getBaseUri() + "/api/v1/appointments/" + appointmentId + "/delete-report";
        fetch(deleteReportUri, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            alert("Report deleted successfully.");
            window.location.href = "../html/display_appointment.html";
        })
        .catch(error => {
            alert("Error deleting report." + error.message);
            window.location.href = "../html/display_appointment.html";
        });
    }
}

window.fetchAppointments = fetchAppointments;
window.displayAppointments = displayAppointments;
window.enableEdit = enableEdit;
window.updateAppointment = updateAppointment;
window.filterAppointments = filterAppointments;
window.filterAppointments = filterAppointments;
window.convertToLocalDTM = convertToLocalDTM;
window.cancleAppointment = cancleAppointment;
window.uploadReport = uploadReport;
window.uploadPdfToServer = uploadPdfToServer;

window.onload = function() {
    checkJWT();
    initUserDetails();
    fetchAppointments();
}
