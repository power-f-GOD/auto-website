
'use strict';


//initialize popovers
// $(document).ready(function(){
//   $('[data-toggle="popover"]').popover(); 

// });


window.addEventListener('DOMContentLoaded', function()
{
  if (window.location.href.match(/\/cars(\.php)?/))
    loadCarsPageScript();
  else if (window.location.href.match(/\/upload(\.php)?/))
    loadUploadPageScript();
});



