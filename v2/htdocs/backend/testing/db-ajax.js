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
    data: { method: "queryTest", db: "appointments", },
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
    data: { method: "queryTest", db: "options", },
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
    data: { method: "queryTest", db: "userinput", },
    success: function (response) {

      $(response).each(function(index) {
        $("#ol-userinput").prepend(
        "<li class='entry'>" + response[index]["oID"] + ": " + response[index]["Username"] + " " + response[index]["Comment"] + "</li>");
      });
    }
  }
  );
}

function deleteAppointment() {
  let aid = $("#delete-aid").val();
  let path = document.location.origin;
  let directory = path + '/backend/php/businesslogic/serviceHandler.php';

  $.ajax({
    type: "GET",
    url: directory,
    cache: false,
    dataType: "json",
    data: { method: "deleteAppointment", param: aid, db: "appointments" },
    success: function (response) {
      window.location.reload();
    },
    error: function (e) {
      window.location.reload();
    }
  }
  );
}
