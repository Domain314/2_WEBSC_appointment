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
      data: { method: "queryAll", db: "appointments", count: true},
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
      $.ajax({
        method: "POST",
        url: this.directory,
        cache: false,
        async: true,
        data: appointment,
        success: function (response) {
          console.log("successs");
          submitAllOptions();
        },
        error: function (e) {
          submitAllOptions();
          // console.log(e);
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
        endOfAnimation();
        // console.log(e);
      }
    });
  }


  ajaxUserInput(oids, userName, comment) {
    event.preventDefault();
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
        console.log("successs");
        endOfAnimation();
      },
      error: function (e) {
        endOfAnimation();
        // console.log(e);
      }
    });
  }



}
