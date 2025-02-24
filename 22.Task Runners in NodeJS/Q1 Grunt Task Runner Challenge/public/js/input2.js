// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get the form and error message elements
  const form = document.getElementById('emailForm');
  const errorMessage = document.getElementById('error-message');

  // Add a submit event listener to the form
  form.addEventListener('submit', function (event) {
    // Prevent form submission to check the email
    event.preventDefault();

    // Get the value of the email input
    const email = document.getElementById('email').value;

    // Check if the email is valid using a simple regex pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // If the email is not valid, display an error message
    if (!emailPattern.test(email)) {
      errorMessage.textContent = 'Please enter a valid email address.';
    } else {
      // If valid, clear the error message and show success
      errorMessage.textContent = '';
      alert('Email is valid!');
    }
  });
});
