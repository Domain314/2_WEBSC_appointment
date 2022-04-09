<?php
class Option {
  private $aid;
  private $oid;
  private $titel;
  private $date;

  function __construct() {}

  public function newOption($aid, $titel, $date, $time) {
    $this->aid = $aid;
    $this->titel = $titel;
    $this->date = date('Y-m-d H:i:s', strtotime($date . " " . $time));
  }

  public function setOption($aid, $oid, $titel, $date, $time) {
    $this->aid = $aid;
    $this->oid = $oid;
    $this->titel = $titel;
    $this->date = date('Y-m-d H:i:s', strtotime($date . " " . $time));
  }

  public function getAid() {
    return $this->aid;
  }

  public function getOid() {
    return $this->oid;
  }

  public function getTitel() {
    return $this->titel;
  }

  public function getDate() {
    return $this->date;
  }
}

 ?>
