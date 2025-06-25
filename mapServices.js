// Import modules
import express from 'express';
import db from './src/assets/database.js';

// Create Express application
const app = express();
// Parse JSON request bodies
app.use(express.json());

// Set to true for annoying (but informative) logging
const debug = false;

// Handle POST request to access pins table
app.post('/api/get-pins', (req, res) => {
    if (debug) {
        console.log('Access pin request:', req.body);
    }
    const pinQuery = `
        SELECT * FROM pins
    `;
    // Set pins to an array of all rows in pins table
    const pins = db.prepare(pinQuery).all();
    res.send(pins);
});

// Handle POST request to insert into pins table
// app.post('/api/create-pin', (req, res) => {
//     console.log('Map services -- insert pin request: ', req.body);
//     const { name, desc, lat, lon, rating, picture, difficulty } = req.body;
//     const pinQuery = `
//         INSERT OR IGNORE INTO pins VALUES (?, ?, ?, ?, ?, ?, ?);
//     `;
//     db.prepare(pinQuery).run(name, desc, lat, lon, rating, picture, difficulty);
//     // NEEDS error handling
//     res.status(200).json({ message: 'Pin successfully inserted into table'});
// });

app.post('/api/create-event', (req, res) => {
    console.log('Map services -- insert event request: ', req.body);
    const {eventID, pinname,date, time, description, password } = req.body;
    const pinQuery = `
        INSERT OR IGNORE INTO events VALUES (?, ?, ?, ?, ?, ?, 0);
    `;
    db.prepare(pinQuery).run(eventID, pinname, date, time, description, password);
    res.status(200).json({ message: 'Event successfully inserted into table'});
});

// Temporary handler for default pin values
app.post('/api/hardcode-pins', (req, res) => {
    if (debug) {
        console.log('Map services -- inserting hardcoded pins: ', req.body);
    }
    const thisQuery = `
        INSERT OR IGNORE INTO pins VALUES ('College & Oleander', 'Test spot 1', '34.210249', '-77.887004', '4', 'https://www.starnewsonline.com/gcdn/authoring/2016/07/30/NSTN/ghows_image-NC-5726a99b-f46d-4e65-bd37-4d9c7d7930b5.jpeg?width=660&height=526&fit=crop&format=pjpg&auto=webp', 'Expert');
        INSERT OR IGNORE INTO pins VALUES ('UNCW', 'Test spot 2', '34.224362', '-77.869558', '5', 'https://uncw.edu/news/media/images/universal/uncw-northeast-entrance-20170818-d703767-news.jpg', 'Beginner');
        INSERT OR IGNORE INTO pins VALUES ('Wrightsville', 'Test spot 3', '34.206377', '-77.795885', '1', 'https://u.realgeeks.media/networkwilmington1/2022blogimages/WrightsvilleBeach.jpeg', 'Hard');
        INSERT OR IGNORE INTO pins VALUES ('Wade Park', 'Test spot 4', '34.179610', '-77.879753', '3', 'https://www.wilmington-nc.com/images/uploads/place/3634/wilmington17-343.jpg', 'Easy');
        INSERT OR IGNORE INTO pins VALUES ('Greenfield', 'Test spot 5', '34.215819', '-77.942528', '3', 'https://www.outerbanks.com/images/uploads/place/2372/wilmington17-201.jpg', 'Medium');
    `
    db.exec(thisQuery);
    res.status(200).json({ message: 'Pin successfully inserted into table'});
});

export default app;
