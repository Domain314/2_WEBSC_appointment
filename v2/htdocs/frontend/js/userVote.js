// global variable for retriving comments
var names;

function submitUserVote() {
  let choosenOptions = new Array();
  let allOptions = $(".dates-selected");
  $(allOptions).each(function (index, value) {
    if ($(value.children[6]).prop("checked")) {
      choosenOptions.push($(value.children[5]).val());
    }
  });

  let name = $("#new-name-input").val();
  if (name == "") {
    window.confirm("Enter your name.");
    return;
  }
  let comment = $("#additional-informations").val();

  ajaxDB.ajaxUserInput(choosenOptions, name, comment );
}

// initialize request for stats
function requestStats() {
  let allOptions = new Array();
  let inputs = $(".dates-selected>#oid");

  $(inputs).each(function (index, value) {
    allOptions.push(parseInt(value.value));
  });

  ajaxDB.loadUserInput(allOptions);
}

// build stats base, before filling up with DB response
function initializeStats(response) {
  // prepare array for objects, containing name, comment and id
  names = new Array();

  // check each response row and add obj to "names[]"
  $(response).each(function (index, value) {

    // if names[] doenst contain obj with given name, add it.
    if ((names.findIndex(x => x.name == value[1])) == -1) {
      let rnd = Math.floor(Math.random()*100000);
      names.push({ name: value[1], comment: value[2], id: rnd });
    }
  });

  // add stats row, piece by piece and append the table with it.
  $(names).each(function(nameIndex, nameValue) {
    let row = "<tr class='table-data' id='table-data'><td>" + nameValue["name"] + " " + addComment(nameValue) + "</td>";

    $(optionIDs).each(function(optionIndex, optionValue) {
      row += "<td>";

      $(response).each(function(responseIndex, responseValue) {

        if (responseValue[0] == optionValue && responseValue[1] == nameValue["name"]) {
          row += "<i class='material-icons md-24' id='close-statistics'>done</i>";
          return false;
        }
      });

      row += "</td>";
    });

    row += "</tr>";
    $("#statistics-table").append(row);
  });
  $("#statistics-table").append("<div id='message-container-new'><div id='message-content-new'><div id='message-title-new'><h1 id='messager'></h1><i class='material-icons md-24' id='close-message-container'>cancel</i></div><p id='message-new'></p></div></div>");
  $("#message-container-new").hide();
  $("#close-message-container").on('click', function() { $("#message-container-new").hide(); });
}

// add icon and onclick-function for comment display, if there is a comment
function addComment(nameValue) {
  if (nameValue["comment"] != "") {
    let string = "<i class='material-icons md-18' onclick='displayComment(" + nameValue["id"] + ")'>chat</i>";
    return string;
  } else return "";
}

// fill comment-container with data from names[] and fadeIn
function displayComment(id) {
  if ($("#message-container-new").is(":visible")) {
    $("#message-container-new").hide();
  }
  let commentContainer = names.find((x) => { return x["id"] === id; });
  $("#messager").html(commentContainer["name"]);
  $("#message-new").html(commentContainer["comment"]);
  $("#message-container-new").fadeIn(200);

}
