/*** Dark Mode ***
  
  Purpose:
  - Toggle dark mode for the Rivalry Atlas website

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");

// Step 2: Write the callback function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}

// Step 3: Register a 'click' event listener for the theme button
themeButton.addEventListener("click", toggleDarkMode);


const rsvpButton = document.getElementById("rsvp-button");

// Step 2: Initialize RSVP count
let count = 4;

/*** Step 1-A: validateForm ***/
const validateForm = () => {
  let containsErrors = false;

  // Grab all inputs from the form
  let rsvpInputs = document.getElementById("rsvp-form").elements;

  // Create a person object using the order of inputs
  let person = {
    name: rsvpInputs[0].value.trim(),
    country: rsvpInputs[1].value.trim(),
    email: rsvpInputs[2].value.trim(),
    team: rsvpInputs[3].value.trim()
  };

  // Reset error styles
  for (let input of rsvpInputs) {
    input.style.border = "1px solid #ccc";
  }

  // Email validation regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate fields using person object
  if (!person.name) {
    rsvpInputs[0].style.border = "2px solid red";
    containsErrors = true;
  }

  if (!person.country) {
    rsvpInputs[1].style.border = "2px solid red";
    containsErrors = true;
  }

  if (!person.email || !emailPattern.test(person.email)) {
    rsvpInputs[2].style.border = "2px solid red";
    containsErrors = true;
  }

  if (!person.team) {
    rsvpInputs[3].style.border = "2px solid red";
    containsErrors = true;
  }

  // If no errors, pass person object to addParticipant
  if (!containsErrors) {
    addParticipant(person);
    toggleModal(person); // show success modal
    document.getElementById("rsvp-form").reset();
  }
};

/*** Step 1-B: addParticipant ***/
const addParticipant = (person) => {
  // Create new participant element using football theme
  const newParticipant = document.createElement("p");
  newParticipant.textContent = `⚽ ${person.name} from ${person.country} supports ${person.team}`;

  const participantsDiv = document.querySelector(".rsvp-participants");
  participantsDiv.appendChild(newParticipant);

  // Remove old RSVP count
  const oldCounter = document.getElementById("rsvp-count");
  if (oldCounter) {
    oldCounter.remove();
  }

  // Update count
  count = count + 1;

  // Create new RSVP count message with football theme
  const newCounter = document.createElement("p");
  newCounter.id = "rsvp-count";
  newCounter.textContent = "⚽️ " + count + " fans have joined the rivalry event!";

  // Append new counter
  participantsDiv.appendChild(newCounter);
};

/*** Step 1-C: Hook up the button ***/
rsvpButton.addEventListener("click", (event) => {
  event.preventDefault();
  validateForm();
});



// Animation variables
let rotateFactor = 0;
let modalImage = document.querySelector("#success-modal img"); // selects modal image if present

const animateImage = () => {
  if (!modalImage) return;
  rotateFactor = (rotateFactor === 0) ? -10 : 0;
  modalImage.style.transform = `rotate(${rotateFactor}deg) scale(1.05)`;
};

const toggleModal = (person) => {
    let modal = document.getElementById("success-modal");
    let modalText = document.getElementById("modal-text");

    // Show the modal
    modal.style.display = "flex";

    // Personalized message
    modalText.textContent = `Thank you for confirming your RSVP, ${person.name}. Your registration has been successfully recorded.`;
    // Start animation every 500ms
    let intervalId = setInterval(animateImage, 500);

    // Hide modal after 5 seconds & stop animation
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId);
    }, 5000);
};