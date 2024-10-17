document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navBar = document.querySelector('.nav-bar');
  
    menuIcon.addEventListener('click', function () {
      navBar.classList.toggle('open');
    });
  });
  


  function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const lastDay = new Date(year, month, daysInMonth);

    const monthNames = ["January", "Febuary", "March", "April", "May", "June", "July",  "August", "September", "October", "November","December"];

    let calendarHtml = '<tr><th colspan="7">' + monthNames[month] + ' ' + year + '</th></tr>';
    calendarHtml += '<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr>';

    let day = 1;
    let currentDay = new Date(firstDay);
    currentDay.setDate(firstDay.getDate() - firstDay.getDay()); // Remplir les jours du mois précédent

    for (let row = 0; row < 6; row++) {
        calendarHtml += '<tr>';
        for (let col = 0; col < 7; col++) {
            if (currentDay.getTime() < firstDay.getTime() || currentDay.getTime() > lastDay.getTime()) {
                calendarHtml += '<td></td>';
            } else {
                calendarHtml += '<td><a class="day-link" href="#" onclick="showReservationForm(' + currentDay.getDate() + ', ' + month + ', ' + year + ');">' + currentDay.getDate() + '</a></td>';
            }
            currentDay.setDate(currentDay.getDate() + 1);
        }
        calendarHtml += '</tr>';
    }

    document.getElementById('calendarTable').innerHTML = calendarHtml;
}

function showReservationForm(day, month, year) {
    document.getElementById('selectedDay').innerText = day;
    document.getElementById('selectedMonth').innerText = getMonthName(month);
    document.getElementById('selectedYear').innerText = year;
    document.getElementById('reservationForm').classList.add('open');
}

function submitForm() {
const firstName = document.getElementById('firstName').value;
const lastName = document.getElementById('lastName').value;
const location = document.getElementById('location').value;
const phoneNumber = document.getElementById('phoneNumber').value; 

if (!firstName || !lastName || !location || !phoneNumber) { 
alert("Please fill in all the information before making a reservation.");
return false;
}

alert(`Reservation confirmed for the selected time slot.\nFirst Name: ${firstName}\nLast Name: ${lastName}\nLocation: ${location}\nPhone Number: ${phoneNumber}`);
closeReservationForm();
return false;
}



function closeReservationForm() {
    document.getElementById('reservationForm').classList.remove('open');
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('location').value = '';
}

function getMonthName(month) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[month];
}

// Obtenir la date actuelle du serveur et générer le calendrier
$.ajax({
    url: 'https://worldtimeapi.org/api/ip',
    method: 'GET',
    success: function (data) {
        const serverDate = new Date(data.datetime);
        const currentYear = serverDate.getFullYear();
        const currentMonth = serverDate.getMonth();
        generateCalendar(currentYear, currentMonth);
    },
    error: function () {
        
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        generateCalendar(currentYear, currentMonth);
    }
});

