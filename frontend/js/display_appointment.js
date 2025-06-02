import { checkJWT, getBaseUri } from './utils.js';

let appointmentDatas = [];
const loginUserRole = localStorage.getItem('loginRole');

async function fetchAppointments() {
    try {
        const loginUserId = localStorage.getItem('loginUserId');
        const token = localStorage.getItem('token');
        
        const headers = {
            'Authorization': token
        };
        const fetchAppointmentsUri = getBaseUri() + '/api/v1/appointments';
        const response = await fetch(fetchAppointmentsUri, {
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
            <td contenteditable="true" id="desc-${appointment.id}">${appointment.description}</td>
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
       
        window.location.href = "../html/display_appointment.html";
    })
    .catch(error => {
        console.error('Error updating appointment:', error);
        window.location.href = "../html/display_appointment.html";
    });
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
            window.location.href = "../html/display_appointment.html";
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
            window.location.href = "../html/display_appointment.html";
        } else {
            alert('Failed to upload report');
            window.location.href = "../html/display_appointment.html";
        }
    } catch (error) {
        console.error('Error uploading report:', error);
        alert('Error uploading report.');
        window.location.href = "../html/display_appointment.html";
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
window.uploadReport = uploadReport;
window.uploadPdfToServer = uploadPdfToServer;
window.deleteReport = deleteReport;

window.onload = function() {
    checkJWT();
    fetchAppointments();
}
