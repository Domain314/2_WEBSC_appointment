var ajaxDB = new AjaxDB();
var mode = "Appointments"

// ajax error skipping
// $(document).ajaxError(function(e, jqxhr, settings, exception) {
//   if (jqxhr.readyState == 0 || jqxhr.status == 0) {
//     return; //Skip this error
//   }
// });

// load on ready
$(document).ready(function () {

  setupAppointments();

});

// to-do: reload page, instead going back
// $(function() {
//  $(window).bind('hashchange', function() {
//    console.log('clicked back');
//  }).trigger('hashchange');
// });


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
  $("#content-title").html("Appointments");

  $(".main")[0].children[1].remove();
  $(".main").append("<div class='appointments'></div>");

  if (response != null) {
    $(response).each(function(index) {
      $(".appointments").append( constructAppointment(
          response[index][0],
          getGoogleIconString(response[index][3]),
          response[index][1],
          response[index][2]
        ));
    });
  }


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
  $("#content-title").html(response[0][2]);
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
  $(".main").append("<label for='comments' class='label'>Comments</label><input type='text' id='comments' placeholder='enter your comments here'><button id='submit'>Submit</button><button id='show-stats'>Show Stats</button></div></div>");

  //SHOW STATS
  $("#show-stats").on('click', function () {
      $("#statistics").fadeIn(300);
      console.log("show stats");
  });
  //HIDE STATS
  $("#hide-stats").on('click', function () {
      $("#statistics").fadeOut(300);
      console.log("hide stats");
  });

  //SUBMIT
  $("#submit").on('click', function () {
      console.log("submit");
      submitUserVote();

  });
}
