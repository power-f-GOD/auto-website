<!DOCTYPE html>
<html lang='en'>
  <?php 
    require 'php/head.php';
  ?>

  <body class='shop'>
    <?php
      require 'php/header.php';
  
      $logo_names = scandir('./images/cars_logo/');
      $companies = [];

      foreach ($logo_names as $logo_name)
      {
        $company = substr($logo_name, 0, strpos($logo_name, '_'));
        $company = (preg_match("/bmw|fiat|gmc|infiniti|mini/", $company) ? strtoupper($company) : ucfirst($company));
        array_push($companies, [$logo_name, $company]);
      }
    ?>

    <main>
      <!-- landing page background-image section - START -->
      <div class='pad-y-30px marg-b-10px'></div>
      <div class='cur-page-top-bg-image d-flex justify-content-center'>
        <div class='w-100 d-flex cur-page-top-bg-image-label'>
          <section class='container-fluid d-flex flex-column justify-content-center text-center desc-content-wrapper'>
            <h3>Shop Cars and Trucks</h3>
            <!-- <br /><br /><br /> -->
            <h5>New | Used</h5>
          </section>
        </div>
      </div>
      <!-- landing page background-image section - END -->

      <div class="sub-main">
        <div class="container-fluid d-flex flex-column justify-content-center">
          <div class="pad-y-15px"></div>
          <div class="cars-company-logo-wrapper d-flex flex-wrap pad-10px">
            <?php
              foreach ($companies as $company)
                if (!preg_match("/\.$/", $company[0]))
                echo "
                  <a href='#!' class='car-company-link d-inline-flex w-auto col-sm-4 col-md-3 col-lg-2'>
                    <div class='card w-100 css-debug-border'>
                      <div class='card-body d-flex flex-column justify-content-between align-items-center'>
                        <img src='./images/cars_logo/$company[0]' class='car-company-logo' />
                        <span class='card-subtitle'>$company[1]</span>
                      </div>
                    </div>
                  </a>";
            ?>
          </div>
        </div>
      </div>
      <div class="pad-y-30px"></div>
    </main>

    <?php
      require 'php/footer.php';
    ?>

    <div class="fixed-top h-100 w-100 dark-bg-overlay custom-hide"></div>
  </body>
</html>