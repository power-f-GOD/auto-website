'use strict';
//initialize popovers
// $(document).ready(function(){
//   $('[data-toggle="popover"]').popover(); 
// });
window.addEventListener('DOMContentLoaded', function () {
    var href = window.location.href, hrefs = {
        idx: /\/(index(\.php)?)|\/(|#.*)$/,
        crs: /\/cars(\.php)?/,
        upl: /\/upload(\.php)?/,
        shp: /\/shop(\.php)?/
    };
    if (href.match(hrefs.idx))
        loadIndexPageScript();
    else if (href.match(hrefs.crs))
        loadCarsPageScript();
    else if (href.match(hrefs.upl))
        loadUploadPageScript();
    else if (href.match(hrefs.shp))
        loadShopPageScript();
});
