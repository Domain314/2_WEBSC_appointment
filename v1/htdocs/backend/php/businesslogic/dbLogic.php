<?php
include("../db/dataHandler.php");

class DBLogic {
  private $dh;
  function __construct() {
    $this->dh = new DataHandler();
  }

  function handleRequest($method, $param, $db) {
    $res = null;
    switch ($method) {
      case "queryOneMonth":
        $res = $this->dh->queryOneMonth($param, $db);
        break;
      case "queryOneDay":
        $res = $this->dh->queryOneDay($param, $db);
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
      default:
        // code...
        break;
    }
    return $res;
  }

  function postData($db, $data) {
    $this->dh->postData($db, $data);
  }

}

 ?>
