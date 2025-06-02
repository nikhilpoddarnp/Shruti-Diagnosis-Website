import { checkJWT, getUserId, getBaseUri } from './utils.js';

document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const appointmentDate = document.getElementById('appointment-date').value;
    const description = document.getElementById('description').value;
    const errorMessage = document.getElementById('error-message');

    
    const currentDate = new Date();
    const selectedDate = new Date(appointmentDate);

    if (!appointmentDate) {
        errorMessage.textContent = "Please fill in all fields.";
        isoDateTimeElement.textContent = "";
        return;
    }

    if (selectedDate <= currentDate) {
        errorMessage.textContent = "Please select a future date and time.";
        isoDateTimeElement.textContent = "";
    } else {
        
        errorMessage.textContent = "";

       
        const isoDateTime = selectedDate.toISOString();

        
        const appointmentData = {
            appointmentDTM: isoDateTime,
            description: description,
        };
       
        submitAppointmentAPI(appointmentData);
    }
});


async function submitAppointmentAPI(data) {
    const userId = getUserId();
   
    const apiUrl = getBaseUri() + "/api/v1/appointments/" + userId;

    await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
       if(localStorage.getItem('loginRole') === 'ADMIN'){
            window.location.href = "../html/display_appointment.html"; 
       } else{
            window.location.href = "../html/user_details.html"; 
       }
        
    })
    .catch((error) => {
        console.error('Error booking appointment:', error);
        alert('Error booking appointment. Please try again.');
        if(localStorage.getItem('loginRole') === 'ADMIN'){
            window.location.href = "../html/display_appointment.html"; 
       } else{
            window.location.href = "../html/user_details.html"; 
       }
    });
}

window.addEventListener('load', function() {
    checkJWT();
    const appointmentDateInput = document.getElementById('appointment-date');
    
    const currentDate = new Date();

    const currentDateTimeString = currentDate.toISOString().slice(0, 16);
    appointmentDateInput.setAttribute('min', currentDateTimeString);
});