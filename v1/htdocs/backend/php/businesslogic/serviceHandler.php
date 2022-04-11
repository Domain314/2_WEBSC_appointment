<?php
include("dbLogic.php");
$dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/models/dataFactory.php";
include( $dir );

// $dir = $_SERVER["DOCUMENT_ROOT"] . "/_BIN/console.php";
// include($dir);

$logic = new DBLogic();

if (isset($_POST["db"])) {
  $result = $logic->postData($_POST["db"], handlePost());
  response("POST", 100, $result);
}

if(isset($_GET["db"])) {
  $param = "";
  $method = "";
  $db = "";
  isset($_GET["method"]) ? $method = $_GET["method"] : false;
  isset($_GET["param"]) ? $param = $_GET["param"] : false;
  $result = $logic->handleRequest($method, $param, $_GET["db"]);
  if ($result == null) {
    response("GET", 400, null);
  } else {
    response("GET", 200, $result);
  }
}


function response($method, $httpStatus, $data) {
  header('Content-Type: application/json');
    switch ($method) {
        case "GET":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        case "POST":
            http_response_code($httpStatus);
            break;
            // echo (json_encode($data));
        default:
            http_response_code(405);
            echo ("Method not supported yet!");
    }
}

function handlePost() {
  $data;
  switch ($_POST["db"]) {
    case 'appointments':
      $data = createAppointment();
      break;
    case 'options':
      $data = createOptions();
      break;
    case 'userinput':
      $data = createUserInput();
      break;
    default:
      // code...
      break;
  }
  return $data;
}

function createAppointment() {
  $aid = isset($_POST["aid"]) ? $_POST["aid"] : false;
  $titel = isset($_POST["titel"]) ? $_POST["titel"] : false;
  $text = isset($_POST["text"]) ? $_POST["text"] : false;
  $icon = isset($_POST["icon"]) ? $_POST["icon"] : 0;
  $place = isset($_POST["place"]) ? $_POST["place"] : "";
  $date = isset($_POST["date"]) ? $_POST["date"] : false;
  $time = isset($_POST["time"]) ? $_POST["time"] : false;
  $expdate = isset($_POST["expdate"]) ? $_POST["expdate"] : false;
  $exptime = isset($_POST["exptime"]) ? $_POST["exptime"] : false;
  $apt = AppointmentFactory::create();
  $apt->newAppointment($aid, $titel, $text, $icon, $place, $date, $time, $expdate,  $exptime);
  return $apt;
}

function createOptions() {
  $options = array();
  $aid = isset($_POST["aid"]) ? $_POST["aid"] : false;
  $titel = isset($_POST["titel"]) ? $_POST["titel"] : false;

  foreach ($_POST["selectedOptions"] as $value) {
    $opt = OptionFactory::create();
    $opt->newOption($aid, $titel, $value["date"], $value["timeStart"], $value["timeEnd"]);
    array_push($options, $opt);
  }

  return $options;
}

function createUserInput() {
  $oid = isset($_POST["oid"]) ? $_POST["oid"] : false;
  $username = isset($_POST["username"]) ? $_POST["username"] : false;
  $comment = isset($_POST["comment"]) ? $_POST["comment"] : false;
  $uin = UserInputFactory::create();
  $uin->newUserInput($oid, $username, $comment);
  return $uin;
}





 ?>
