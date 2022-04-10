var ajaxDB = new AjaxDB();
var mode = "Appointments"

// load on ready
$(document).ready(function () {
  $("#content-title").html(mode);
  setupAppointments();

  $("#appointment-form").hide();




});


// send request
function setupAppointments() {
  ajaxDB.loadAppointments();
}
// send request
function loadOptions(id) {
  ajaxDB.loadOptions(id);
}


// triggered within request-success
// prepare container and fill with utils.js -> constructAppointment()
function buildAppointments(response) {
  $(".main")[0].children[1].remove();
  $(".main").append("<div class='appointments'></div>");

  $(response).each(function(index) {
    $(".appointments").append( constructAppointment(
        response[index][0],
        getGoogleIconString(response[index][3]),
        response[index][1],
        response[index][2]
      ));
  });

  $(".appointments").append( constructAddNewAppointment() );

  //OPEN NEW APPOINTMENT FORM
  $("#add_new_appointment").on('click', function () {
      $("#appointment-form").fadeIn(300);
      console.log("show appointment form");
  });

  //CLOSE NEW APPOINTMENT FORM
  $("#close_appointment_form").on('click', function () {
      $("#appointment-form").fadeOut(300);
      console.log("hiding appointment form");
  });
}

// triggered within request-success
// prepare container and fill with utils.js -> constructOption()
function buildOptions(response) {
  $(".main")[0].children[1].remove();
  $(".main").append("<div class='picker-allignment'><div class='time-options'><label for='comments' class='label'>Your Name</label><input type='text' placeholder='your name' id='name'>");

  $(response).each(function(index) {
    $(".time-options").append( constructOption(
        response[index][1],
        response[index][3],
        response[index][4],
        response[index][5]
      ));
  });
  $(".main").append("<label for='comments' class='label'>Comments</label><input type='text' id='comments' placeholder='enter your comments here'><button id='submit'>Submit</button></div></div>");
}
