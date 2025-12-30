import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirPath = path.dirname(__fileName);

export function getEvents() {
    const events = fs.readFileSync(path.join(__dirPath, '../data/events.json'), 'utf-8');
    return JSON.parse(events);
}

export function createEvent(eventToAdd) {
    const events = fs.readFileSync(path.join(__dirPath, '../data/events.json'), 'utf-8');
    let eventsJSON = JSON.parse(events);
    let eventMaxId = eventsJSON.findLast((e) => e.id);
    let event = {
        id: eventMaxId.id + 1,
        title: eventToAdd.eventTitle,
        description: eventToAdd.eventDescription,
        category: eventToAdd.eventCategory,
        location: eventToAdd.eventLocation,
        startTime: eventToAdd.eventStartTime,
        endTime: eventToAdd.eventEndTime
    };
    eventsJSON.push(event);
    let result = fs.writeFileSync(path.join(__dirPath, '../data/events.json'), JSON.stringify(eventsJSON), 'utf-8')
    return (result);
}