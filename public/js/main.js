// Contact Modal Functionality
const contactBtn = document.getElementById("contact-btn");
const form = document.getElementById("contactForm");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const charCount = document.querySelector(".char-count");
const submitBtn = document.querySelector(".primary-btn");

console.log("characters", charCount);

// Feature Filters Functionality
const filterList = document.querySelector(".filter-list");

// Message Character Counter
const messageInput = document.getElementById("contact-message");

messageInput.addEventListener("input", () => {
  const charLength = messageInput.value.length;
  charCount.textContent = `${charLength} / 1000`;
  console.log("charLength", charLength);
});

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
  email: "Valid!",
  subject: "Looks good!",
  message: "That's enough!",
};

validators = {
  name: (value) => {
    if (!value) return "Name is required";
    if (value.length < 2) return "Name must be at least two characters";
    return null;
  },
  email: (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) return "Please enter a valid email";
    if (!value) return "Email is required";
    return null;
  },
  subject: (value) => {
    if (value.length < 2) return "Subject must be at least 5 characters";
    if (!value) return "Subject is required";
    return null;
  },
  message: (value) => {
    if (value.length < 10) return "Message must be at lease 10 characters";
    if (value.length > 1000) return "Message must be less than 1000 characters";
    return null;
  },
};

const keys = Object.keys(formInput);

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
      formErrors[key].classList.remove("invalid");
      formInput[key].classList.remove("error");
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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let hasErrors = false;
  keys.forEach((key) => {
    let error = validators[key](formInput[key].value);
    if (error) {
      formInput[key].classList.add("error");
      formErrors[key].classList.add("invalid");
      formErrors[key].textContent = error;
      hasErrors = true;
    } else {
      formInput[key].classList.remove("error");
      formErrors[key].classList.remove("invalid");
      formErrors[key].textContent = successMessage[key];
    }
  });
  if (hasErrors) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
});
