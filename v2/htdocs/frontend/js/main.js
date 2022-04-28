var ajaxDB = new AjaxDB();
var mode = "Appointments";
var optionIDs = new Array();

// QUESTION @ Lektor: is 'error skipping' considered 'bad practice'?
// ajax error skipping
// $(document).ajaxError(function(e, jqxhr, settings, exception) {
//   if (jqxhr.readyState == 0 || jqxhr.status == 0) {
//     return; //Skip this error
//   }
// });

// load on ready
$(document).ready(function () {

  setupAppointments();
  preventGoingBack();

});

// reload page, instead going back
function preventGoingBack() {
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function() {
    window.history.pushState(null, "", window.location.reload());
  };
}

// send request
function setupAppointments() {
  var mode = "Appointments";
  $("#add-new-appointment").show();
  $("#add-new-appointment-container").show();
  ajaxDB.loadAppointments();
}

// send request
function loadOptions(id) {
  var mode = "Options";
  $("#add-new-appointment").hide();
  $("#add-new-appointment-container").hide();
  ajaxDB.loadOptions(id);
}


// triggered within request-success
// prepare container and fill with utils.js -> constructAppointment()
function buildAppointments(response) {
  $("#mainpage-content")[0].children[0].remove();
  $("#mainpage-content").append("<div id='flexbox-container'></div>");

  if (response != null) {
    $(response).each(function(index) {
      $("#flexbox-container").append( constructAppointment(
          response[index][0],
          response[index][6],
          response[index][1],
          response[index][2],
          response[index][7]
        ));
    });
  }

  //OPEN NEW APPOINTMENT FORM
  $("#add-new-appointment").click(function() {
      $('html,body').animate({
          scrollTop: $("#add-new-appointment-container").offset().top},
          'slow');
  });

  //CLOSE NEW APPOINTMENT FORM
  $("#go-up").click(function() {
      $('html,body').animate({
          scrollTop: 0},
          'slow');
  });
}

// triggered within request-success
// prepare container and fill with utils.js -> constructOption()
function buildOptions(response) {
  $("#mainpage-content")[0].children[0].remove();
  $("#mainpage-content").append("<div id='vote-appointment-container'></div>");
  $("#vote-appointment-container").append("<div id='vote-appointment-formular'></div>");
  $("#vote-appointment-formular").append("<div id='go-back'><i class='material-icons md-36'>cancel</i></div><div id='title-name-comments'><h1>"+response[0][2]+"</h1><p>Name</p><input type='text' id='new-name-input' placeholder='enter your name here...'><p>Comments</p><input id='additional-informations' placeholder='add additional informations...'></div><div id='added-dates'><div class='time-options' id='selected-dates'></div></div><div id='submit-new-vote'><button id='show-stats'>Show Stats</button><button id='submit-new-vote-button'>Submit</button></div>");
  $("#title-name-comments>h1").innerHTML = response[0][2];



  $(response).each(function(index) {
    $("#selected-dates").append( constructOption(
        response[index][1],
        response[index][3],
        response[index][4],
        response[index][5]
      ));
  });

  // (X)-BUTTON
  $("#go-back>i").on('click', function () {
    window.location.reload();
  });

  //SHOW/HIDE STATS
  $("#show-stats").on('click', function () {
      if ($("#statistics").is(":visible")) {
        $("#statistics").fadeOut(300);
        // console.log("hide stats");
      } else {
        $("#statistics").fadeIn(300);
        // console.log("show stats");
      }
  });

  //SUBMIT
  $("#submit-new-vote-button").on('click', function () {
      // console.log("submit");
      submitUserVote();
  });

  buildStats(response);
}

function buildStats(response) {
  $("body").append("<div class='statistics' id='statistics' style='display:none'></div>");
  $("#statistics").append("<div class='statistics-title' id='statistics-title'><h2>Statistics</h2></div><table class='statistics-table' id='statistics-table'></table><button id='hide-stats'>Done</button>");

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
      $("#message-container-new").fadeOut(300);
      // console.log("hide stats");
  });

  requestStats();
}

function endOfAnimation() {
  $("#loading-screen").hide();
  window.confirm("success!");
  window.location.reload();
  $("html, body").scrollTop(0);
}
