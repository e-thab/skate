<template>
    <div>
      <button @click="createPin">Create Pin</button>
      <button @click="readPins">Read Pins</button>
      <button @click="updatePin">Update Pin</button>
      <button @click="deletePin">Delete Pin</button>
    </div>
</template>
  
<script>
import db from '../assets/database.js';

export default {
    data() {
        return [
    { name: "College", lat: "21.335", lon:"76.768", rating: 10,
    picture: "blob", difficulty: "easy" },
    { name: "UNCW", lat: "78.335", lon:"47.768", rating: 5,
    picture: "blob", difficulty: "medium" },
    { name: "Wrightsville",lat: 57.335, lon:"56.768", rating: 3,
    picture: "blob", description: "beach spot", difficulty: "hard" }
];
    },
    methods: {
        createPin() {
        const insertPin = db.prepare('INSERT INTO pin (name, lat, lon, rating, picture, description, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)');
        insertPin.run(this.name, this.lat, this.lon, this.rating, this.picture, this.description, this.difficulty);
        // Clear input fields after insertion
        this.name = '';
        this.lat = '';
        this.lon = '';
        this.rating = '';
        this.picture = '';
        this.difficulty = '';
        },
        readPins() {
        const pins = db.prepare('SELECT * FROM pins').all();
        console.log(pins);
        },
        updatePin() {
        const updatePin = db.prepare('UPDATE pin SET rating = ? WHERE name = ?');
        updatePin.run(newRatingValue, pinNameToUpdate);
        },
        deletePin() {
        const deletePin = db.prepare('DELETE FROM pins WHERE name = ?');
        deletePin.run(pinNameToDelete);
        },
    },
};
</script>
  
<style>
</style>