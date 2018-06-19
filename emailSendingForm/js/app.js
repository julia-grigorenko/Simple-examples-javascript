// Variables
const sendBtn = document.querySelector('#sendBtn');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const resetBtn = document.querySelector('#resetBtn');
const sendEmailForm = document.querySelector('#email-form');

// Event Listeners
function eventListeners() {
  // App init
  document.addEventListener('DOMContentLoaded', appInit);

  // VAlidate the forms
  email.addEventListener('blur', validateField);
  subject.addEventListener('blur', validateField);
  message.addEventListener('blur', validateField);
  message.addEventListener('keyup', validateField);

  // Send email and reset inputs
  sendEmailForm.addEventListener('submit', sendEmail);
  resetBtn.addEventListener('click', resetForm);
}

// Functions

// App initialization
function appInit () {
  // Disable the send button on load
  sendBtn.disabled = true;
}

function validateField () {
  let errors;

  // Validate the length of the field
  validateLength(this);

  // Validate the email
  if(this.type === 'email') {
    validateEmail(this);
  }

  // Both wiil return errors, then check if there are any errors
  errors = document.querySelectorAll('.error');

  // Check that inputs are not empty
  if(email.value !== '' && subject.value !== '' && message.value !== '') {
    if(errors.length === 0) {
      // the button should be enabled
      sendBtn.disabled = false;
    }
  }
}

// Validate the length of the fields
function validateLength(field) {
  if(field.value.length > 0) {
    field.style.borderBottomColor = 'green';
    field.classList.remove('error');
  } else {
    field.style.borderBottomColor = 'red';
    field.classList.add('error');
  }
}

// Validate email (check for @ in the value)
function validateEmail (field) {
  let = emailText = field.value;

  // check if the emailText contains @ sign
  if(emailText.indexOf('@') !== -1) {
    field.style.borderBottomColor = 'green';
    field.classList.remove('error');
  } else {
    field.style.borderBottomColor = 'red';
    field.classList.add('error');
  }
}

// Reset the form
function resetForm () {
  sendEmailForm.reset();
}

function sendEmail (e) {
  e.preventDefault();

  const spinner = document.querySelector('#spinner');
  const sendEmailImg = document.createElement('img');

  // show the spinner
  spinner.style.display = 'block';

  // Show email image

  sendEmailImg.src = 'img/mail.gif';
  sendEmailImg.style.display = 'block';

  // Hide spinner after 3 sec
  setTimeout(function () {
    spinner.style.display= 'none';

    // Show email img
    document.querySelector('#loaders').appendChild(sendEmailImg);

    setTimeout(function () {
      // Remove email img and reset theform after 5 sec
      sendEmailImg.style.display = 'none';
      resetForm();
    }, 4500);
  }, 3000);
}

// Init app
eventListeners();
