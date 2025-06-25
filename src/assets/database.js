// database.js

import Database from 'better-sqlite3';
import fs from 'fs';

const db = new Database('database.db');

// Function to read image file and return BLOB data
const readImage = (path) => {
    try {
        const buffer = fs.readFileSync(path);
        return buffer;
    } catch (error) {
        console.error("Error reading image file:", error);
        return null;
    }
};

// Create tables
const createTables = () => {
    try {
        // Table creation queries
        const tablePins = `
            CREATE TABLE IF NOT EXISTS pins (
                name STRING PRIMARY KEY,
                desc STRING NOT NULL,
                lat DECIMAL NOT NULL,
                lon DECIMAL NOT NULL,
                rating INTEGER NOT NULL,
                picture BLOB NOT NULL,
                difficulty STRING NOT NULL
            );
            CREATE UNIQUE INDEX IF NOT EXISTS coordinates ON pins (lat, lon);
        `;
        //addition of chosen team for each user
        const tableUsers = `
            CREATE TABLE IF NOT EXISTS users (
                email STRING PRIMARY KEY,
                profilepicture BLOB,
                bio STRING,
                password STRING NOT NULL,
                chosen_team TEXT DEFAULT NULL
            );
        `;
        const tableEvents = `
            CREATE TABLE IF NOT EXISTS events (
                eventID STRING PRIMARY KEY,
                pinname STRING NOT NULL,
                date STRING NOT NULL,
                time INTEGER NOT NULL,
                description STRING NOT NULL,
                password STRING NOT NULL,
                vote INTEGER NOT NULL
            );
        `;
        // signedup BOOLEAN NOT NULL, ^^^^
        const tableCreateEvent = `
            CREATE TABLE IF NOT EXISTS createEvent (
                eventID STRING NOT NULL REFERENCES events,
                name STRING NOT NULL REFERENCES pins
            );
        `;
        const tableInteracts = `
            CREATE TABLE IF NOT EXISTS interacts (
                name STRING NOT NULL REFERENCES pins,
                email STRING NOT NULL REFERENCES users
            );
        `;
        const tableSignUp = `
            CREATE TABLE IF NOT EXISTS signUp (
                email STRING NOT NULL REFERENCES users,
                eventID STRING NOT NULL REFERENCES events
            );
        `;
        //keeps track of team scores in bounty
        const tableTeamScores = `
            CREATE TABLE IF NOT EXISTS team_scores (
                team TEXT PRIMARY KEY,
                score INTEGER NOT NULL DEFAULT 0
            );
        `;
        
        // Execute queries
        db.exec(tablePins);
        db.exec(tableUsers);
        db.exec(tableEvents); 
        db.exec(tableCreateEvent); 
        db.exec(tableInteracts); 
        db.exec(tableSignUp);
        db.exec(tableTeamScores);

        console.log("Tables created.");
    } catch (error) {
        console.error("Error creating tables: ", error);
    }
};

    //     // execute query
    // db.exec(tablePins);
    // db.exec(tableUsers);
    // db.exec(tableEvents); 
    // db.exec(tableCreateEvent); 
    // db.exec(tableInteracts); 
    // db.exec(tableSignUp); 
    // console.log("Tables created.");
// const insertEvents = () => {
//     try {
//         const events = [
//             {
//                 eventID: 'event1',
//                 pinname: 'College & Oleander',
//                 date: '2024-04-10',
//                 time: 1800,
//                 description: 'Event 1 description here',
//                 password: 'password1',
//                 vote: 0
//             },
//             {
//                 eventID: 'event2',
//                 pinname: 'UNCW',
//                 date: '2024-04-15',
//                 time: 1400,
//                 description: 'Event 2 description here',
//                 password: 'password2',
//                 vote: 0
//             },
//             {
//                 eventID: 'event3',
//                 pinname: 'Wrightsville',
//                 date: '2024-04-20',
//                 time: 1600,
//                 description: 'Event 3 description here',
//                 password: 'password3',
//                 vote: 0
//             }
//         ];

//         const insertEventStmt = db.prepare('INSERT INTO events (eventID, pinname, date, time, description, password, vote) VALUES (@eventID, @pinname, @date, @time, @description, @password, @vote)');

//         db.transaction(() => {
//             for (const event of events) {
//                 insertEventStmt.run(event);
//             }
//         })();

//         console.log("Events inserted successfully.");
//     } catch (error) {
//         console.error("Error inserting events: ", error);
//     }
// };

// // Insert profile pictures
// const insertProfilePictures = () => {
//     try {
//         const profilePictures = [
//             { email: "user1@example.com", picturePath: "./src/assets/images/user1.jpg"  },
//             { email: "user2@example.com", picturePath: "./src/assets/images/user2.jpg"  },
//             // Add more profile pictures as needed
//         ];

//         const insertProfilePicture = db.prepare('INSERT INTO users (email, profilepicture) VALUES (?, ?)');

//         profilePictures.forEach((profile) => {
//             const imageData = readImage(profile.picturePath);
//             if (imageData) {
//                 insertProfilePicture.run(profile.email, imageData);
//             }
//         });

//         console.log("Profile pictures inserted.");
//     } catch (error) {
//         console.error("Error inserting profile pictures: ", error);
//     }
// };

// Initialize database
const initializeDatabase = () => {
    createTables();
    //insertProfilePictures();
    //insertEvents();
};

initializeDatabase();

export default db;
