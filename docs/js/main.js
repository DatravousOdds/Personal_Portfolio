// Contact Modal Functionality
const contactBtn = document.getElementById("contact-btn");
const form = document.getElementById("contactForm");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const charCount = document.querySelector(".char-count");
const submitBtn = document.querySelector(".primary-btn");
// Feature Filters Functionality
const filterList = document.querySelectorAll(".filter-list li");
// Message Character Counter
const messageInput = document.getElementById("contact-message");
// Form Validation
const modalOverlay = document.querySelector(".modal-overlay");
const gridContainer = document.querySelector(".projects-grid-container");

contactBtn.addEventListener("click", () => {
  modalOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
});

modalCloseBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("show");
  document.body.style.overflow = "scroll";
});

messageInput.addEventListener("input", () => {
  const charLength = messageInput.value.length;
  charCount.textContent = `${charLength} / 1000`;

  if (charLength > 1000) {
    charCount.classList.add("invalidCount");
  } else {
    charCount.classList.remove("invalidCount");
  }
});

const formInput = {
  name: document.getElementById("contact-name"),
  email: document.getElementById("contact-email"),
  subject: document.getElementById("contact-subject"),
  message: document.getElementById("contact-message")
};

const formErrors = {
  name: document.getElementById("name-error"),
  email: document.getElementById("email-error"),
  subject: document.getElementById("subject-error"),
  message: document.getElementById("message-error")
};

const successMessage = {
  name: "Looks good!",
  email: "Valid!",
  subject: "Looks good!",
  message: "That's enough!"
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
  }
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
    } else if (input.value.trim()) {
      formErrors[key].classList.add("valid");
      formErrors[key].classList.remove("invalid");
      formInput[key].classList.remove("error");
      formErrors[key].textContent = successMessage[key];
    } else {
      formErrors[key].classList.remove("valid", "invalid");
      formErrors[key].textContent = "";
      formInput[key].classList.remove("error");
    }

    updateSubmitBtn();
  });
});

function updateSubmitBtn() {
  const allValid = keys.every((key) => {
    const value = formInput[key].value;
    return value.trim() && !validators[key](value);
  });
  submitBtn.disabled = !allValid;
}

// Form submission
form.addEventListener("submit", async (e) => {
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
  if (hasErrors) return;

  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  try {
    // api call
  } catch (error) {}
});

const projects = [
  {
    id: 1,
    title: "Sales and Marketing Dashboard",
    category: "dashboards",
    technologies: ["tableau", "power bi", "javascript"],
    type: "Data Visualization",
    image: "./images/dashboardProject.jpg",
    description: "Interactive dashboard for sales and marketing data"
  },
  {
    id: 2,
    title: "Web Development Application",
    category: "web-apps",
    technologies: ["html", "css", "javascript"],
    type: "Web Development",
    image: "./images/dashboardProject.jpg",
    description: "web application for sales and marketing data"
  },
  {
    id: 3,
    title: "",
    category: "web-apps",
    technologies: ["html", "css", "javascript"],
    type: "Dashboard",
    image: "./images/dashboardProject.jpg",
    description: ""
  },
  {
    id: 4,
    title: "Data Visualization Tool",
    category: "data-viz",
    technologies: ["python", "matplotlib", "pandas"],
    type: "python",
    image: "./images/dashboardProject.jpg",
    description: ""
  },
  {
    id: 5,
    title: "Python Project",
    category: "python",
    technologies: ["html", "css", "javascript"],
    type: "",
    image: "./images/dashboardProject.jpg",
    description: ""
  },
  {
    id: 6,
    title: "Data Visualization",
    category: "data-viz",
    technologies: ["html", "css", "javascript"],
    type: "Data Visualization",
    image: "./images/dashboardProject.jpg",
    description: ""
  }
];

function createCard(project) {
  // create element
  const card = document.createElement("div");
  card.className = "project-wrapper";
  card.innerHTML = `
    <div class="project-type ${project.type
      .split(" ")
      .join("-")
      .toLowerCase()}">
      ${project.type}
    </div>
    <div class="project-image">
      <a href="/projects/sales-marketing-dashboard">
      <img src="${project.image}" alt="Project Image" />
      </a>
    </div>
    <div class="project-info">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tech-stack">
        ${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}
      </div>
    </div>
            
    `;

  return card;
}

function displayProjects(projectsToShow) {
  // fade out current projects
  gridContainer.style.opacity = "0";
  setTimeout(() => {
    gridContainer.innerHTML = "";
    projectsToShow.forEach((project) => {
      const projectCard = createCard(project);
      gridContainer.appendChild(projectCard);
    });
    gridContainer.style.opacity = "1";
  }, 500);
}

// displayProjects(projects);

// Featuer project filter

filterList.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.split(" ").join("-").toLowerCase();
    console.log(value);
    filterProjects(value);
  });
});

function filterProjects(filterValue) {
  let filteredProjects;
  if (filterValue === "all") {
    // Get all projects
    filteredProjects = projects;
  } else {
    filteredProjects = projects.filter((project) => {
      return project.category === filterValue;
    });

    displayProjects(filteredProjects);
  }
}
