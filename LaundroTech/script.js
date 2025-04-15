document.addEventListener("DOMContentLoaded", function () {
    // ✅ Role selection logic
    function goToSignup() {
      const role = document.querySelector('input[name="role"]:checked');
      if (!role) {
        alert("Please select a role.");
        return;
      }
  
      localStorage.setItem("role", role.value);
      window.location.href = "signup.html";
    }
  
    const roleSubmitBtn = document.getElementById("roleSubmitBtn");
    if (roleSubmitBtn) {
      roleSubmitBtn.addEventListener("click", goToSignup);
    }
  
    const roleForm = document.getElementById("roleForm");
    if (roleForm) {
      roleForm.addEventListener("submit", function (e) {
        e.preventDefault();
        goToSignup();
      });
    }
  
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
      signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
    
        const name = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
    
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
    
        const role = localStorage.getItem("role");
    
        localStorage.setItem("fullName", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
    
        alert("Signup successful!");
        document.getElementById("message").textContent = "Signup Successful ✅";
        document.getElementById("message").style.color = "green";
    
        if (role === "employee") {
          window.location.href = "employee.html";
        } else {
          window.location.href = "home.html";
        }
      });
    }
    
    const signinForm = document.getElementById("signinForm");
    if (signinForm) {
      signinForm.addEventListener("submit", function (e) {
        e.preventDefault();
    
        const emailInput = document.getElementById("email").value.trim();
        const passwordInput = document.getElementById("password").value;
    
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");
        const storedName = localStorage.getItem("fullName");
        const storedRole = localStorage.getItem("role");
    
        if (emailInput === storedEmail && passwordInput === storedPassword) {
          alert("Sign-in successful ✅");
          localStorage.setItem("fullName", storedName || "User");
    
          if (storedRole === "employee") {
            window.location.href = "employee.html";
          } else {
            window.location.href = "home.html";
          }
        } else {
          alert("Invalid email or password!");
        }
      });
    }
    
    
    
    // ✅ Menu Toggle
    const menuIcon = document.querySelector(".menu");
    let navMenu = document.querySelector(".nav-menu");
    if (!navMenu) {
      navMenu = document.createElement("div");
      navMenu.classList.add("nav-menu");
      navMenu.innerHTML = `
        <ul>
          <li class="close-btn">&times;</li>
          <li><a href="home.html">Home</a></li>
          <li><a href="services.html">Services & Pricing</a></li>
          <li><a href="info.html">Contact Info</a></li>
          <li><a href="feedback.html">Feedback</li>
          <li><a href="profile.html">Profile</a></li>
          <li><a href="first.html">Log Out</a></li>
        </ul>`;
      document.body.appendChild(navMenu);
    }
  
    if (menuIcon) {
      menuIcon.addEventListener("click", function () {
        navMenu.classList.toggle("active");
      });
    }
  
    const closeBtn = document.querySelector(".close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        navMenu.classList.remove("active");
      });
    }
  
    // ✅ Booking Logic
const showFormBtn = document.getElementById("showFormBtn");
const bookingForm = document.getElementById("bookingForm");
const doneBtnContainer = document.getElementById("doneBtnContainer"); // The container for the "Done" button

if (showFormBtn && bookingForm && doneBtnContainer) {
  bookingForm.style.display = "none";
  doneBtnContainer.style.display = "none"; // Initially hide the "Done" button

  showFormBtn.addEventListener("click", function () {
    bookingForm.style.display = "block";
    showFormBtn.style.display = "none";
  });

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();

    if (name) {
      document.getElementById("machine1").textContent = `Booked by ${name}`;
      bookingForm.innerHTML = "<strong>Booking confirmed ✅</strong>";
      localStorage.setItem("bookingName", name);
      localStorage.setItem("machineBooked", "true");

      // Show the "Done" button after booking is confirmed
      doneBtnContainer.style.display = "block";
    }
  });
}

// ✅ Done Button Logic
const doneBtn = document.getElementById("doneBtn");
if (doneBtn) {
  doneBtn.addEventListener("click", function () {
    // Redirect to home page after confirming booking is done
    window.location.href = "home.html";
  });
}

  
    // ✅ Employee Dashboard Logic
    const statusEl = document.getElementById("machineStatus");
    const markBtn = document.getElementById("markDoneBtn");
  
    if (statusEl && markBtn) {
      const booking = localStorage.getItem("bookingName");
      const machineBooked = localStorage.getItem("machineBooked");
  
      if (machineBooked === "true" && booking) {
        statusEl.textContent = `Booked by ${booking}`;
        markBtn.style.display = "inline-block";
      } else {
        statusEl.textContent = "No booking yet.";
        markBtn.style.display = "none";
      }
  
      markBtn.addEventListener("click", function () {
        statusEl.textContent = "Booking marked as DONE ✅";
        markBtn.style.display = "none";
        localStorage.removeItem("bookingName");
        localStorage.removeItem("machineBooked");
      });
    }
  
    // ✅ Feedback Logic
    const feedbackForm = document.getElementById("feedbackForm");
    const feedbackText = document.getElementById("feedbackText");
    const feedbackListContainer = document.getElementById("feedbackListContainer");
  
    if (feedbackForm && feedbackText && feedbackListContainer) {
      function loadFeedbacks() {
        const feedbacks = JSON.parse(localStorage.getItem("feedbackList")) || [];
        feedbackListContainer.innerHTML = "";
  
        feedbacks.forEach((fb, index) => {
          const li = document.createElement("li");
          li.textContent = `${index + 1}. ${fb}`;
          feedbackListContainer.appendChild(li);
        });
      }
  
      feedbackForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const feedback = feedbackText.value.trim();
        if (feedback === "") return;
  
        const feedbacks = JSON.parse(localStorage.getItem("feedbackList")) || [];
        feedbacks.push(feedback);
        localStorage.setItem("feedbackList", JSON.stringify(feedbacks));
        feedbackForm.reset();
        loadFeedbacks();
      });
  
      loadFeedbacks();
    }
    
    const name = localStorage.getItem("fullName");
    const userNameEl = document.getElementById("userName");
    const signInBtn = document.getElementById("signInBtn"); // Make sure there's a button with this ID in your HTML
    
    if (name) {
      userNameEl.textContent = name;
      if (signInBtn) signInBtn.style.display = "none"; // Hide sign-in button if user is found
    } else {
      userNameEl.textContent = "No user found";
      if (signInBtn) signInBtn.style.display = "inline-block"; // Show sign-in button
    }
    
    
  });
  