$(document).ready(function () {
  loaddata();
  let path = document.location.origin;
  let directory = path + '/backend/php/businesslogic/serviceHandler.php';
  $("#submitApp-btn").click(function() { ajaxAppointment(directory) });
  $("#submitOpt-btn").click(function() { ajaxOption(directory) });
  $("#submitUI-btn").click(function() { ajaxUserInput(directory) });
});

function loaddata() {
  loadAppointments();
  loadOptions();
  loadUserInput();
}

function loadAppointments() {
  $("#ol-appointment.entry").remove();
  let path = document.location.origin;
  let directory = path + '/backend/php/businesslogic/serviceHandler.php';
  $.ajax({
    type: "GET",
    url: directory,
    cache: false,
    dataType: "json",
    data: {method: "queryAll", db: "appointments", },
    success: function (response) {

      $(response).each(function(index) {
        $("#ol-appointment").prepend(
        "<li class='entry'>" + response[index][0] + ": " + response[index][1] + " " + response[index][2] + " " + response[index][3] + " " + response[index][4] + " " + response[index][5] + "</li>");
      });
    }
  }
  );
}
function loadOptions() {
  $("#ol-option.entry").remove();
  let path = document.location.origin;
  let directory = path + '/backend/php/businesslogic/serviceHandler.php';
  $.ajax({
    type: "GET",
    url: directory,
    cache: false,
    dataType: "json",
    data: {method: "queryAll", db: "options", },
    success: function (response) {

      $(response).each(function(index) {
        $("#ol-option").prepend(
        "<li class='entry'>" + response[index][0] + ": " + response[index][1] + " " + response[index][2] + " " + response[index][3] + " " + response[index][4] + " " + response[index][5] + "</li>");
      });
    }
  }
  );
}
function loadUserInput() {
  $("#ol-userinput.entry").remove();
  let path = document.location.origin;
  let directory = path + '/backend/php/businesslogic/serviceHandler.php';
  $.ajax({
    type: "GET",
    url: directory,
    cache: false,
    dataType: "json",
    data: {method: "queryAll", db: "userinput", },
    success: function (response) {

      $(response).each(function(index) {
        $("#ol-userinput").prepend(
        "<li class='entry'>" + response[index][0] + ": " + response[index][1] + " " + response[index][2] + " " + response[index][3] + " " + response[index][4] + " " + response[index][5] + "</li>");
      });
    }
  }
  );
}


function ajaxAppointment(directory) {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: directory,
    cache: false,
    data: {
      db: "appointments",
      titel: $("#sa-title").val(),
      text: $("#sa-text").val(),
      icon: $("#sa-icon").val(),
      place: $("#sa-place").val(),
      date: $("#sa-date").val(),
      time: $("#sa-time").val(),
      expdate: $("#sa-expdate").val(),
      exptime: $("#sa-exptime").val()
    } ,
    success: function (response) {
      console.log("successs");
      loadAppointments();
    },
    error: function (e) {
      console.log(e);
      console.log(this);
    }
  });
}

function ajaxOption(directory) {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: directory,
    cache: false,
    data: {
      db: "options",
      aid: $("#so-aid").val(),
      titel: $("#so-titel").val(),
      date: $("#so-date").val(),
      timeB: $("#so-timeB").val(),
      timeE: $("#so-timeE").val()
    } ,
    success: function (response) {
      console.log("successs");
      loadOptions();
    },
    error: function (e) {
      console.log(e);
    }
  });
}

function ajaxUserInput(directory) {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: directory,
    cache: false,
    data: {
      db: "userinput",
      oid: $("#su-oid").val(),
      username: $("#su-username").val(),
      comment: $("#su-comment").val()
    } ,
    success: function (response) {
      console.log("successs");
      loadUserInput();
    },
    error: function (e) {
      console.log(e);
    }
  });
}
