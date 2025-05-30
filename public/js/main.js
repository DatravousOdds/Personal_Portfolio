// Contact Modal Functionality
const contactBtn = document.getElementById("contact-btn");
const modalCloseBtn = document.querySelector(".modal-close-btn");

// Feature Filters Functionality
const filterList = document.querySelector(".filter-list");

// Form Validation
const modalOverlay = document.querySelector(".modal-overlay");

const formInput = {
  name: document.getElementById("contact-name"),
  email: document.getElementById("contact-email"),
  subject: document.getElementById("contact-subject"),
  message: document.getElementById("contact-message"),
};

const formErrors = {
  name: document.getElementById("name-error"),
  email: document.getElementById("email-error"),
  subject: document.getElementById("subject-error"),
  message: document.getElementById("message-error"),
};

const successMessage = {
  name: "Looks good!",
  email: "Valid",
  subject: document.getElementById("subject-error"),
  message: document.getElementById("message-error"),
};

validators = {
  name: (value) => {
    if (!value) return "Name is required";
    if (value.length < 2) return "Name must be at least two characters";
  },
  email: (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) return "Please enter a valid email";
    if (!value) return "Email is required";
  },
  subject: (value) => {
    if (value.length < 2) return "Subject must be at least 5 characters";
    if (!value) return "Subject is required";
  },
  message: (value) => {
    if (value.length < 10) return "Message must be at lease 10 characters";
  },
};

const keys = Object.keys(formInput);
// console.log(keys)

keys.forEach((key) => {
  let input = formInput[key];

  input.addEventListener("input", () => {
    let error = validators[key](input.value);
    if (error) {
      formErrors[key].classList.remove("valid");
      formErrors[key].classList.add("invalid");
      formInput[key].classList.add("error");
      formErrors[key].textContent = error;
    } else {
      formErrors[key].classList.add("valid");
      formErrors[key].textContent = successMessage[key];
    }
  });
});
contactBtn.addEventListener("click", () => {
  modalOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
});

modalCloseBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("show");
  document.body.style.overflow = "scroll";
});

// Testing
// console.log(contactBtn);
// console.log(filterList);
// console.log(contactModal);
// console.log(formInput.name);
// console.log(formInput.email);
// console.log(formInput.subject);
// console.log(formInput.message);
// console.log(formErrors.name);
// console.log(formErrors.email);
// console.log(formErrors.subject);
// console.log(formErrors.message);
