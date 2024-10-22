import { userEvents } from './userEvents.mjs';

const userEvent = new userEvents();

function saveToDatabase() {
  console.log('Saving Post to Database');
}
function sendNotifications() {
  console.log('Sending Notifications');
}
function updateTimeline() {
  console.log('Updating Timeline');
}

// Addding Listeners to Event
userEvent.addListener('postCreated', saveToDatabase);
userEvent.addListener('postCreated', sendNotifications);
userEvent.addListener('postCreated', updateTimeline);

// Calling Event with content
userEvent.createPost('This is my first post');
