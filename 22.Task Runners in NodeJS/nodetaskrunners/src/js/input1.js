// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get the button element
  const button = document.getElementById('changeTextButton');

  // Get the h1 element
  const title = document.getElementById('title');

  // Add a click event listener to the button
  button.addEventListener('click', function () {
    // Change the text of the h1 element when the button is clicked
    title.textContent = 'Text has been changed!';
  });
});
