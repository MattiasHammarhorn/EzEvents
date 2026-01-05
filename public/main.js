const eventForm = document.getElementById('eventForm');
const eventListDiv = document.getElementById('eventList');

async function loadEvents() {
    try {
        const response = await fetch('/api/events', { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Failed to fetch '/api/events'. Status: ${response.response}`);
        }

        const events = await response.json();
        populateUserList(events);
    } catch (error) {
        console.error(`Error fetching '/api/events', ${error}`);
    }
}

function populateUserList(events) {
    eventListDiv.innerHTML = '';
    for (let i = 0; i < events.length; i++) {
        let eventImgUrl = events[i].imgUrl ? events[i].imgUrl : 'img/no_img.jpg' ;
        eventListDiv.innerHTML += 
            `<div class='eventCard'>
                <img src='${eventImgUrl}'>
                <h2>${events[i].title}</h2>
                <p>${new Date(events[i].startTime).toDateString()} - ${new Date(events[i].endTime).toDateString()}</p>
                <p>&#8962; ${events[i].location}</p>
                <p>${events[i].description}</p>
            </div>`;
    }
}

async function postEvent() {
    if (validateForm()) {
        var formData = new FormData(eventForm);
        let eventToAdd = {
            eventTitle: formData.get('eventTitle'),
            eventDescription: formData.get('eventDescription'),
            eventCategory: formData.get('eventCategory'),
            eventLocation: formData.get('eventLocation'),
            eventStartTime: formData.get('eventStartTime'),
            eventEndTime: formData.get('eventEndTime')
        };
        console.log(formData);

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type':'application/json' },
                body: JSON.stringify(eventToAdd)
            });
            console.log(response);
            if (!response.ok) {
                throw new Error(`Failed to fetch '/api/events'. Status: ${response.response}`);
            }
            loadEvents();
        } catch (error) {
            console.error(`Error fetching '/api/events', ${error}`);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();

    eventForm.addEventListener('submit', (e) => {
        // Since we won't reload the page
        e.preventDefault();
        postEvent();
    });
});

function validateForm() {
    var formData = new FormData(eventForm);
    var isValid = true;
    let titleError = document.getElementById('titleError');
    let descriptionError = document.getElementById('descriptionError');
    let categoryError = document.getElementById('categoryError');
    let locationError = document.getElementById('locationError');

    if (formData.get('eventTitle') == '') {
        titleError.innerHTML = 'Title is required.';
        isValid = false;
    } else if (formData.get('eventTitle').length < 2 || formData.get('eventTitle').length > 50) {
        titleError.innerHTML = 'Title must be between 2-50 letters.';
        isValid = false;
    } else { titleError.innerHTML = ''; }

    if (formData.get('eventDescription') == '') {
        descriptionError.innerHTML = 'Description is required.';
        isValid = false;
    } else if (formData.get('eventDescription').length > 1000) {
        descriptionError.innerHTML = 'Description cannot be longer than 1000 letters.';
        isValid = false;
    } else { descriptionError.innerHTML = ''; }

    if (formData.get('eventCategory') == '') {
        categoryError.innerHTML = 'Category is required.';
        isValid = false;
    } else if (formData.get('eventCategory').length < 2 || formData.get('eventCategory').length > 50) {
        categoryError.innerHTML = 'Category must be between 2-50 letters.';
        isValid = false;
    } else { categoryError.innerHTML = ''; }

    if (formData.get('eventLocation') == '') {
        let locationError = document.getElementById('locationError');
        locationError.innerHTML = 'Location is required.';
        isValid = false;
    } else if (formData.get('eventLocation').length < 2 || formData.get('eventLocation').length > 50) {
        locationError.innerHTML = 'Location must be between 2-50 letters.';
        isValid = false;
    } else { locationError.innerHTML = ''; }

    if (formData.get('eventStartTime') == '') {
        let startTimeError = document.getElementById('startTimeError');
        startTimeError.innerHTML = 'Start Time is required.';
        isValid = false;
    } else { startTimeError.innerHTML = ''; }

    if (formData.get('eventEndTime') == '') {
        let endTimeError = document.getElementById('endTimeError');
        endTimeError.innerHTML = 'End Time is required.';
        isValid = false;
    } else if (formData.get('eventStartTime') != '' && formData.get('eventEndTime') < formData.get('eventStartTime')) {
        let endTimeError = document.getElementById('endTimeError');
        endTimeError.innerHTML = 'End Time cannot be earlier than Start Time.';
        isValid = false;
    } else { endTimeError.innerHTML = ''; }

    return isValid;
}