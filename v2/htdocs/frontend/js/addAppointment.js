var selectedOptions = new Array();
var aid = 0;
var titel = "";
var useEarliestDate = true;

// load on ready
$(document).ready(function () {
  $("#add-option").on('click', function () {
    addDate();
  });
  $("#submit-new-appointment").on('click', function () {
    submitNewAppointment();
  });
  $("#end-date").hide();
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

  $("#selected-dates").append(constructOption(0, optionDate, optionTimeStart, optionTimeEnd));

  // set expiration date to earliest date
  if (useEarliestDate) {
    setEarliestEndDate();
  }
}

function setEarliestEndDate() {
  let earlyIndex = getEarliestOption();
  if (earlyIndex == -1) { return; }
  let earlyDate = selectedOptions[earlyIndex]["date"];
  let earlyTime = selectedOptions[earlyIndex]["timeStart"];
  // chrome: "T" instead " "
  $("#end-date").val(String(earlyDate + "T" + earlyTime));
}


function submitNewAppointment() {

  let earliestIndex = getEarliestOption();
  if (earliestIndex == -1) {
    window.confirm("Enter at least ONE datetime option for your Appointment.");
    return;
  }

  let appointmentTitel = titel = $("#appointment-name").val();
  if (typeof(appointmentTitel) == "undefined" || appointmentTitel == "") {
    window.confirm("Enter a Titel for your Appointment.");
    return;
  }

  let appointmentText = $("#appointment-info").val();
  // let appointmentPlace = $("appointment-place").val();
  let appointmentDate = selectedOptions[earliestIndex]["date"];
  let appointmentTime = selectedOptions[earliestIndex]["timeStart"];

  let appointmentExpDate, appointmentExpTime;
  if (useEarliestDate) {
    appointmentExpDate = selectedOptions[earliestIndex]["date"];
    appointmentExpTime = selectedOptions[earliestIndex]["timeStart"];
  } else {
    appointmentExpDate = $("#end-date").val().split("T")[0];
    appointmentExpTime = $("#end-date").val().split("T")[1];
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

function earliestCheckBox() {
  useEarliestDate = $("#earliestOption").prop("checked");
  if (useEarliestDate) {
    $("#end-date").hide();
  } else {
    setEarliestEndDate();
    $("#end-date").fadeIn(500);

  }
}

function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}
