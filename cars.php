<!DOCTYPE html>
<html lang='en'>
  <?php 
    require 'php/head.php';
  ?>

  <body class="cars">
    <?php 
      require 'php/header.php';
    ?>

    <main class="cars">
      <!-- landing page background-image section - START -->
      <div class='cur-page-top-bg-image'>
        <div class='container-fluid d-flex justify-content-center cur-page-top-bg-image-content'>
          <section class='d-flex flex-column justify-content-center text-center desc-content-wrapper'>
            <div class="pad-y-30px"></div>
            <h1>Find and Finance Your Kia Car in Minutes</h1>
            <h4>Shop local inventory or select from our Kia catalog</h4>
          </section>
        </div>
      </div>
      <!-- landing page background-image section - END -->

      <div class="sub-main">
        <div class="container-fluid d-flex flex-column justify-content-center">
          <div class="pad-y-15px"></div>
          
          <div class="cars-list-wrapper pad-y-15px d-flex flex-wrap flex-column">
            
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