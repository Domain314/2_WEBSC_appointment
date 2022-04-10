function getGoogleIconString(num) {
  switch (num) {

    case 0:
      return "grading";
      break;

    case 1:
      return "post_add";
      break;

    default:
      return "error";
      break;

  }
}

function constructAppointment(id, googleIcon, title, text) {
  let div = document.createElement("div");
  div.classList.add("appointment");

  let i = document.createElement("i");
  i.classList.add("material-icons","md-36");
  i.innerHTML = googleIcon;

  let ti = document.createElement("h3");
  ti.innerHTML = title;

  let te = document.createElement("a");
  te.innerHTML = text;

  div.append(i, ti, te);
  div.addEventListener("click", function() { loadOptions(id); }, false);
  return div;
};


function constructOption(oid, date, timeB, timeE) {
  let div = document.createElement("div");
  div.classList.add("dates");

  let newDate = new Date(date);
  let month = document.createElement("a");
  month.classList.add("month");
  month.innerHTML = newDate.toLocaleString('de-DE', { month: 'long' }).substring(0, 3) + ".";

  let day = document.createElement("a");
  day.classList.add("day");
  day.innerHTML = newDate.toLocaleString('de-DE', { day: 'numeric' });

  let weekday = document.createElement("a");
  weekday.classList.add("weekday");
  weekday.innerHTML = newDate.toLocaleString('de-DE', { weekday: 'long' }).substring(0, 2);

  let timeStart = document.createElement("a");
  timeStart.classList.add("time");
  timeStart.innerHTML = timeB.substring(0, 5);

  let timeEnd = document.createElement("a");
  timeEnd.classList.add("time");
  timeEnd.innerHTML = timeE.substring(0, 5);

  let input = document.createElement("input");
  input.type = "hidden";
  input.id = "oid";
  input.value = oid;

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList = "checkbox";

  div.append(month, day, weekday, timeStart, timeEnd, input, checkbox);
  // div.addEventListener("click", function() { loadOptions(id); }, false);
  return div;
};

function constructAddNewAppointment() {
  let div = document.createElement("div");
  div.classList.add("add_new_appointment");
  div.id = "add_new_appointment";
  div.innerHTML = "<i class='material-icons md-36'>post_add</i><h3>Add new appointment</h3><a>press this card to add a new appointment to the board. You can delete appointments within the specific appointment</a>";
  return div;
}
