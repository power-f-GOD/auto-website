//selectors: will save from typing longs words over and over again
const Q = document.querySelector.bind(document);
const QAll = document.querySelectorAll.bind(document);

//for elements CSS styling. 'S' stands for Style
function S(element, index) 
{ 
  return !index ? Q(element).style : QAll(element)[index].style;
}