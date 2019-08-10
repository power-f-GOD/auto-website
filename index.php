<!DOCTYPE html>
<html lang='en'>
  <?php 
    require 'php/head.php';
  ?>

  <body class='index'>
    <?php 
      require 'php/header.php';
      
      $carousel_info = [
        array(
          'stinger.jpg',
          'First slide label',
          'Nulla vitae elit libero, a pharetra augue mollis interdum.',
          '#!|Get Started'
        ),
        array(
          'telluride.jpg',
          'Second slide label',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          'shop?type=new|Shop New Cars'
        ),
        array(
          'soul_ev.jpg',
          'Third slide label',
          'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
          'shop?type=old|Shop Old Cars'
        )
      ];
    ?>

    <main>
      <!-- page main top carousel - START -->
      <div id="index-page-carousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <?php
            foreach ($carousel_info as $index => $detail)
              echo "<li data-target='#index-page-carousel' data-slide-to='$index'" . ($index == 0 ? " class='active'" : '') . "></li>";
          ?>
        </ol>
        <div class="carousel-inner">
          <?php
            foreach ($carousel_info as $index => $details)
            {
              $link = explode('|', $details[3]);
              echo "
                <div class='carousel-item" . ($index == 0 ? ' active' : '') . "'>
                  <div class='carousel-img' style='background-image: url(./images/cars/$details[0])'></div>
                  <div class='carousel-caption d-none d-flex flex-column justify-content-center'>
                    <p class='carousel-caption-wrapper d-flex flex-column align-items-center'>
                      <h3>$details[1]</h3>
                      <span>$details[2]</span>
                      <a href='$link[0]' class='btn carousel-link-btn d-block'>$link[1]</a>
                    </p>
                  </div>
                </div>";
            }
              
          ?>
        </div>
        <a class="carousel-control-prev" href="#index-page-carousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#index-page-carousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <!-- page main top carousel - END -->


      

      <div class="sub-main">
        <div class='grayscale marg-y-60px pad-y-60px w-100'>
          <h4 class="text-center pad-b-10px">FEATURED</h4>
          <ul class="featured-cars-logo-wrapper d-flex flex-wrap justify-content-center no-marg no-pad">
            <?php
              require 'php/logo_data.php';

              // for ($i = 0; $i < 14; $i++)
              foreach ($companies as $company)
              {
                $alt = $company[1];
                $src = $company[0];
                echo "
                  <li class='col no-marg no-pad text-center'>
                    <img class='featured-logo' alt='$alt' src='images/cars_logo/$src'/>
                  </li>";
              }
            ?>
          </ul>
        </div>
        <!-- <div class="container-fluid d-flex flex-column justify-content-center">
          
        </div> -->
        <!-- landing page background-image section - START -->
        <!-- <div class='cur-page-top-bg-image w-100'>
          <div class='container-fluid d-flex justify-content-center cur-page-top-bg-image-content'>
            <section class='d-flex flex-column justify-content-center text-center desc-content-wrapper'>
              <h1>Car shopping</h1>
              <h4>Choose your car and get financing offers</h4>
            </section>
          </div>
        </div> -->
        <!-- landing page background-image section - END -->
      </div>
      <!-- <div class="pad-y-30px"></div> -->
    </main>

    <table>

    </table>

    <?php
      require 'php/footer.php';
    ?>

    <div class="fixed-top h-100 w-100 dark-bg-overlay custom-hide"></div>
  </body>
</html>