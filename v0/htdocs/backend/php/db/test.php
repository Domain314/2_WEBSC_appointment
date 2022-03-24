<?php
  // include($_SERVER["DOCUMENT_ROOT"] . '/_BIN/console.php');


  function createNew() {
    $AID = rand(0, 9999999);
    $Titel = "test";
    $Text = "texxt";
    $Place = "plc";
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);
    if ($stmt = $conn->prepare("INSERT INTO appointments (aID,Titel,Text,Place) VALUES (?,?,?,?)")) {
                $stmt->bindValue(1, $AID);
                $stmt->bindValue(2, $Titel);
                $stmt->bindValue(3, $Text);
                $stmt->bindValue(4, $Place);
                $stmt->execute();
    }
  }

  function loadAppointments() {
      $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
      include($dir);
      if ($stmt = $conn->prepare("SELECT * FROM appointments")) {
                  $stmt->execute();
                  header('Content-Type: application/json');
                  http_response_code(200);
                  echo (json_encode($stmt->fetchAll()));
      }
    }

    switch ($_GET['op']) {
      case 'new':
        createNew();
        break;
      case 'load':
        loadAppointments();
        break;

      default:
        // code...
        break;
    }

 ?>
