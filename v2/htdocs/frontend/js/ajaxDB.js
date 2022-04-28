// class to handle ajax
class AjaxDB {

  constructor() {
    this.directory = document.location.origin + '/backend/php/businesslogic/serviceHandler.php';
  };


  // GET DATA

  loadAppointments() {
    $.ajax({
      type: "GET",
      url: this.directory,
      cache: false,
      dataType: "json",
      data: { method: "queryAll", db: "appointments", count: true},
      success: function (response) {

        buildAppointments(response);

      },
      error: function(e) { console.log(e); },
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
      error: function() { console.log(e); }
    });
  }

  loadUserInput(oids) {
    $.ajax({
      type: "GET",
      url: this.directory,
      cache: false,
      dataType: "json",
      data: { method: "queryUserVoting", db: "userinput", param: oids, },
      success: function (response) {

        initializeStats(response);
      }
    }
    );
  }


  // POST DATA

  ajaxAppointment(appointment) {
    event.preventDefault();
    $("#loading-screen").fadeIn(200);
    $.ajax({
      method: "POST",
      url: this.directory,
      cache: false,
      async: true,
      data: appointment,
      success: function (response) {

        submitAllOptions();
      },
      error: function (e) {
        submitAllOptions();
        // console.log(e);
      }
    });
  }

  ajaxOptions(aid, titel, selectedOptions) {
    $("#loading-screen").fadeIn(200);
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
        endOfAnimation();
        // console.log(e);
      }
    });
  }


  ajaxUserInput(oids, userName, comment) {
    event.preventDefault();
    $("#loading-screen").fadeIn(200);
    $.ajax({
      type: "POST",
      url: this.directory,
      cache: false,
      data: {
        db: "userinput",
        oid: oids,
        username: userName,
        comment: comment
      } ,
      success: function (response) {

        endOfAnimation();
      },
      error: function (e) {
        endOfAnimation();
        // console.log(e);
      }
    });
  }



}
