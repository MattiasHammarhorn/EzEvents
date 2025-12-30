import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { getEvents, createEvent } from './src/eventService.js';

const app = express();
const port = 3000;

const __fileName = fileURLToPath(import.meta.url);
const __dirPath = path.dirname(__fileName);

app.use(express.static(path.join(__dirPath, 'public')));
app.use(express.json());

const url = '/api/events/';

app.get(url, (req, res) => {
    try {
        const events = getEvents();
        console.log("Gettin da events!")
        res.status(200).send(events);
    } catch (Error) {
        console.error(`Error fetching: ${url}, ${Error}`);
    }
})

app.post(url, (req, res) => {
    try {
        const eventToAdd = {
            eventTitle: req.body.eventTitle,
            eventDescription: req.body.eventDescription,
            eventCategory: req.body.eventCategory,
            eventLocation: req.body.eventLocation,
            eventStartTime: req.body.eventStartTime,
            eventEndTime: req.body.eventEndTime
        }
        var result = createEvent(eventToAdd);
        res.status(201).send(result);
    } catch (Error) {
        console.error(`Error fetching: ${url}, ${Error}`);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on 'http://localhost:${port}'!`);
});