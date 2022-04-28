<?php
include("../db/dataHandler.php");

class DBLogic {
  private $dh;
  function __construct() {
    $this->dh = new DataHandler();
  }

  // choose what to query, based on $method (GET)
  function handleRequest($method, $param, $db) {
    $res = null;
    switch ($method) {
      case "queryTest":
        $res = $this->dh->queryTest($db);
        break;
      case "queryAll":
        $res = $this->dh->queryAll($db);
        break;
      case "queryOptions":
        $res = $this->dh->queryOptions($param, $db);
        break;
      case "queryUserVoting":
        $res = $this->dh->queryUserVoting($param, $db);
        break;
      case "deleteAppointment":
        $res = $this->dh->deleteAppointment($param);
        break;
      default:
        // code...
        break;
    }
    return $res;
  }

  // pass data to datahandler (no need for logic atm)
  function postData($db, $data) {
    $this->dh->postData($db, $data);
  }

}

 ?>
