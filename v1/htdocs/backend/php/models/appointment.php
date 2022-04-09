<?php
class Appointment {
  private $aid;
  private $titel;
  private $text;
  private $place;
  private $date;
  private $expdate;

  function __construct() {}

  public function newAppointment($titel, $text, $place, $date, $time, $expdate, $exptime) {
    $this->titel = $titel;
    $this->text = $text;
    $this->place = $place;
    $this->date = date('Y-m-d H:i:s', strtotime($date . " " . $time));
    $this->expdate = date('Y-m-d H:i:s', strtotime($expdate . " " . $exptime));
  }

  public function setAppointment($aid, $titel, $text, $place, $date, $expdate) {
    $this->aid = $aid;
    $this->titel = $titel;
    $this->text = $text;
    $this->place = $place;
    $this->date = date('Y-m-d H:i:s', strtotime($date . " " . $time));
    $this->expdate = date('Y-m-d H:i:s', strtotime($expdate . " " . $exptime));
  }

  public function getAid() {
    return $this->aid;
  }

  public function getTitel() {
    return $this->titel;
  }

  public function getText() {
    return $this->text;
  }

  public function getPlace() {
    return $this->place;
  }

  public function getDate() {
    return $this->date;
  }

  public function getExpDate() {
    return $this->expdate;
  }

}

 ?>
