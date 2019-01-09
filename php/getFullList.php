<?php

  require_once "connect.php";

  $connection = mysqli_connect($host, $db_user, $db_password, $db_name);
  $response = mysqli_query($connection, "SELECT * FROM contacts");
  $result = mysqli_fetch_all($response, MYSQLI_ASSOC);
  echo json_encode($result);

  mysqli_close($connection);

?>