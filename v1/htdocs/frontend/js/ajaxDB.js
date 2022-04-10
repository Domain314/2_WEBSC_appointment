// class to handle ajax
class AjaxDB {

  constructor() {
    this.directory = document.location.origin + '/backend/php/businesslogic/serviceHandler.php';
  };


  // LOAD DATA

  loadAppointments() {
    $.ajax({
      type: "GET",
      url: this.directory,
      cache: false,
      dataType: "json",
      data: { method: "queryAll", db: "appointments", },
      success: function (response) {

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
      }
    }
    );
  }

  loadOptions(id) {
    $.ajax({
      type: "GET",
      url: this.directory,
      cache: false,
      dataType: "json",
      data: {method: "queryOptions", db: "options", param: id, },
      success: function (response) {

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
    }
    );
  }

  loadUserInput() {
    $("#ol-userinput > .entry").remove();
    $.ajax({
      type: "GET",
      url: this.directory,
      cache: false,
      dataType: "json",
      data: {method: "queryAll", db: "userinput", },
      success: function (response) {

        $(response).each(function(index) {
          $("#ol-userinput").prepend(
          "<li class='entry'>" + response[index][0] + ": " + response[index][1] + " " + response[index][2] + "</li>");
        });
      }
    }
    );
  }


  // POST DATA

  ajaxAppointment(directory) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: this.directory,
      cache: false,
      data: {
        db: "appointments",
        titel: $("#sa-title").val(),
        text: $("#sa-text").val(),
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
        console.log("error");
        console.log(e);
      }
    });
  }

  ajaxOption(directory) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: this.directory,
      cache: false,
      data: {
        db: "options",
        aid: $("#so-aid").val(),
        titel: $("#so-titel").val(),
        date: $("#so-date").val(),
        time: $("#so-time").val()
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

  ajaxUserInput(directory) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: this.directory,
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



}
