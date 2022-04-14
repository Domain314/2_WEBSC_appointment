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

// to-do: sql = SELECT DISTINCT u.Username FROM userinput u INNER JOIN options o ON o.oID = u.oiD INNER JOIN appointments a ON a.aID = o.aID WHERE a.aID = 2500649
function constructAppointment(id, expDate, title, text, votes) {
  let div = document.createElement("div");
  div.id = "single-box";

  $(div).append("<div class='single-box-title'><h1 id='title'>"+title+"</h1></div>");
  $(div).append("<div class='single-box-subtitle'><div class='expires'><i class='material-icons'>event_busy</i><p>"+expDate.slice(0,10)+"</p></div><div class='votes'><i class='material-icons'>people</i><p>"+votes+"</p></div></div>");
  $(div).append("<div class='divider'></div>");
  $(div).append("<div class='description'><p>"+text+"</p></div>");

  div.addEventListener("click", function() { loadOptions(id); }, false);
  return div;
};

// oid == 0, if function gets called from addAppointment.js
// oid != 0, if function gets called from main.js
function constructOption(oid, date, timeB, timeE) {
  let div = document.createElement("div");

  if (oid == 0) { div.classList.add("dates-selected"); }
  else { div.classList.add("dates-selected"); }

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

  if (oid != 0) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList = "checkbox";
    checkbox.value = oid;
    div.append(month, day, weekday, timeStart, timeEnd, input, checkbox);
  } else {
    div.append(month, day, weekday, timeStart, timeEnd, input);
  }

  // div.addEventListener("click", function() { loadOptions(id); }, false);
  return div;
};

// function constructAddNewAppointment() {
//   let div = document.createElement("div");
//   div.classList.add("add_new_appointment");
//   div.id = "add_new_appointment";
//   div.innerHTML = "<i class='material-icons md-36'>post_add</i><h3>Add new appointment</h3><a>press this card to add a new appointment to the board. You can delete appointments within the specific appointment</a>";
//   return div;
// }
