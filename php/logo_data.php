<?php
  $logo_names = scandir('./images/cars_logo/');
  $companies = [];

  foreach ($logo_names as $logo_name)
    if (!preg_match("/\.$/", $logo_name))
    {
      $company = substr($logo_name, 0, strpos($logo_name, '_'));
      $company = (preg_match("/bmw|fiat|gmc|infiniti|mini/", $company) ? strtoupper($company) : ucfirst($company));
      array_push($companies, [$logo_name, $company]);
    }
?>