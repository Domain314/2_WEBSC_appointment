

function submitUserVote() {
  let choosenOptions = new Array();
  let allOptions = $(".dates");
  $(allOptions).each(function (index, value) {
    if ($(value.children[6]).prop("checked")) {
      choosenOptions.push($(value.children[5]).val());
    }
  });

}
