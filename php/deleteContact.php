<?php

  require_once "db_connect.php";

  $connection = mysqli_connect($host, $db_user, $db_password, $db_name);

  $query = 'DELETE FROM contacts WHERE id='.$_POST['id'];

  $response = mysqli_query($connection, $query);

  if($response){
    echo "Usunięto kontakt";
  }
  else if(!$response){
    echo "Błąd, spróbuj ponownie.";
  }

  mysqli_close($connection);

?>