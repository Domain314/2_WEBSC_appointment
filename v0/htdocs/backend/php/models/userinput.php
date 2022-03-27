<?php
class UserInput {
  private $oid;
  private $username;
  private $comment;

  function __construct() {}

  public function newUserInput($oid, $username, $comment) {
    $this->oid = $oid;
    $this->username = $username;
    $this->comment = $comment;
  }

  public function getOid() {
    return $this->oid;
  }
  public function getUserName() {
    return $this->username;
  }
  public function getComment() {
    return $this->comment;
  }

}

 ?>
