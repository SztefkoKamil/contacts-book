<?php

  require_once "db_connect.php";

  $connection = mysqli_connect($host, $db_user, $db_password, $db_name);

  $query = 'UPDATE contacts SET name="'.$_POST["name"].'", surname="'.$_POST["surname"].'", city="'.$_POST["city"].'", address="'.$_POST["address"].'", zip_code="'.$_POST["zip"].'", country="'.$_POST["country"].'", phone="'.$_POST["phone"].'", email="'.$_POST["email"].'", info="'.$_POST["info"].'" WHERE id="'.$_POST['id'].'"';

  $response = mysqli_query($connection, $query);

  if($response){
    echo "update contact success";
  }
  else if(!$response){
    echo "update contact error<br>".$query;
  }

  mysqli_close($connection);

?>