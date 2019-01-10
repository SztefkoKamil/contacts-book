<?php

  require_once "db_connect.php";

  # ----- query creator ------------------------
  $query = 'SELECT * FROM contacts WHERE ';
  $andCounter = 0;

  if($_POST["name"] != ''){ $andCounter++; }
  if($_POST["surname"] != ''){ $andCounter++; }
  if($_POST["city"] != ''){ $andCounter++; }
  if($_POST["address"] != ''){ $andCounter++; }
  if($_POST["zip"] != ''){ $andCounter++; }
  if($_POST["country"] != ''){ $andCounter++; }
  if($_POST["phone"] != ''){ $andCounter++; }
  $andCounter--;

  if($_POST["name"] != ''){
    $query = $query.'name="'.$_POST["name"].'"';
    if($andCounter > 0){
      $query = $query.' AND ';
      $andCounter--;
    }
  }
  if($_POST["surname"] != ''){
    $query = $query.'surname="'.$_POST["surname"].'"';
    if($andCounter > 0){
      $query = $query.' AND ';
      $andCounter--;
    }
  }
  if($_POST["city"] != ''){
    $query = $query.'city="'.$_POST["city"].'"';
    if($andCounter > 0){
      $query = $query.' AND ';
      $andCounter--;
    }
  }
  if($_POST["address"] != ''){
    $query = $query.'address="'.$_POST["address"].'"';
    if($andCounter > 0){
      $query = $query.' AND ';
      $andCounter--;
    }
  }
  if($_POST["zip"] != ''){
    $query = $query.'zip_code="'.$_POST["zip"].'"';
    if($andCounter > 0){
      $query = $query.' AND ';
      $andCounter--;
    }
  }
  if($_POST["country"] != ''){
    $query = $query.'country="'.$_POST["country"].'"';
    if($andCounter > 0){
      $query = $query.' AND ';
      $andCounter--;
    }
  }
  if($_POST["phone"] != ''){
    $query = $query.'phone="'.$_POST["phone"].'"';
    if($andCounter > 0){
      $query = $query.' AND ';
      $andCounter--;
    }
  }
  if($_POST["email"] != ''){
    $query = $query.'email="'.$_POST["email"].'"';
  }
  # ----- query creator -----------------------------
  
  $connection = mysqli_connect($host, $db_user, $db_password, $db_name);
  $response = mysqli_query($connection, $query);
  $result = mysqli_fetch_all($response, MYSQLI_ASSOC);

  echo json_encode($result);

  mysqli_close($connection);

?>