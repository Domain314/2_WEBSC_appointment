var selectedOptions = new Array();
var aid = 0;
var titel = "";

// load on ready
$(document).ready(function () {
  $("#add-date").on('click', function () {
    addDate();
  });
  $("#submit-new-appointment").on('click', function () {
    submitNewAppointment();
  });
});


function addDate() {
  let optionDate = $("#option-date").val();
  let optionTimeStart = $("#option-time-start").val();
  let optionTimeEnd = $("#option-time-end").val();

  if (optionDate == "" && optionTimeStart == "" && optionTimeEnd == "") {
    window.confirm("Enter valid date/time option and try again.");
    return;
  }

  selectedOptions.push({
    date: optionDate,
    timeStart: optionTimeStart,
    timeEnd: optionTimeEnd });

  $("#selected-dates.time-options").append(constructOption(0, optionDate, optionTimeStart, optionTimeEnd));

  // set expiration date to earliest date
  if (getEarliestOption() == selectedOptions.length-1) {
    $("#end-date").val(String(optionDate + " " + optionTimeStart));
  }
}


function submitNewAppointment() {

  let earliestIndex = getEarliestOption();
  if (earliestIndex == -1) {
    window.confirm("Enter at least ONE datetime option for your Appointment.");
    return;
  }

  let appointmentTitel = titel = $("#appointment-name").val();
  let appointmentText = $("#appointment-info").val();
  // let appointmentPlace = $("appointment-place").val();
  let appointmentDate = selectedOptions[earliestIndex]["date"];
  let appointmentTime = selectedOptions[earliestIndex]["timeStart"];
  let appointmentExpDate = selectedOptions[earliestIndex]["date"];
  let appointmentExpTime = selectedOptions[earliestIndex]["timeStart"];

  if (typeof(appointmentTitel) == "undefined") {
    window.confirm("Enter a Titel for your Appointment.");
    return;
  }

  aid = getRandomArbitrary(1000000, 9999999);
  let appointment = {
    db: "appointments",
    aid: aid,
    titel: appointmentTitel,
    text: appointmentText,
    // place: appointmentPlace,
    date: appointmentDate,
    time: appointmentTime,
    expdate: appointmentExpDate,
    exptime: appointmentExpTime
  }
  ajaxDB.ajaxAppointment(appointment, selectedOptions);
}

function submitAllOptions() {
  ajaxDB.ajaxOptions(aid, titel, selectedOptions);
}

function getEarliestOption() {
  if (Array.isArray(selectedOptions) && !selectedOptions.length) { return -1; }
  let indexEarliest = 0;
  for (var i = 1; i < selectedOptions.length; i++) {

    let thisTime = new Date(selectedOptions[i]["date"] + " " + selectedOptions[i]["timeStart"]).getTime();
    let earliestTime = new Date(selectedOptions[indexEarliest]["date"] + " " + selectedOptions[indexEarliest]["timeStart"]).getTime();

    if (thisTime < earliestTime) {
      indexEarliest = i;
    }
  }
  return indexEarliest;
}

function endOfAnimation() {
  window.confirm("success");
  window.location.reload();
}

function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}
