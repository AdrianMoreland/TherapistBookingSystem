//public/js/main.js
document.addEventListener("DOMContentLoaded", function () {

  // User Authentication popups variables
  const userPopup = document.querySelector(".user-container");
  const loginPopup = document.getElementById("login-popup");
  const loginForm = document.getElementById("login-form");
  const registerPopup = document.getElementById("register-popup");
  const registerForm = document.getElementById("register-form");
  const exitButton = document.getElementById("exit-popup");
  const loginLink = document.getElementById("login-link");
  const createAccountLink = document.getElementById("create-account-link");
  const backToLogin = document.getElementById("back-to-login");
  const logout = document.getElementById("logout-link");
  const userEmail = document.getElementById("userEmail");
  const loginSuccessMessage = document.getElementById("login-success-container");
  const loginLink2 = document.getElementById("login-link-02");
  // Hero section variables
  const heroText = document.getElementById("hero-text");
  const buttonToBottom = document.getElementById('scroll-button');
  // About me section variables
  const pricingDetails = document.getElementById("pricing-details");
  const togglePricingButton = document.getElementById("toggle-pricing-button");
  // Patient area variables (Calendar, time slots, appointments, ...)
  const scheduler02 = document.getElementById("patient-no-login");
  const patientSectionWrapper = document.getElementById("patient-yes-login");
  const appointmentManager = document.getElementById("appointment-manager");
  const scheduler = document.getElementById("scheduler");
  const newAppointmentsButton = document.getElementById("new-appointments-button");
  const appointmentManagerButton = document.getElementById("appointment-manager-button");
  const confirmDateContainer = document.getElementById("confirm-date-container");
  const dateTimeContainer = document.getElementById("date-time-container");
  const confirmDateButton = document.getElementById("confirm-date-button");
  const startTimeInput = document.getElementById("start_time");
  const endTimeInput = document.getElementById("end_time");
  const backToCalendarButton = document.getElementById("back-to-calendar");
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const prevYearButton = document.getElementById("prev-year");
  const nextYearButton = document.getElementById("next-year");
  const dateInput = document.getElementById("date");
  const monthCells = document.querySelectorAll("#month-header-table .month");

  // Initialize the isLoggedInvariable
  let isLoggedIn = false;



  // Show pricing text
  togglePricingButton.addEventListener("click", function () {
    if (pricingDetails.style.display === "none" || pricingDetails.style.display === "") {
      pricingDetails.style.display = "block"; // Show the pricing details
    } else {
      pricingDetails.style.display = "none"; // Hide the pricing details
    }
  });

  //Hide all popups and show hero section text
  function hideAllPopups() {
    loginPopup.style.display = "none";
    registerPopup.style.display = "none";
    userPopup.style.display = "none";
    heroText.style.display = "block";
  }
  //Function to change UI is user is logged in, or hide some elements if not
  function checkLogin() {
    if (isLoggedIn) {
      userPopup.style.display = "block";
      loginSuccessMessage.style.display = "block";
      userEmail.textContent = username;

      // Hide the patient-no-login section
      scheduler02.style.display = "none";
      // Show the scheduler section
      patientSectionWrapper.style.display = "block";
    } else {
      // console.log("is not logged in");
      hideAllPopups();
      userPopup.style.display = "block";
      loginPopup.style.display = "block";

      // Clear the logged-in email
      const loggedInEmail = document.getElementById("logged-in-email");
      loggedInEmail.textContent = ""; // Clear the text content

    }
  }
  // Login link in navbar
  loginLink.addEventListener("click", function (e) {
    checkLogin();
    heroText.style.display = "none";
  });
  //login link in patient area
  loginLink2.addEventListener("click", function (e) {
    e.preventDefault();
    checkLogin();
    heroText.style.display = "none";
  });
  //sign up link in login form
  createAccountLink.addEventListener("click", function (e) {
    e.preventDefault();
    hideAllPopups();
    heroText.style.display = "none";
    userPopup.style.display = "block";
    registerPopup.style.display = "block";
  });
  // return to login popup from signup popup
  backToLogin.addEventListener("click", function (e) {
    e.preventDefault();
    hideAllPopups();
    userPopup.style.display = "block";
    loginPopup.style.display = "block";
  });
  //Show new appointment section (calendar...)
  newAppointmentsButton.addEventListener("click", function (e) {
    scheduler.style.display = "block";
    appointmentManager.style.display = "none";
  });
  // Confirm button in calendar
  confirmDateButton.addEventListener("click", function (e) {
    // Check if any of the form values are null
    if (!startTimeInput.value || !endTimeInput.value) {
      iziToast.error({ // iziToast message
        title: 'error',
        message: 'Select time and date.',
      });
      return; // Prevent further actions if the form is incomplete
    }

    confirmDateContainer.style.display = "block";
    dateTimeContainer.style.display = "none";
  });
  //show appointment manager section
  appointmentManagerButton.addEventListener("click", function (e) {
    appointmentManager.style.display = "block"
    scheduler.style.display = "none";
    fetchUserAppointments();
  });
  //SIGNUP FORM SUBMIT
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    // Get the form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const surname = formData.get("surname");
    const username = formData.get("username");
    const phone = formData.get("phone");
    const password = formData.get("password");
    // Create an object with the user data
    const userData = {
      name,
      surname,
      username,
      phone,
      password,
    };
    try {
      const response = await fetch("/user/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        iziToast.success({  // iziToast message
          title: 'Success',
          message: 'Registered successfully',
        });
        // Toggle visibility to show login popup
        registerPopup.style.display = "none";
        loginPopup.style.display = "block";
        console.log(" Account registered successfully ");

      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
  //LOGIN FORM SUBMIT
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    // Get the form data
    const formData = new FormData(this);
    const userEmail = formData.get("username");
    const password = formData.get("password");
    // const userData = {username, password,};
    try {
      const response = await fetch("/user/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(userData),
        body: JSON.stringify({ username: userEmail, password }), // Use renamed variable
      });
      if (response.ok) {
        console.log("Logged in successfully"); // Console message
        iziToast.success({  // isiToast message
          title: 'Success',
          message: 'Logged in successfully',
        });
        // Set the user as logged in
        isLoggedIn = true;
        //calls the check login function
        checkLogin();
        // Set the user's email within the span
        const loggedInEmail = document.getElementById("logged-in-email");
        loggedInEmail.textContent = userEmail;
        hideAllPopups();

      } else {
        console.error("Login failed");  // Console message
        iziToast.error({   //iziToast message
          title: 'Error',
          message: 'Incorrect email or password.',
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
  // LOGOUT
  logout.addEventListener("click", function () {
    isLoggedIn = false; // Log the user out by setting the isLoggedInto false
    checkLogin(); // Call the checkLogin function to update the UI
    loginSuccessMessage.style.display = "none";
    console.log("User logged out successfully");

  });
  // EXIT BUTTON
  exitButton.addEventListener("click", function () {
    hideAllPopups();
  });

  //CALENDAR FUNCTIONS
  // Event listeners for previous and next year buttons
  prevYearButton.addEventListener("click", function () {
    currentYear--; // Decrement the current year
    showCalendar(currentMonth, currentYear);
  });
  nextYearButton.addEventListener("click", function () {
    currentYear++; // Increment the current year
    showCalendar(currentMonth, currentYear);
  });
  // Function to display the calendar for a specific month and year
  function showCalendar(month, year) {
    // Calculate 1st of the month
    let firstDay = new Date(year, month, 1).getDay() - 1;
    if (firstDay === -1) {
      firstDay = 6; // Adjust Sunday to be 6 instead of -1
    }

    // Get the number of days in the selected month
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    // Clear the calendar days grid
    let tbl = document.getElementById("days");
    tbl.innerHTML = "";

    // Highlight the selected month adding "selected" class
    for (let i = 0; i < 12; i++) {
      if (i === month) {
        monthCells[i].classList.add("selected");
      } else {
        monthCells[i].classList.remove("selected");
      }
    }

    // Display the current month's name and year
    document.getElementById("month").textContent = months[month];
    document.getElementById("month").setAttribute("data-val", month); // Store month index
    document.getElementById("year").textContent = year;

    let date = 1;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    let selectedDate = null; // Track the selected date

    for (let i = 0; i < 6; i++) {
      // Create a row for each week in the calendar
      let row = document.createElement("tr");
      row.classList.add(`week_${i}`);

      for (let j = 0; j < 7; j++) {
        // Loop through each day of the week within the current week row
        if (i === 0 && (j < firstDay || j === 0 || j === 1)) {
          // Check if we're in the first row and before the start of the current month
          // Display inactive cells for previous month's days
          let cell = document.createElement("td");
          cell.classList.add("inactive", "bg-secondary", "unavailable");
          cell.setAttribute("data-day", date);
          cell.setAttribute("disabled", "true"); // Set the entire cell as disabled
          row.appendChild(cell);
        } else if (date <= daysInMonth) {
          // Check if the date is within the days of the current month
          // Create an active cell for the current month's days
          let cell = document.createElement("td");
          cell.classList.add("active", "text-center", "font-weight-bold");
          cell.setAttribute("data-day", date);
          cell.textContent = date;
          // Create a Date object for the cell's date
          const cellDate = new Date(year, month, date);

          // Check if the cell's date is in the past or a weekend
          if (cellDate < currentDate || (j === 5 || j === 6)) {
            // Disable past and weekend dates
            cell.classList.add("past-date", "unavailable");
            // Prevent click events on disabled cells
            cell.addEventListener("click", function (event) {
              event.preventDefault();
              event.stopPropagation();
            });
          }
          // Check if a selected date is not set, and the cell is available
          if (!selectedDate && !cell.classList.contains("unavailable")) {
            // If the selectedDate is not set and the cell is available, select it.
            selectedDate = cell;
            selectedDate.classList.add("selected");
          }

          if (    // Check if the cell represents the current date
            currentDate.getFullYear() === year &&
            currentDate.getMonth() === month &&
            currentDate.getDate() === date
          ) {
            // Highlight the current date
            cell.classList.add("current-date");
          } else {
            // Click event listener to selectable dates
            cell.addEventListener("click", function (event) {
              handleDayClick(event);
            });
          }

          row.appendChild(cell); // Add the cell to the current row
          date++; // Move on to the next day
        } else {
          break; // If the date is greater than the days in the current month, exit the loop
        }
      }
      tbl.appendChild(row); // Add the current row to the calendar table
    }
  }
  // Event listeners for selectable months in the calendar header
  monthCells.forEach((cell, index) => {
    cell.addEventListener("click", function () {
      currentMonth = index; // Update current month
      showCalendar(currentMonth, currentYear); //show updated calendar
    });
  });
  // Initialize the calendar when the page loads
  showCalendar(currentMonth, currentYear);
  // Event listener for the date input change
  dateInput.addEventListener("change", function () {
    const selectedDate = this.value;
    updateSelectedDate(selectedDate);
  });
  // Initialize the calendar and time slots
  function initCalendar() {
    const currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    dateInput.value = currentDate;
    updateSelectedDate(currentDate);
  }
  initCalendar();

  //DATE AND TIME SELECTION
  // Click event on calendar days.
  function handleDayClick(event) {
    const target = event.target;
    // If the clicked day is in the past and not the current day, return and do nothing.
    if (target.classList.contains("past-date") && !target.classList.contains("current-date")) {
      return;
    }
    // Remove the "selected" class from all previously active cells.
    const activeCells = document.querySelectorAll("#days td.active");
    activeCells.forEach(function (cell) {
      cell.addEventListener("click", handleDayClick);
      cell.classList.remove("selected");
    });
    // Mark the newly selected day as "selected."
    target.classList.add("selected");

    // Format the selected date as "YYYY-MM-DD"
    const selectedDate =
      document.getElementById("year").textContent +
      "-" +
      (parseInt(document.getElementById("month").getAttribute("data-val")) + 1).toString().padStart(2, "0") +
      "-" +
      target.textContent.padStart(2, "0");

    // Set the value of the "date" input field to the selected date.
    document.getElementById("date").value = selectedDate;

    // Set the values of start_time and end_time to null
    document.getElementById("start_time").value = null;
    document.getElementById("end_time").value = null;

    // Update the selected date, and selected day globally.
    updateSelectedDate(selectedDate);
    selectedDay = target;
  }

  // This function updates the selected date and calls a function to display available time slots.
  function updateSelectedDate(selectedDate) {
    displayTimeSlots(selectedDate);
  }

  // Displays time slots for the selected date.
  function displayTimeSlots(selectedDate) {
    const timeSlotList = document.querySelector(".time-slots");
    timeSlotList.innerHTML = "";

    // Create time slot buttons for hours from 9:00 to 16:00.
    for (let hour = 9; hour <= 16; hour++) {
      const timeSlot = document.createElement("button");
      timeSlot.classList.add("time-slot", "btn");
      timeSlot.setAttribute("data-hour", hour);
      timeSlot.setAttribute("type", "button");
      timeSlot.textContent = `${hour}:00`;

      // Add a click event listener to each time slot button.
      timeSlot.addEventListener("click", handleTimeSlotClick);
      timeSlotList.appendChild(timeSlot);
    }

    // Call the function to check and set the availability of time slots
    fetchTimeSlotAvailability(selectedDate);
  }

  // Handles the click event on a time slot button and sets the selected time range.
  function handleTimeSlotClick() {
    // Remove the "selected" class from all time slot buttons.
    const timeSlots = document.querySelectorAll(" .time-slots .time-slot");
    timeSlots.forEach(function (slot) {
      slot.classList.remove("selected");
    });
    // Add the "selected" class to the clicked time slot button.
    this.classList.add("selected");

    // Get the selected time and set "start_time" and "end_time" input values accordingly.
    const selectedTime = this.getAttribute("data-hour");
    document.getElementById("start_time").value = `${selectedTime}:00`;
    document.getElementById("end_time").value = `${parseInt(selectedTime) + 1}:00`;
  }

  // BACK TO CALENDAR BUTTON
  backToCalendarButton.addEventListener("click", backToCalendar);
  function backToCalendar() {
    try {
      // Toggle display of both sections
      confirmDateContainer.style.display = "none";
      dateTimeContainer.style.display = "flex";

      console.log("Success: Back to Calendar button.");

    } catch (error) {
      console.error("Error: Back to Calendar button. Error details:", error);
    }
  }
  // MAKE APPOINTMENT BUTTON
  document.getElementById("make-appointment-button").addEventListener("click", async function () {
    // Get values from input fields
    const username = document.getElementById("userEmail").value;
    const dateInput = document.getElementById("date").value;
    const start_time = document.getElementById("start_time").value;
    const end_time = document.getElementById("end_time").value;
    const notification_method = document.getElementById("notification_method").value;
    // Create an object with the appointment data
    const appointmentData = {
      username,
      date: dateInput,
      start_time,
      end_time,
      notification_method,
    };

    try {
      // Send a POST request to "/appointments/create" with appointment data
      const response = await fetch("/appointments/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        console.log("Appointment created successfully");

        iziToast.success({  // iziToast success message
          title: 'Success',
          message: 'Appointment created successfully',
        });

        backToCalendar();  //Return to calendar upon successful creation

        // After a successful appointment creation, send an email
        const emailData = {
          from: "janekeegan.psychology@gmail.com",
          to: [username, "janekeegan.psychology@gmail.com"],
          subject: "Appointment Confirmation",
          html: `<h2>Happy days!</h2> Your appointment was confirmed!. <br><br> Here are the details. <br> <br>
            Patient: ${username}
            Date: ${dateInput}. <br>
            Time: ${start_time} to ${end_time}. <br>
            Location: 81 Newmarket Square, Dublin, D08PN56. <br><br>
            <h3>See you there</h3>
            <h3> Jane. </h3>`,
        };

        // Send an email by making an API call to your server
        const emailResponse = await fetch("/send-email", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });

        if (emailResponse.ok) {
          console.log("Email sent successfully");
        } else {
          console.error("Error sending email");
        }
      } else {
        console.error("Error creating appointment");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  });

  // RETRIEVE UNAVAILABLE TIME SLOTS
  // Fetches the list of booked appointments for the selected date from the server and then calls a function to display availability based on the fetched data.
  function fetchTimeSlotAvailability(selectedDate) {
    const timeSlots = document.querySelectorAll(".time-slots .time-slot");

    console.log("Selected Date:", selectedDate);

    // Fetch the list of booked appointments for the selected date from the server
    fetch(`/appointments/get-booked-appointments?date=${selectedDate}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((bookedAppointments) => {
        // Display booked appointments in console (for debugging)
        console.log("Booked Appointments:", bookedAppointments);

        // Call the function to display the availability based on fetched data
        displayTimeSlotAvailability(timeSlots, bookedAppointments);

        console.log("Time slots availability check successful.");
      })
      .catch((error) => {
        console.error("Error while checking time slots availability:", error);
      });
  }

  // Displays the availability of time slots based on the fetched data (bookedAppointments).
  function displayTimeSlotAvailability(timeSlots, bookedAppointments) {
    timeSlots.forEach((timeSlot) => {
      const selectedTime = timeSlot.getAttribute("data-hour");
      const isBooked = bookedAppointments.some((appointment) => {
        return appointment.start_time === `${selectedTime}:00`;
      });

      if (isBooked) {
        timeSlot.classList.add("unavailable");
        timeSlot.classList.add("non-clickable");



        // Add a click event listener to prevent clicking on unavailable slots
        timeSlot.addEventListener("click", (event) => {
          event.preventDefault();
          // Remove the "selected" class
          timeSlot.classList.remove("selected");

          iziToast.error({  // iziToast message
            title: 'error',
            message: 'Time slot unavailable',
          }); timeSlot.classList.add("unavailable");
        });
      }
    });
  }

  // RETRIEVE APPOINTMENTS FOR LOGGED IN USER
  // Fetches appointments for the logged-in user using their email and then calls a function to display them.
  function fetchUserAppointments() {
    const userEmail = document.getElementById("userEmail").value; // Get the value of the email input field

    fetch(`/appointments/get-user-appointments?userEmail=${userEmail}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((appointments) => {
        // Call a function to display the fetched appointments in the table
        displayUserAppointments(appointments);
        console.log("User Email:", userEmail); // Log the correct user email
        console.log("Fetched successfully!");
        console.log("Appointments:", appointments); // Log the received appointments
        if (Array.isArray(appointments)) {
          console.log("Appointments is an array.");
        } else {
          console.log("Appointments is not an array.");
        }
      })
      .catch((error) => {
        console.error("Error while fetching user appointments:", error);
      });
  }
  // DISPLAY APPOINTMENTS FOR LOGGED IN USER IN TABLE
  function displayUserAppointments(appointments) {
    const appointmentsTableBody = document.getElementById("appointmentsTableBody");

    // Clear the existing table data
    appointmentsTableBody.innerHTML = "";

    if (appointments.length === 0) {
      // Display a message when there are no appointments
      const noAppointmentsRow = document.createElement("tr");
      noAppointmentsRow.innerHTML = `<td colspan="6">No appointments found</td>`;
      appointmentsTableBody.appendChild(noAppointmentsRow);
    } else {
      // Loop through the fetched appointments and add them to the table
      appointments.forEach((appointment, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td scope="row">${index + 1}</td>
          <td>${formatDate(appointment.date)}</td>
          <td>${appointment.start_time}</td>
          <td>1 hour</td>
          <td>${appointment.username}</td>
          <td> <div id= "cancel-apt-button-container"><button class="cancel-appointment-button" data-appointment-id="${appointment._id}">Cancel</button></div></td>
          `;

        appointmentsTableBody.appendChild(row);
      });

      // Add a click event listener to each cancel appointment button
      const cancelAppointmentButton = document.querySelectorAll(".cancel-appointment-button");
      cancelAppointmentButton.forEach((button) => {
        button.addEventListener("click", function () {
          const appointmentID = this.dataset.appointmentId;
          cancelAppointment(appointmentID);
          console.log(`Appointment ID: ${appointmentID}`);
        });
      });
    }
  }
  // CANCEL APPOINTMENT FOR LOGGED IN USER
  function cancelAppointment(appointmentID) {
    // Confirm with the user if they really want to cancel the appointment
    if (confirm("Are you sure you want to cancel this appointment?")) {
      // Make an API call to delete the appointment by its ID
      fetch(`/appointments/cancel/${appointmentID}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Handle success: Reload the appointments or update the UI
            fetchUserAppointments()
          } else {
            // Handle errors, e.g., show an error message to the user
          }
        })
        .catch((error) => {
          // Handle network errors
        });
    }
  }

  // Format date in the table: "DD-MM-YYYY"
  function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // SCROLL
  buttonToBottom.addEventListener('click', function () {
    var element = document.getElementById('about-me');
    scrollToElement(element);
  });
  function getOffset2(el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }
  function scrollToElement(element) {
    var offset = getOffset2(element);
    var targetY = offset.top - 50;
    var initialY = window.pageYOffset;
    var distance = targetY - initialY;
    var startTime;

    function scrollAnimation(currentTime) {
      if (!startTime) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var scrollY = easeInOutCubic(timeElapsed, initialY, distance, 1000);
      window.scrollTo(0, scrollY);

      if (timeElapsed < 1000) {
        requestAnimationFrame(scrollAnimation);
      }
    }

    function easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    }

    requestAnimationFrame(scrollAnimation);
  }

  // Function to send the email from the contact form
  async function contactFormEmail() {
    // Get user input data using element IDs
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const message = document.getElementById("contact-message").value;

    // Prepare email data with user's email as the sender
    const emailData = {
      from: email, // User's email address
      to: "your_email@example.com", // Your email address
      subject: "New user message from your website",
      html: `<h2>New Contact Form Message</h2>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message:</p>
      <p>${message}</p>`,
    };

    try {
      // Send an email by making an API call to your server
      const emailResponse = await fetch("/send-email", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (emailResponse.ok) {
        console.log("Email sent successfully");
        iziToast.success({
          title: 'Success',
          message: 'Appointment created successfully',
        });
      } else {
        console.error("Error sending email");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  // Add event listeners to your "SEND" and "CANCEL" buttons using their IDs
  document.getElementById("contact-send-button").addEventListener("click", contactFormEmail);
  document.getElementById("contact-cancel-button").addEventListener("click", clearInputFields);

  // Function to clear input fields in the contact form
  function clearInputFields() {
    document.getElementById("contact-name").value = "";
    document.getElementById("contact-email").value = "";
    document.getElementById("contact-message").value = "";

    document.getElementById("contact-name").placeholder = "NAME";
    document.getElementById("contact-email").placeholder = "EMAIL";
    document.getElementById("contact-message").placeholder = "MESSAGE";
  }




});