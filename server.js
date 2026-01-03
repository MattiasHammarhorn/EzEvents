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
            title: req.body.eventTitle,
            description: req.body.eventDescription,
            category: req.body.eventCategory,
            location: req.body.eventLocation,
            startTime: req.body.eventStartTime,
            endTime: req.body.eventEndTime
        }
        var result = createEvent(eventToAdd);
        res.status(201).send(result);
    } catch (Error) {
        console.error(`Error fetching: ${url}, ${Error}`);
        res.status(500).send(`Error fetching: ${Error.stack}`);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on 'http://localhost:${port}'!`);
});