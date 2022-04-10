<?php
class DataHandler {
  public function queryOneMonth($date, $db) {
    $sqlDate = date('Y-m-d H:i:s', strtotime($date));
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);
    if ($stmt = $conn->prepare(
      "SELECT * FROM ?
      WHERE YEAR(Date) = YEAR(cast(? as date))
      AND MONTH(Date) = MONTH(cast(? as date))"
    )) {
                $stmt->bindValue(1, $db);
                $stmt->bindValue(2, $sqlDate);
                $stmt->bindValue(3, $sqlDate);
                $stmt->execute();
                return $stmt->fetchAll();
    }
    return null;
  }

  public function queryOneDay($date, $db) {
    $sqlDate = date('Y-m-d H:i:s', strtotime($date));
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);
    if ($stmt = $conn->prepare(
      "SELECT * FROM ?
      WHERE (cast(Date as date) = cast(? as date))"
    )) {
                $stmt->bindValue(1, $db);
                $stmt->bindValue(2, $sqlDate);
                $stmt->execute();
                return $stmt->fetchAll();
    }
    return null;
  }

  public function queryAll($db) {
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);
    if ($stmt = $conn->prepare("SELECT * FROM " . $db)) {
                $stmt->execute();
                return $stmt->fetchAll();
    }
    return null;
  }

  public function queryOptions($aid, $db) {
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);
    if ($stmt = $conn->prepare("SELECT * FROM " . $db . " WHERE aID=" . $aid)) {
                $stmt->execute();
                return $stmt->fetchAll();
    }
    return null;
  }

  public function postData($db, $data) {
    switch ($db) {
      case 'appointments':
        $this->postAppointment($data);
        break;
      case 'options':
        $this->postOption($data);
        break;
      case 'userinput':
        $this->postUserInput($data);
        break;

      default:
        // code...
        break;
    }
  }

  private function postAppointment($data) {
    $AID = rand(1000000, 9999999);
    $titel = $data->getTitel();
    $text = $data->getText();
    $icon = $data->getIcon();
    $place = $data->getPlace();
    $sqlDate = $data->getDate();
    $sqlExpDate = $data->getExpDate();
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);
    if ($stmt = $conn->prepare("INSERT INTO appointments (aID,Titel,Text,Icon,Place,Date,Expiration) VALUES (?,?,?,?,?,?,?)")) {
                $stmt->bindValue(1, $AID);
                $stmt->bindValue(2, $titel);
                $stmt->bindValue(3, $text);
                $stmt->bindValue(4, $icon);
                $stmt->bindValue(5, $place);
                $stmt->bindValue(6, $sqlDate);
                $stmt->bindValue(7, $sqlExpDate);
                $stmt->execute();
    }
  }

  private function postOption($data) {
    $AID = $data->getAid();
    $OID = rand(100000, 999999);
    $titel = $data->getTitel();
    $sqlDate = $data->getDate();
    $timeB = $data->getTimeB();
    $timeE = $data->getTimeE();
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);
    if ($stmt = $conn->prepare("INSERT INTO options (aID,oID,Titel,Date,timestart,timeend) VALUES (?,?,?,?,?,?)")) {
                $stmt->bindValue(1, $AID);
                $stmt->bindValue(2, $OID);
                $stmt->bindValue(3, $titel);
                $stmt->bindValue(4, $sqlDate);
                $stmt->bindValue(5, $timeB);
                $stmt->bindValue(6, $timeE);
                $stmt->execute();
    }
  }

  private function postUserInput($data) {
    $OID = $data->getOid();
    $username = $data->getUserName();
    $comment = $data->getComment();
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);
    if ($stmt = $conn->prepare("INSERT INTO userinput (oID,Username,Comment) VALUES (?,?,?)")) {
                $stmt->bindValue(1, $OID);
                $stmt->bindValue(2, $username);
                $stmt->bindValue(3, $comment);
                $stmt->execute();
    }
  }





}









 ?>
