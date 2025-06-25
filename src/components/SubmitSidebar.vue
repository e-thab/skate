<script setup>
import { ref } from 'vue'
import { activeSubmitSpot } from '@/stores/activeSubmitSpot'
import { supabase } from '@/lib/supabaseClient';
const emit = defineEmits(['close', 'submit', 'cancel'])

// TODO:
// - When navigating away from the homepage while submit is in progress, ask for confirmation
// - Image upload
// - Input validation

const defaultImgSource = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
const errorImgSource = "https://t4.ftcdn.net/jpg/01/28/44/55/360_F_128445579_62dfVMTyJzQhd3cKSnW5JjZHV5nNTrHQ.jpg"

const inputImg = ref(defaultImgSource)
const imgIsValid = ref(false)

if (activeSubmitSpot.img !== "") {
    loadImg()
}

const imgErrMsg = ref("")
const showImgErr = ref(false)

const nameErrMsg = ref("")
const showNameErr = ref(false)

const descErrMsg = ref("")
const showDescErr = ref(false)

const rateErrMsg = ref("")
const showRateErr = ref(false)

const diffErrMsg = ref("")
const showDiffErr = ref(false)

const posErrMsg = ref("")
const showPosErr = ref(false)

function loadImg() {
    // Try to load image from input URL in {activeSubmitSpot.img}
    if (activeSubmitSpot.img === '') {
        // No input: default img
        inputImg.value = defaultImgSource
        return
    }

    var image = new Image()
    image.onload = function() {
        if (this.width > 0) {
            // Valid input source
            inputImg.value = activeSubmitSpot.img
            imgIsValid.value = true
        }
    }
    image.onerror = function() {
        // Invalid input source
        inputImg.value = errorImgSource
        imgIsValid.value = false
    }
    image.src = activeSubmitSpot.img
}

async function trySubmit() {
    // Attempt submit, set error refs where appropriate
    if (activeSubmitSpot.img === '') {
        // No image URL input
        showImgErr.value = true
        imgErrMsg.value = "Please enter a URL"
    } else if (!imgIsValid.value) {
        // Input URL invalid
        showImgErr.value = true
        imgErrMsg.value = "Invalid URL"
    } else {
        showImgErr.value = false
    }

    if (activeSubmitSpot.name === '') {
        // No name input
        showNameErr.value = true
        nameErrMsg.value = "Please enter a name"
    } else {
        showNameErr.value = false
    }

    if (activeSubmitSpot.description === '') {
        // No description input
        showDescErr.value = true
        descErrMsg.value = "Please enter description"
    } else {
        showDescErr.value = false
    }

    if (activeSubmitSpot.rating === "") {
        // No difficulty selected
        showRateErr.value = true
        rateErrMsg.value = "Please select a rating"
    } else {
        showRateErr.value = false
    }

    if (activeSubmitSpot.difficulty === '') {
        // No difficulty selected
        showDiffErr.value = true
        diffErrMsg.value = "Please select a difficulty"
    } else {
        showDiffErr.value = false
    }

    // Check if spot exists at this location in database
    const { count, error } = await supabase
        .from('pins')
        .select('*', { count: 'exact' })
        .match({
            lat: activeSubmitSpot.fixedLat(),
            lon: activeSubmitSpot.fixedLng()
        })
    if (count > 0) {
        // If count > 0, an existing spot was found
        showPosErr.value = true
        posErrMsg.value = "Spot already exists at this location"
    } else if (error) {
        // Unexpected database error
        showPosErr.value = true
        posErrMsg.value = "Error submiting. Try again later."
        console.error("Error testing submit:", error)
    } else {
        showPosErr.value = false
    }

    // If no errors, submit
    if ( noErrors() ) {
        emit('submit')
    }
}

function noErrors() {
    // Returns true when all members are false
    return ( !(showImgErr.value || showNameErr.value || showDescErr.value || showDiffErr.value || showPosErr.value) )
}
</script>

<template>
    <div class="sidebar-container">
        <!-- Header img -->
        <img class="sidebar-img" :src="inputImg">

        <div class="sidebar-contents">
            <h1>Submit a Spot</h1>
            <div class="submission-form-container">
                <div class="submission-form">
                    <!-- Position header -->
                    <div>
                        <h3>Pos: {{ activeSubmitSpot.getDisplayPos() }}</h3>
                        <span class="error-msg" v-if="showPosErr">&nbsp;&nbsp;{{ posErrMsg }}</span>
                    </div>
                    
                    <!-- Image upload -->
                    <!-- <div>
                        <label for="file">Upload an image:</label>
                        <input type="file" accept="image/*" id="file" name="file" />
                    </div> -->

                    <!-- Image url input -->
                    <div>
                        <label for="img">Image URL:</label>
                        <span class="error-msg" v-if="showImgErr">&nbsp;&nbsp;{{ imgErrMsg }}</span>
                        <input type="text" id="img" v-model="activeSubmitSpot.img" @input="loadImg" maxlength="250" :class="{ 'err-highlight' : showImgErr}" />
                    </div>
            
                    <!-- Name -->
                    <div>
                        <label for="title">Name:</label>
                        <span class="error-msg" v-if="showNameErr">&nbsp;&nbsp;{{ nameErrMsg }}</span>
                        <input type="text" id="title" v-model="activeSubmitSpot.name" maxlength="50" :class="{ 'err-highlight' : showNameErr}" />
                    </div>
            
                    <!-- Description -->
                    <div>
                        <label for="description">Description:</label>
                        <span class="error-msg" v-if="showDescErr">&nbsp;&nbsp;{{ descErrMsg }}</span>
                        <textarea id="description" v-model="activeSubmitSpot.description" maxlength="250" style="resize:vertical" :class="{ 'err-highlight' : showDescErr}"></textarea>
                    </div>

                    <!-- Rating -->
                    <div>
                        <label for="rating">Rating:</label>
                        <span class="error-msg" v-if="showRateErr">&nbsp;&nbsp;{{ rateErrMsg }}</span>
                        <input type="number" id="rating" v-model="activeSubmitSpot.rating" min="1" max="5" style="width: 100%; border: 1px solid #ccc; border-radius: 5px;" :class="{ 'err-highlight' : showRateErr}" />
                    </div>

                    <!-- Drop down menu for the difficulty: beginner, intermediate, or advanced -->
                    <div>
                        <label for="difficulty">Difficulty:</label>
                        <span class="error-msg" v-if="showDiffErr">&nbsp;&nbsp;{{ diffErrMsg }}</span>
                        <select id="difficulty" v-model="activeSubmitSpot.difficulty" :class="{ 'err-highlight' : showDiffErr}">
                            <option value="Beginner">Beginner</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
            
                    <!-- Cancel and Submit buttons -->
                    <div class="button-container">
                        <button class="submit-button" @click="emit('cancel')">Cancel</button>
                        <button class="submit-button" @click="trySubmit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        
        <button class="close-button" @click="emit('close')">
            &lt;
        </button>
    </div>
</template>

<style scoped>
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    background-color: white;
}
.sidebar-contents {
    grid-column: 1;
    grid-row: 2;
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
.submission-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.submission-form {
    width: 80%;
    max-width: 500px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 5px black;
}
.label {
    display: block;
    margin-bottom: 10px;
}
.error-msg {
    color: rgb(255, 109, 109);
    text-shadow: 0 0 3px rgb(255, 83, 83);
}

input[type="text"],
textarea,
select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;    
}

.err-highlight {
    outline: 1px solid red;
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.submit-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}
.submit-button:hover {
    background-color: #0056b3;
}
.submit-button:active {
    background-color: #0056b3;
    transform: translateY(1px);
}
</style>