// Import the necessary dependencies
// npm install
// npm run test:unit
// to run test

// Author: Joesph Lebron
// these are black box tests to test the functionality of the event view component
// test 1 and 2 test the upvote and downvote functionality after a user clicks the respective button
// test 3 and 4 test the delete event functionality after a user uses a corrert or incorrect password then clicks the button

import { expect, test as vitestTest } from 'vitest'
import { mount } from '@vue/test-utils';

const Events = {
  template: `
    <div data-testid="events-container" v-if="events.length > 0">
      <ul class="event-list">
        <li v-for="(event, index) in events" :key="index" class="event-item">
          <p><strong>Title:</strong> {{ event.eventID }}</p>
          <p><strong>Pin:</strong> {{ event.pinname }}</p>
          <p><strong>Date:</strong> {{ event.date }}</p>
          <p><strong>Up/Down Votes:</strong> {{ event.vote }}</p>
          <p><strong>Time:</strong> {{ event.time }}</p>
          <p><strong>Description:</strong> {{ event.description }}</p>
          <input class="admin-password-input" type="password" v-model="event.deletionPassword" placeholder="Admin password">
          <button class="create-event-button" @click="deleteEvent(event)">Delete</button>
          <div>
            <button @click="upvoteEvent(event)">Upvote</button>
            <button @click="downvoteEvent(event)">Downvote</button>
          </div>
        </li> 
      </ul>
    </div>
  `,
  data() {
    return {
      events: [
        {
          eventID: 'Event 1',
          pinname: 'Pin 1',
          date: '2024-04-27',
          vote: 0,
          time: '10:00 AM',
          description: 'Description 1',
          Password: 'password1'
        }
      ]
    }
  },
  methods: {
    deleteEvent(event) {
      const enteredPassword = event.deletionPassword;
      const correctPassword = event.Password;
      
      if (enteredPassword === correctPassword) {
        const index = this.events.indexOf(event);
        if (index !== -1) {
          this.events.splice(index, 1); // Remove the event
        }
      } else {
      }
    },
    upvoteEvent(event) {
      event.vote++; // Increase the vote count
    },
    downvoteEvent(event) {
      event.vote--; // Decrease the vote count
    }
  }
}

vitestTest('increases the Up/Down Votes value on click', async () => {
  const wrapper = mount(Events)
  const buttons = wrapper.findAll('button') // Selecting all buttons
  const paragraphs = wrapper.findAll('p') // Selecting all paragraphs
  
  // Selecting the second button 
  const upvoteButton = buttons.at(1) 
  const voteParagraph = paragraphs.at(3) 
  
  //expect(upvoteButton.text()).toContain('Upvote') // Checking initial button text
  
  await upvoteButton.trigger('click') // Triggering click event
  
  expect(voteParagraph.text()).toContain('1') // Checking if the vote goes up after click
});

vitestTest('decreases the Up/Down Votes value on click', async () => {
  const wrapper = mount(Events)
  const buttons = wrapper.findAll('button') 
  const paragraphs = wrapper.findAll('p') 
  
  // Selecting the third button 
  const downvoteButton = buttons.at(2) 
  const voteParagraph = paragraphs.at(3) 
  
  //expect(downvoteButton.text()).toContain('Downvote') // Checking initial button text
  
  await downvoteButton.trigger('click') // Triggering click event
  
  expect(voteParagraph.text()).toContain('-1') // Checking if the vote goes down after click
});

vitestTest('deletes an event on button click', async () => {
  const wrapper = mount(Events)
  const buttons = wrapper.findAll('button') 
  const eventItems = wrapper.findAll('.event-item') 
  
  // Finding number of events initiallyy
  const initialEventCount = eventItems.length;
  
  // Selecting the delete button of the first event
  const deleteButton = buttons.at(0);
  
  // Selecting the input field for admin password
  const passwordInput = wrapper.find('.admin-password-input');
  
  // Entering a the right password
  await passwordInput.setValue('password1');
  
  // Triggering click on the delete button
  await deleteButton.trigger('click');
  
  const updatedEventCount = wrapper.findAll('.event-item').length;
  
  expect(updatedEventCount).toBe(initialEventCount - 1); // Checking if the event was deleted
});

vitestTest('return error if password mismatch deletes an event', async () => {
  const wrapper = mount(Events)
  const buttons = wrapper.findAll('button') 
  const eventItems = wrapper.findAll('.event-item') 
  
  // Finding number of events initially
  const initialEventCount = eventItems.length;
  
  // Selecting the delete button of the first event
  const deleteButton = buttons.at(0);
  
  // Selecting the input field for admin password
  const passwordInput = wrapper.find('.admin-password-input');
  
  // Entering a mismatch password
  await passwordInput.setValue('randompassword');
  
  // Triggering click on the delete button
  await deleteButton.trigger('click');
  
  const updatedEventCount = wrapper.findAll('.event-item').length;
  
  expect(updatedEventCount).toBe(initialEventCount); // Checking that the event was not deleted
});