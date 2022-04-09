<?php
  include("head.php");
  $dir = $_SERVER["DOCUMENT_ROOT"] . "/_BIN/console.php";
  include($dir);
  $dir = $_SERVER["DOCUMENT_ROOT"] . "/backend/php/db/dataHandler.php";
  include( $dir );


 ?>

<body>

  <div id="output">
    <button id="add">add</button>
    <button id="date">date</button>
    <ol id="ol-appointment"></ol>
  </div>
  <div>
    <form id="submit-appointment" action="/backend/php/businesslogic/serviceHandler.php">
      <label>Appointment</label>
      <br>
      <label for="sa-title">Titel</label>
      <input id="sa-title" name="sa-title" value="" type="text" >
      <br>
      <label for="sa-text">Text</label>
      <input id="sa-text" name="sa-text" value="" type="text" >
      <br>
      <label for="sa-place">Place</label>
      <input id="sa-place" name="sa-place" value="" type="text" >
      <br>
      <label for="sa-date">Date</label>
      <input id="sa-date" name="sa-date" value="" type="date" >
      <input id="sa-time" name="sa-time" value="" type="time">
      <br>
      <label for="sa-date">Exp.Date</label>
      <input id="sa-expdate" name="sa-expdate" value="" type="date" >
      <input id="sa-exptime" name="sa-exptime" value="" type="time">
      <br>
      <input type="text" name="db" value="appointments">
      <!-- <button id="submitApp-btn" data-db="appointment">Post</button> -->
      <input type="submit" value="POST" method="POST">
    </form>
  </div>
  <!-- <script src="db-ajax.js">

  </script> -->
  <?php
    //$dataHandler = new DataHandler();
    //$dataHandler->postData("2022-03-25 10:00:00");
    //console_log($res);
   ?>
</body>




</body>
