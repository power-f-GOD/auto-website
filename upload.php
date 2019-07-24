<!DOCTYPE html>
<html lang='en'>
  <?php 
    require 'php/head.php';
  ?>

  <body>
    <?php 
      require 'php/header.php';
    ?>

    <main class="upload">
      <div class="pad-y-30px"></div>
      <div class="sub-main">
        <div class="container-fluid d-flex flex-column justify-content-center">
          <!-- Nav tabs -->
          <nav class='fixed-top nav-tabs-wrapper'>
            <div class="pad-y-30px marg-b-30px"></div>
            <ul class="nav nav-tabs container-fluid d-flex justify-content-between">
              <?php
                $tab_names = array('addCompany'=>'Add Company', 'upload'=>'Cars Upload', 'allUploads'=>'All Uploads', 'recentUploads'=>'Recent Uploads', 'onRequest'=>'On Request', 'dailySells'=>'Daily Sells');

                foreach ($tab_names as $tab_id => $tab_name)
                {
                  echo "
                    <li class='nav-item col-2 text-center d-inline-flex'>
                      <a class='nav-link d-inline-flex align-items-center justify-content-center flex-fill " . ($tab_id == 'upload' ? 'active' : '') . "' data-toggle='tab' href='#$tab_id'>$tab_name</a>
                    </li>";
                }
              ?>
            </ul>
          </nav>

          <div class="pad-y-30px"></div>
          <!-- Tab panes -->
          <div class='tab-content pad-y-30px'>
            <div class='tab-pane active show fade flex-wrap justify-content-around' id='upload'>
              <?php
                $upload_types = ['new-cars-upload' => 'New', 'old-cars-upload' => 'Old'];

                $input_info_sections = array(
                  'Basic Info' => array(
                    'carname' => 'Name of Car',
                    'carcompany' => 'Name of Company',
                    'carpic' => 'Picture of Car',
                    'carcolor' => 'Color of Car',
                    'carprice' => 'Price of Car'
                  ),
                  'Specs & key Features' => array(
                    'bodyStyle' => 'Body Style',
                    'engine' => 'Engine',
                    'horsepower' => 'Horsepower',
                    'transmission' => 'Transmission',
                    'passengerdoors' => 'Passenger Doors',
                    'passengerseating' => 'Passenger Seating',
                    'drivetrain' => 'Drivetrain',
                    'citymgp' => 'City MPG',
                    'hwympg' => 'Hwy MPG'
                  ),
                  'Description' => array('cardescription' => 'Describe the car')
                );

                foreach ($upload_types as $upload_type => $upload_type_text)
                {
                  echo "
                  <div class='col-12 col-md-6 col-lg-5 pad-x-10px marg-y-30px'>
                    <fieldset>
                      <legend>$upload_type_text Cars Upload</legend>
                      <form class='$upload_type'>";

                  foreach ($input_info_sections as $section_name => $section)
                  {
                    echo "
                        <h5 class='marg-t-30px marg-b-15px pad-10px'>$section_name</h5>";

                    foreach ($section as $input_name => $input_text)
                    {
                      if ($input_name == 'carpic')
                        echo "
                        <div class='form-group'>
                          <div class='custom-file'>
                            <input type='file' name='carpic' multiple class='custom-file-input carpic' aria-describedby='carpic' accept='image/jpeg, image/jpg, image/png' />
                            <label class='custom-file-label' for='carpic'>Select photo(s) of car (Max: 5)</label>
                          </div>
                          <section class='d-flex flex-wrap no-pad pad-l-10px images-upload-container'>
                          </section>
                        </div>
                        ";
                      else {
                        echo "
                        <div class='form-group'>";

                        if ($input_name == 'cardescription') 
                          echo "
                          <textarea class='form-control' rows='3' id='$input_name' placeholder='Describe the car...'></textarea>";
                        else 
                          echo "
                          <label for='$input_name'>$input_text:</label>
                          <input type='text' name='$input_name' class='form-control' id='$input_name' placeholder='$input_text'>";
                        echo "
                        </div>";
                      }
                    }
                  }

                  echo "
                        <button class='btn btn-primary marg-t-30px w-100 pad-10px'>Upload</button>
                      </form>
                    </fieldset>
                  </div>";
                }
              ?>
            </div>

            <?php
              foreach ($tab_names as $tab_id => $tab_name)
                if ($tab_id != 'upload')
                  echo "
                    <div class='tab-pane fade' id='$tab_id'>
                      $tab_name content goes here...
                    </div>";
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

    <!-- modal for image preview - START -->
    <div class="modal fade img-preview no-pad" tabindex="-1" role="dialog" aria-labelledby="img-preview" aria-hidden="false">
      <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content border-0">
          <div class="modal-header border-0 d-flex justify-content-around">
            <h6 class="modal-title h6"></h6>
            <h6 class="img-count h6"></h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body text-center marg-b-10px marg-x-10px useCustomScrollBar">
            <img src='' title='' class='d-inline-block img-fluid img-thumbnail border-0 preview-img' alt='' />
          </div>
          <a class="carousel-control-prev" href="javascript:void(0)" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="javascript:void(0)" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
    <!-- modal for image preview - END -->
  </body>
</html>