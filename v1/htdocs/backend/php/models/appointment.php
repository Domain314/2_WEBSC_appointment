<?php
class Appointment {
  private $aid;
  private $titel;
  private $text;
  private $icon;
  private $place;
  private $date;
  private $expdate;

  function __construct() {}

  public function newAppointment($aid, $titel, $text, $icon, $place, $date, $time, $expdate, $exptime) {
    $this->aid = $aid;
    $this->titel = $titel;
    $this->text = $text;
    $this->icon = $icon;
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

  public function getIcon() {
    return $this->icon;
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
