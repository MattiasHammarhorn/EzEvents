import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirPath = path.dirname(__fileName);

export function getEvents() {
    const events = fs.readFileSync(path.join(__dirPath, '../data/events.json'), 'utf-8');
    return JSON.parse(events);
}