
function loadIndexPageScript()
{
  let navWrapper = Q('.nav-wrapper');

  document.title = 'Home | Auto-Web';
  
  navWrapper.classList.add('transparent');

  window.onscroll = () =>
  {
    let scrollPos = window.scrollY || window.pageYOffset;

    if (scrollPos > Q('#index-page-carousel').offsetHeight - 70)
      navWrapper.classList.remove('transparent');
    else
      navWrapper.classList.add('transparent');
  }
}