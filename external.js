const form = document.querySelector("form");

const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

const country = document.getElementById("country");
const countryError = document.querySelector("#country + span.error");

const postcode = document.getElementById("postcode");
const postcodeError = document.querySelector("#postcode + span.error");

const password = document.getElementById("password");
const passwordError = document.querySelector("#password + span.error");
const passwordPrompt = document.getElementById("password-prompt")

const uppercase = document.getElementById("uppercase")
const lowercase = document.getElementById("lowercase")
const numbers = document.getElementById("numbers")

const confirmation = document.getElementById("confirmation");
const confirmationError = document.querySelector("#confirmation + span.error");


const lowercaseLetters = /[a-z]/g;
const uppercaseLetters = /[A-Z]/g;
const matchNumbers = /[0-9]/g;

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showError(email, emailError);
  }
});

country.addEventListener("input", (event) => {
  if (country.validity.valid) {
    countryError.textContent = "";
    countryError.className = "error";
  } else {
    showError(country, countryError);
  }
});

postcode.addEventListener("input", (event) => {
  if (postcode.validity.valid) {
    postcodeError.textContent = "";
    postcodeError.className = "error";
  } else {
    showError(postcode, postcodeError);
  }
});

password.addEventListener("input", (event) => {
  if (password.validity.valid) {
    passwordError.textContent = "";
    passwordError.className = "error";
  } else {
    showError(password, passwordError);
  }
});

password.addEventListener("keyup", (event) => {
  if(password.value.match(lowercaseLetters)){
    lowercase.classList.remove("invalid");
    lowercase.classList.add("valid");
  } else {
    lowercase.classList.remove("valid");
    lowercase.classList.add("invalid");
  }

  if(password.value.match(uppercaseLetters)){
    uppercase.classList.remove("invalid");
    uppercase.classList.add("valid");
  } else {
    uppercase.classList.remove("valid");
    uppercase.classList.add("invalid");
  }

  if(password.value.match(matchNumbers)){
    numbers.classList.remove("invalid");
    numbers.classList.add("valid");
  } else {
    numbers.classList.remove("valid");
    numbers.classList.add("invalid");
  }

  if(lowercase.classList.contains("invalid") ||uppercase.classList.contains("invalid")||numbers.classList.contains("invalid")){
    password.setCustomValidity("Error")
    showError(password, passwordError)
  } else{
    password.setCustomValidity("")
  }
})

confirmation.addEventListener("keyup", (event) => {
  while(password.value != confirmation.value){
    showError(confirmation, confirmationError);
  }
  confirmationError.textContent = "";
  confirmationError.className = "error";
})

password.onfocus = () => {
  passwordPrompt.style.display = "block"
}

password.onblur = () => {
  passwordPrompt.style.display = "none"
}

confirmation.addEventListener("input", (event) => {
  if (confirmation.validity.valid) {
    confirmationError.textContent = "";
    confirmationError.className = "error";
  } else {
    showError(confirmation, confirmationError);
  }
});

form.addEventListener("submit", (event) => {
  if (!email.validity.valid) {
    showError(email, emailError);
    event.preventDefault();
  } else if(!country.validity.valid){
    showError(country, countryError);
    event.preventDefault();
  } else if(!postcode.validity.valid){
    showError(postcode, postcodeError);
    event.preventDefault();
  } else if(!password.validity.valid){
    showError(password, passwordError);
    event.preventDefault();
  } else if(!confirmation.validity.valid){
    showError(confirmation, confirmationError);
    event.preventDefault();
  }
});

function showError(formInput, errorMsg) {
  if (formInput.validity.valueMissing) {
    errorMsg.textContent = "You need to fill this field.";
  } else if (formInput.validity.typeMismatch) {
    errorMsg.textContent = "Not valid.";
  } else if (formInput.validity.tooShort) {
    errorMsg.textContent = `Input is too short, it should be at least ${formInput.minLength} characters; you entered ${formInput.value.length}.`;
  } else if (formInput.validity.customError){
    errorMsg.textContent = "Not meeting criteria.";
  }


  errorMsg.className = "error active";
}
