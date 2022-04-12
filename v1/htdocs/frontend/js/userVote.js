
function submitUserVote() {
  let choosenOptions = new Array();
  let allOptions = $(".dates");
  $(allOptions).each(function (index, value) {
    if ($(value.children[6]).prop("checked")) {
      choosenOptions.push($(value.children[5]).val());
    }
  });
  console.log(choosenOptions);

  let name = $("#name").val();
  if (name == "") {
    window.confirm("Enter your name.");
    return;
  }
  let comment = $("#comments").val();

  ajaxDB.ajaxUserInput(choosenOptions, name, comment );
}

function requestStats() {
  let allOptions = new Array();
  let inputs = $(".dates>#oid");

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
  // console.log(names);
  // console.log(optionIDs);
  // console.log(response);

  $(names).each(function(nameIndex, nameValue) {
    let row = "<tr class='table-data' id='table-data'><td>" + nameValue + "</td>";

    $(optionIDs).each(function(optionIndex, optionValue) {
      row += "<td>";

      $(response).each(function(responseIndex, responseValue) {

        if (responseValue[0] == optionValue && responseValue[1] == nameValue) {
          row += "<i class='material-icons md-24' id='close-statistics'>done</i>";
        }
      });

      row += "</td>";
    });

    row += "</tr>";
    $("#statistics-table").append(row);
  });

}
