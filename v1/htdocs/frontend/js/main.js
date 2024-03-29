var ajaxDB = new AjaxDB();
var mode = "Appointments";
var optionIDs = new Array();

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
  var mode = "Appointments";
  ajaxDB.loadAppointments();
}
// send request
function loadOptions(id) {
  var mode = "Options";
  ajaxDB.loadOptions(id);
}


// triggered within request-success
// prepare container and fill with utils.js -> constructAppointment()
function buildAppointments(response) {
  $("#content-title").html("Appointments");
  $("#close-appointment-picker").hide();

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
  $("#close-appointment-picker").show();
  $("#close-appointment-picker").on('click', function () {
    window.location.reload();
  });

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

  //SHOW/HIDE STATS
  $("#show-stats").on('click', function () {
      if ($("#statistics").is(":visible")) {
        $("#statistics").fadeOut(300);
        console.log("hide stats");
      } else {
        $("#statistics").fadeIn(300);
        console.log("show stats");
      }
  });

  //SUBMIT
  $("#submit").on('click', function () {
      console.log("submit");
      submitUserVote();
  });

  buildStats(response);
}

function buildStats(response) {
  $("body").append("<div class='statistics' id='statistics' style='display:none'><div class='statistics-title' id='statistics-title'><h2>Statistics</h2></div><table class='statistics-table'  id='statistics-table'></table><button id='hide-stats'>Done</button></div>");

  $("#statistics-table").append("<tr class='table-top' id='table-top'></tr><tr class='table-time' id='table-time-start'></tr><tr class='table-time' id='table-time-end'></tr>");

  $("#table-top").append("<td>Name</td>");
  $("#table-time-start").append("<td></td>");
  $("#table-time-end").append("<td></td>");

  $(response).each(function(index, value) {
    $("#table-top").append("<td>"+value[3].split('-')[2]+"."+value[3].split('-')[1]+"</td>");
    $("#table-time-start").append("<td>"+value[4].split(':')[0]+"."+value[4].split(':')[1]+"</td>");
    $("#table-time-end").append("<td>"+value[5].split(':')[0]+"."+value[5].split(':')[1]+"</td>");
    optionIDs.push(value[1]);
  });

  //HIDE STATS
  $("#hide-stats").on('click', function () {
      $("#statistics").fadeOut(300);
      console.log("hide stats");
  });

  requestStats();
}

function endOfAnimation() {
  window.confirm("success");
  window.location.reload();
}
