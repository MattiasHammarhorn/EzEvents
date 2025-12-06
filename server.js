import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { getEvents } from './src/eventService.js';

const app = express();
const port = 3000;

const __fileName = fileURLToPath(import.meta.url);
const __dirPath = path.dirname(__fileName);

app.use(express.static(path.join(__dirPath, 'public')));

app.get('/api/events/', (req, res) => {
    const events = getEvents();
    res.send(events);
})

app.listen(port, () => {
    console.log(`Example app listening on 'http://localhost:${port}'!`);
});