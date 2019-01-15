<?php

  require_once "db_connect.php";

  $connection = mysqli_connect($host, $db_user, $db_password, $db_name);

  $query = 'INSERT INTO contacts VALUES(null, "'.$_POST["name"].'", "'.$_POST["surname"].'", "'.$_POST["city"].'", "'.$_POST["address"].'", "'.$_POST["zip"].'", "'.$_POST["country"].'", "'.$_POST["phone"].'", "'.$_POST["email"].'", "'.$_POST["info"].'")';

  $response = mysqli_query($connection, $query);

  if($response){
    echo "add contact success";
  }
  else if(!$response){
    echo "add contact error";
  }

  mysqli_close($connection);

?>