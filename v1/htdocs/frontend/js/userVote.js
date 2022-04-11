

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
