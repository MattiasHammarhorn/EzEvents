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
    eventToAdd.id = Math.max(...eventsJSON.map((e) => e.id), 0) + 1;

    var validationResult = validateEvent(eventToAdd);
    
    eventsJSON.push(eventToAdd);
    let result = fs.writeFileSync(path.join(__dirPath, '../data/events.json'), JSON.stringify(eventsJSON), 'utf-8')
    return (result);
}

export function validateString(fieldName, stringToValidate, min = null, max = null, isRequired = false) {
    if (isRequired && (fieldName == '' || fieldName == undefined)) {
        return { success: false, message: `${fieldName} is required.\n` };
    }
    if ((min != null && stringToValidate.length < min) ||
        (max != null && stringToValidate.length > max)) {
        return { success: false, message: `${fieldName} must be between ${min}-${max} letters.\n` };
    }
    return { success: true, message: null };
}

export function validateEvent(event) {
    var isValid = true;
    let errorMsg = [];
    
    let validationResult = validateString('Title', event.title, 2, 50, true);
    if (!validationResult.success) {
        errorMsg.push(validationResult.message);
        isValid = false;
    }

    validationResult = validateString('Description', event.description, null, 1000, true);
    if (!validationResult.success) {
        errorMsg.push(validationResult.message);
        isValid = false;
    }

    validationResult = validateString('Category', event.category, 2, 50, true);
    if (!validationResult.success) {
        errorMsg.push(validationResult.message);
        isValid = false;
    }

    validationResult = validateString('Location', event.location, 2, 50, true);
    if (!validationResult.success) {
        errorMsg.push(validationResult.message);
        isValid = false;
    }

    if (event.startTime == '') {
        errorMsg.push('Start Time is required.\n');
        isValid = false;
    }

    if (event.endTime == '') {
        errorMsg.push('End Time is required.\n');
        isValid = false;
    } else if (event.startTime != null && event.endTime < event.startTime) {
        errorMsg.push('End Time cannot be earlier than Start Time.\n');
        isValid = false;
    }

    if (isValid == false) {
        var x = new Error(`Validation error: ${errorMsg}`);
        throw x;
    } else {
        return true;
    }
}