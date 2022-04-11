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

        buildAppointments(response);

      },
      error: buildAppointments(null),
    });
  }

  loadOptions(id) {
    $.ajax({
      type: "GET",
      url: this.directory,
      cache: false,
      dataType: "json",
      data: {method: "queryOptions", db: "options", param: id, },
      success: function (response) {

        buildOptions(response);

      },
      error: function() { window.alert("error"); }
    });
  }

  loadUserInput() {
    $("#ol-userinput > .entry").remove();
    $.ajax({
      type: "GET",
      url: this.directory,
      cache: false,
      dataType: "json",
      data: { method: "queryAll", db: "userinput", },
      success: function (response) {

        // $(response).each(function(index) {
        //   $("#ol-userinput").prepend(
        //   "<li class='entry'>" + response[index][0] + ": " + response[index][1] + " " + response[index][2] + "</li>");
        // });
      }
    }
    );
  }


  // POST DATA

  ajaxAppointment(appointment) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: this.directory,
      cache: false,
      data: appointment,
      success: function (response) {
        console.log("successs");
        submitAllOptions();
      },
      error: function (e) {
        window.alert("Error: Appointment");
        console.log(e);
      }
    });
  }

  ajaxOptions(aid, titel, selectedOptions) {
    $.ajax({
      type: "POST",
      url: this.directory,
      cache: false,
      data: {
        db: "options",
        aid: aid,
        titel: titel,
        selectedOptions: selectedOptions
      },
      success: function (response) {
        endOfAnimation();
      },
      error: function (e) {
        window.alert("Error: Options");
        console.log(e);
      }
    });
  }

  // ajaxOption(directory) {
  //   event.preventDefault();
  //   $.ajax({
  //     type: "POST",
  //     url: this.directory,
  //     cache: false,
  //     data: {
  //       db: "options",
  //       aid: $("#so-aid").val(),
  //       // titel: $("#so-titel").val(),
  //       date: $("#so-date").val(),
  //       time: $("#so-time").val()
  //     } ,
  //     success: function (response) {
  //       window.confirm("success");
  //       window.location.reload();
  //     },
  //     error: function (e) {
  //       console.log(e);
  //     }
  //   });
  // }

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
