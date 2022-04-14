$(document).ready(function () {
  $("#submit-btn").on("click", postData),
  $("#date").on("click", newdate),
  $("#add").on("click", newdata),
  loaddata();
});

function loaddata() {
  $("li").remove();
  var path = document.location.origin;
  var directory = path + '/backend/php/businesslogic/serviceHandler.php';
  $.ajax({
    type: "GET",
    url: directory,
    cache: false,
    dataType: "json",
    data: {method: "queryAll" },
    success: function (response) {

      $(response).each(function(index) {
        $("ol").prepend(
        "<li class='entry'>" + response[index][0] + ": " + response[index][1] + " " + response[index][2] + " " + response[index][3] +" " + response[index][4] +" " + response[index][5] +"</li>");
      });
    }
  }
  );
}

function postData() {
  event.preventDefault();

  // console.log(values);
  var path = document.location.origin;
  var directory = path + '/backend/php/businesslogic/serviceHandler.php';
  $.ajax({
    type: "POST",
    url: directory,
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
      loaddata();
    },
    error: function (e) {
      console.log(e);
    }
  });
}
