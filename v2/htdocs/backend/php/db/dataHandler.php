<?php
class DataHandler {
  public function queryTest($db) {
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);
    if ($stmt = $conn->prepare("SELECT * FROM " . $db)) {
                $stmt->execute();
                return $stmt->fetchAll();
    }
    return null;
  }

  public function queryAll($db) {
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);
    if ($stmt = $conn->prepare("SELECT *, (SELECT COUNT(DISTINCT u.Username) AS count FROM userinput u INNER JOIN options o ON o.oID = u.oiD WHERE a.aID = o.aID) FROM appointments a")) {
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

    $sql = "SELECT * FROM userinput WHERE ";

    foreach ($oid as $key => $value) {
      $sql .= " oID = " . $value . " OR ";
    }
    $sql .= "oID = 0";

    if ($stmt = $conn->prepare($sql)) {
                $stmt->execute();
                return $stmt->fetchAll();
    }
    return null;
  }

  // choose where to POST, based on database
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

  public function deleteAppointment($param) {
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dbaccess.php";
    include($dir);
    if ($stmt = $conn->prepare(
      "DELETE appointments, options, userinput FROM appointments LEFT JOIN options ON (options.aID = ?) LEFT JOIN userinput ON (options.oID = userinput.oID) WHERE appointments.aID = ?"
    )) {
          $stmt->bindValue(1, $param);
          $stmt->bindValue(2, $param);
          $stmt->execute();
          return $stmt->fetchAll();
    }
    return null;
  }

}









 ?>
