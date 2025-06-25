<script setup>
import { supabase } from '@/lib/supabaseClient';
import axios from 'axios'
import { ref } from 'vue'
import { activeUser } from '@/stores/activeUser';

const props = defineProps(['spot'])
const emit = defineEmits(['close', 'delete'])

const setError = ref(null);

async function createEvent(eventID, pinname, date, time, description, password) {
  setError.value = null;

  ////// Axios/express implementation
  // try {
  //   const response = await axios.post('http://localhost:8000/map/api/create-event', {
  //     eventID, pinname, date, time, description, password
  //   });
  //   return response.data;
  // } catch (error) {
  //   setError.value = error;
  //   throw error;
  // }

  ////// Supabase implementation
  const { error } = await supabase
    .from('events')
    .insert([
      {
        eventID: eventID,
        pinname: pinname,
        date: date,
        time: time,
        description: description,
        password: password,
        vote: '0'
      }
    ])
    if (error) {
      setError.value = error;
      console.error("Error creating event:", error);
    }
}

async function CreatingEvent(event) {
  const eventID = prompt("Enter the event's title:", "e.g.Joe's Skate Meetup");
  // const pinname = prompt("Enter the Pin's Name:", "Use slected pins name here");
  const pinname = props.spot.name;
  const date = prompt("Enter the event's date:", "format:DD-MM-YYYY");
  const time = prompt("Enter the event's time:", "format: 630");
  const description = prompt("Enter the event's description:", "e.g. Skate meetup at the park");
  const password = prompt("Enter an admin password to delete later:", "e.g. password123");
  try {
    await createEvent(eventID, pinname, date, time, description, password);
  } catch (error) {
    console.error('Error creating event:', error);
  }
}
</script>

<template>
    <div class="sidebar-container">
        <img class="sidebar-img" :src="props.spot.img" />
        <div class="sidebar-contents">
            <!-- Name -->
            <h1>{{ props.spot.name || "Null" }}</h1>

            <!-- Posted by -->
            <h3 v-if="props.spot.email">Posted by: {{ props.spot.email }}</h3>

            <!-- Description -->
            <h2 v-if="props.spot.description"> {{ props.spot.description }}</h2>
            <h2 v-else><i>No description</i></h2>

            <!-- Position -->
            <h2>Pos: {{ props.spot.getDisplayPos() || "Null" }}</h2>

            <!-- Difficulty -->
            <h2>Difficulty: {{ props.spot.difficulty || "Null" }}</h2>

            <!-- Rating -->
            <h2>Rating: {{ props.spot.rating === -1 ? "Unrated" : props.spot.rating }}</h2>

            <div v-if="activeUser.loggedIn">
                <button class="create-event-button" @click="CreatingEvent">Create Event For This Pin</button>
                &nbsp;
                <button v-if="props.spot.email === activeUser.email" class="delete-button" @click="emit('delete', spot)">Delete Pin</button>
            </div>
        </div>
        <button class="close-button" @click="emit('close')">
            &lt;
        </button>
    </div>
</template>


<style scoped>
.create-event-button {
    color: yellow;
    background-color: teal; 
    border: 2px solid yellow;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px; 
}
.delete-button {
    color: orange;
    background-color: teal; 
    border: 2px solid orange;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px; 
}

.close-button {
    grid-column: 2;
    grid-row: 1 / 3;
    border: 0;
    cursor: pointer;
    transition-duration: 0.3s;
    background-color: #f0f0f0;
}
.close-button:hover {
    background-color: #e5e5e5;
}
.sidebar-img {
    grid-column: 1;
    grid-row: 1;
    object-fit: cover;
    width: 100%;
    min-height: 100%;
    background-color: white;
}
.sidebar-contents {
    grid-column: 1;
    grid-row: 2;
    overflow-wrap: break-word;
    overflow-y: scroll;
    color: white;
    background-color: darkcyan;
}
.sidebar-container {
    display: grid;
    grid-template-columns: calc(100% - 20px) 20px; 
    grid-template-rows: 40% 60%;
    text-align: center;
    height: 100%;
}
</style>