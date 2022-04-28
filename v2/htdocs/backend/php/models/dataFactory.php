<?php

// Factory Pattern

include("appointment.php");
include("option.php");
include("userinput.php");

interface DBData {
  public static function create();
}

class AppointmentFactory implements DBData {
  public static function create() {
    return new Appointment();
  }
}

class OptionFactory implements DBData {
  public static function create() {
    return new Option();
  }
}

class UserInputFactory implements DBData {
  public static function create() {
    return new UserInput();
  }
}


 ?>
