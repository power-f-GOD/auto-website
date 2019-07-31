"use strict";
function loadShopPageScript() {
    var navWrapper = Q('.nav-wrapper');
    navWrapper.classList.add('no-shadow');
    window.onscroll = function () {
        var scrollPos = window.scrollY || window.pageYOffset;
        if (scrollPos > Q('.cur-page-top-bg-image').offsetHeight)
            navWrapper.classList.remove('no-shadow');
        else
            navWrapper.classList.add('no-shadow');
    };
}
