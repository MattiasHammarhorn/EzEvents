// const events = [
//     {id: '1', title: 'Title 1', category: 'Education', startTime: new Date('2025-11-15T12:00'), endTime: new Date('2025-11-15T19:00'), location: 'Location 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', imgUrl: 'img/pexels-wendywei-1190297.jpg'},
//     {id: '2', title: 'Title 2', category: 'Festivals', startTime: new Date('2025-11-17T10:00'), endTime: new Date('2025-11-21T16:00'), location: 'Location 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', imgUrl: 'img/pexels-wendywei-1190297.jpg'},
//     {id: '3', title: 'Title 3', category: 'Food & drinks', startTime: new Date('2025-11-22T19:00'), endTime: new Date('2025-11-22T22:00'), location: 'Location 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', imgUrl: 'img/pexels-wendywei-1190297.jpg'}
// ];

async function loadEvents() {
    try {
        const response = await fetch('/api/events');
        if (!response.ok) {
            throw new Error(`Failed to fetch '/api/events'. Status: ${response.response}`);
        }

        const events = await response.json();
        const eventListDiv = document.getElementById('eventList');

        for (let i = 0; i < events.length; i++) {
            eventListDiv.innerHTML += 
                `<div class='eventCard'>
                    <img src='${events[i].imgUrl}'>
                    <h2>${events[i].title}</h2>
                    <p>${new Date(events[i].startTime).toTimeString()} - ${new Date(events[i].endTime).toTimeString()}</p>
                    <p>&#8962; ${events[i].location}</p>
                    <p>${events[i].description}</p>
                </div>`;
        }
    }
    catch (error) {
        console.error(`Error fetching '/api/events', ${error}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
});
