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

  public function queryUserVoting($oid, $db) {
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);

    // sleep(2);
    $sql = "SELECT * FROM userinput WHERE ";

    foreach ($oid as $key => $value) {
      $sql .= " oID = " . $value . " OR ";
    }
    $sql .= "oID = 0";

    error_log("sql: " . $sql);

    if ($stmt = $conn->prepare($sql)) {
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
    $AID = $data->getAid();
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
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);

    $sql = "INSERT INTO options (aID,oID,Titel,Date,timestart,timeend) VALUES (?,?,?,?,?,?) ";
    $AID = $data[0]->getAid();
    error_log($AID);
    $titel = $data[0]->getTitel();

    if ($stmt = $conn->prepare($sql)) {
      $conn->beginTransaction();

      foreach ($data as $value) {
        $OID = rand(1000000, 9999999);
        $sqlDate = $value->getDate();
        $timeB = $value->getTimeB();
        $timeE = $value->getTimeE();

        $stmt->execute([ $AID, $OID, $titel, $sqlDate, $timeB, $timeE ]);
      }
      $conn->commit();
    }

  }

  private function postUserInput($data) {
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);

    $sql = "INSERT INTO userinput (oID,Username,Comment) VALUES (?,?,?) ";

    $username = $data[0]->getUserName();
    $comment = $data[0]->getComment();

    if ($stmt = $conn->prepare($sql)) {
      $conn->beginTransaction();

      foreach ($data as $value) {
        $OID = $value->getOid();

        $stmt->execute([ $OID, $username, $comment ]);
      }
      $conn->commit();
    }

  }





}









 ?>
