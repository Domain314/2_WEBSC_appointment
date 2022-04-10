var ajaxDB = new AjaxDB();
var mode = "Appointments"

$(document).ready(function () {
  $("#content-title").html(mode);
  setupAppointments();

});

function loadOptions(id) {
  ajaxDB.loadOptions(id);
}

function setupAppointments() {
  ajaxDB.loadAppointments();
}
