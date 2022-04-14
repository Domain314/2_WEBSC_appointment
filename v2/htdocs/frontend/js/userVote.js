
function submitUserVote() {
  let choosenOptions = new Array();
  let allOptions = $(".dates-selected");
  $(allOptions).each(function (index, value) {
    if ($(value.children[6]).prop("checked")) {
      choosenOptions.push($(value.children[5]).val());
    }
  });
  console.log(choosenOptions);

  let name = $("#new-name-input").val();
  if (name == "") {
    window.confirm("Enter your name.");
    return;
  }
  let comment = $("#additional-informations").val();

  ajaxDB.ajaxUserInput(choosenOptions, name, comment );
}

function requestStats() {
  let allOptions = new Array();
  let inputs = $(".dates-selected>#oid");

  $(inputs).each(function (index, value) {
    allOptions.push(parseInt(value.value));
  });

  ajaxDB.loadUserInput(allOptions);

}

function initializeStats(response) {
  let names = new Array()

  $(response).each(function (index, value) {

    if (!names.includes(value[1])) { names.push(value[1]); }
  });

  $(names).each(function(nameIndex, nameValue) {
    let row = "<tr class='table-data' id='table-data'><td>" + nameValue + "</td>";

    $(optionIDs).each(function(optionIndex, optionValue) {
      row += "<td>";

      $(response).each(function(responseIndex, responseValue) {

        if (responseValue[0] == optionValue && responseValue[1] == nameValue) {
          row += "<i class='material-icons md-24' id='close-statistics'>done</i>";
          return false;
        }
      });

      row += "</td>";
    });

    row += "</tr>";
    $("#statistics-table").append(row);
  });

}
