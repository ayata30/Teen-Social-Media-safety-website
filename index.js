


let themeButton = document.querySelector("#theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener('click', toggleDarkMode);




const addParticipant = (event, person) => {
 
  event.preventDefault();
  const name = document.getElementById('name').value;
  const homeState = document.getElementById('homeState').value;

  const participantsDiv = document.querySelector('.participants');

  const newParticipant = document.createElement('p');
  newParticipant.textContent = `🎟️ ${name} from ${homeState} has RSVP'd.`;

  participantsDiv.appendChild(newParticipant);

  // After adding the participant, trigger the modal
  toggleModal(person);

  console.log(`${name} submitted!`);
}


// the callback function
const validateForm = (event) => {
  event.preventDefault();

  let containsErrors = false;
  var rsvpInputs = document.getElementById("rsvp-form").elements;

  for (let i = 0; i < rsvpInputs.length; i++) {
    let input = rsvpInputs[i];
    if (input.value.trim().length < 2 && input.type !== 'submit') {
      containsErrors = true;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  }

  let person = {
    name: rsvpInputs[0].value
  }

  if (!containsErrors) {
    addParticipant(event, person);
    document.getElementById('rsvp-form').reset(); // Reset the form after submission
  }
}

const closeModal = () => {
  let modal = document.getElementById("success-modal");
  modal.style.display = "none";
  // reset any animation or content if needed
  let modalImage = document.getElementById("modal-image");
  modalImage.style.transform = "scale(1)";
};

// Modal shows the success message
const toggleModal = (person) => {
  let modal = document.getElementById("success-modal");
  let modalText = document.getElementById("modal-text");
  let modalImage = document.getElementById("modal-image");

  // Show the modal
  modal.style.display = "flex";

  // Personalized message
  modalText.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at the event! 🎉`;

  // Animation Variables
  let scale = 1;
  let growing = true;

  const animateImage = () => {
    if (growing) {
      scale += 0.01;
      if (scale >= 1.2) growing = false;
    } else {
      scale -= 0.01;
      if (scale <= 1.0) growing = true;
    }
    modalImage.style.transform = `scale(${scale})`;
  };

  // Start Animation
  const animationInterval = setInterval(animateImage, 30);

  // Hide the modal after 5 seconds

setTimeout(() => {
  closeModal();
  clearInterval(animationInterval); // Stop the animation
}, 5000);
};
document.getElementById("close-modal-button").addEventListener("click", closeModal);

// event listener to the submit button
document.getElementById("rsvp-button").addEventListener("click", validateForm);


